import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const screen = this.app.config.size;

		return {
			rows:[
				{
					view:"toolbar", css:theme,
					elements:[
						{ view:"label", label:_("Persons"), localId:"label" },
						{ width:4 },
						{
							view:"text", localId:"search", hidden:true,
							on:{
								onTimedKeyPress(){
									const input = this.getValue().toLowerCase();
									this.$scope.$$("list").filter(obj => {
										const name = obj.fname + " " + obj.lname;
										return name.toLowerCase().indexOf(input) !== -1;
									});
								}
							}
						},
						{
							view:"icon", icon:"mdi mdi-magnify",
							state:"closed", localId:"search_icon",
							click:function(){
								if (this.config.state === "closed"){
									this.$scope.$$("label").hide();
									this.$scope.$$("search").show();
									this.$scope.$$("search").focus();
									this.config.state = "open";
								}
								else if (this.config.state === "open"){
									this.$scope.$$("label").show();
									this.$scope.$$("search").hide();
									this.config.state = "closed";
								}
							}
						}
					]
				},
				{
					view:"list",
					localId:"list",
					css:"persons_list",
					width:(screen !== "small") ? 250 : 230,
					select:true,
					tooltip:{
						template:_("Click twice to see more goodies")
					},
					type:{
						template:obj => `<image class="userphoto" src="data/photos/${obj.photo}_1.jpg" />
							<div class="text">
						  		<span class="username">${obj.fname} ${obj.lname}</span>
						  		<span class="money">$${obj.money}</span>
							</div>`,
						height:66
					},
					on:{
						onAfterSelect:id => {
							const person = persons.getItem(id);
							this.app.callEvent("person:select",[person]);
						},
						onItemDblClick:id => {
							if (this.getUrl()[0].page !== "customers")
								this.show("customers?user="+id+"/information");
							else this.show("information");
						}
					}
				}
			]
		};
	}
	init(){
		const _ = this.app.getService("locale")._;
		const list = this.$$("list");
		
		list.sync(persons);

		persons.waitData.then(() => {
			if (this.getUrl()[1].page !== "customers"){
				const cur_user = this.getParam("user",true);
				list.select(cur_user);
				list.showItem(cur_user);
			}
		});

		this.on(this.app,"customer:save",(data) => {
			const id = data.id || this.getParam("user",true);
			persons.updateItem(id,data);
			webix.message(_("Saved"));
		});

		this.on(this.app,"form:update",(id) => {
			persons.waitData.then(() => {
				const user = list.getSelectedId();
				if (!user){
					list.select(id || 1);
					list.showItem(id || 1);
				}
				else {
					this.app.callEvent("customer:updatedata",[list.getItem(user)]);
				}
			});
		});

		this.on(this.app,"taction:select",record => {
			if (record) {
				const person = persons.find(obj => obj.company === record.id)[0];
				if (person){
					list.select(person.id);
					list.showItem(person.id);
				}
			}
			else
				list.unselect();
		});

		this.on(this.app,"payment:history:ready",() => persons.waitData.then(() => list.select(1)));
	}
}
