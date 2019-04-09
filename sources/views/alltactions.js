import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";

export default class AllTActionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const dateFormat = webix.Date.dateToStr(this.app.config.dateFormat);

		return {
			view:"datatable", localId:"grid",
			select:true, tooltip:true, footer:true,
			columns:[
				{
					id:"id", header:"#", width:40, sort:"int", tooltip:false,
					footer:{ text:"Total:", colspan:2 }
				},
				{
					id:"status", header:"", width:40,
					css:"status", sort:"text", tooltip:false,
					template:data => {
						let icon = "";
						if (data.status === "success")
							icon = "check-circle";
						else if (data.status === "failed")
							icon = "alert-box";
						else
							icon = "clock";
						return `<span class='webix_icon mdi mdi-${icon} ${data.status}'></span>`;
					}
				},
				{
					id:"date", header:_("Date"),
					fillspace:2, minWidth:150,
					sort:"date", format:dateFormat
				},
				{
					id:"", header:_("Payment"), fillspace:3, minWidth:240, sort:"text",
					tooltip:_("The card with which the payment was made"),
					template:data => {
						return `<img class="method" src="data/images/${data.method}.svg" />${data.method} ${data.number || ""}`;
					}
				},
				{
					id:"", header:{
						text:_("Purchase"),
						tooltip:_("Click to sort the list by shops")
					},
					fillspace:4, minWidth:200, sort:"text",
					template: data => `${data.name} / ${data.city} / ${data.country}`
				},
				{
					id:"type", header:"+/-", sort:"int",
					css:"type", fillspace:1, minWidth:30,
					template:data => {
						let type = data.type ? "plus incoming" : "minus payment";
						return `<span class='webix_icon mdi mdi-${type}'></span>`;
					},
					tooltip:obj => {
						return (obj.type ? _("Incoming") : _("Outgoing")) + _(" payment");
					}
				},
				{
					id:"sum", header:_("Sum"), sort:"int",
					fillspace:1, minWidth:70,
					format:webix.i18n.priceFormat,
					footer:{
						content:"summColumn",
						tooltip:obj => {
						  const sum = this.$$("grid").getHeaderContent(obj.contentId).getValue();
						  return "Total money flow: " + sum;
						}
					}
				},
				{
					id:"left", header:_("Left"),
					fillspace:1, minWidth:70,
					sort:"int", format:webix.i18n.priceFormat,
					footer:{
						content:"summColumn",
						tooltip:obj => {
						  const sum = this.$$("grid").getHeaderContent(obj.contentId).getValue();
						  return "Total money left: " + sum;
						}
					}
				}
			]
		};
	}
	init(grid){
		const _ = this.app.getService("locale")._;
		const list_length = this.app.config.listLength;

		grid.sync(allpayments,function(){
			this.filter(obj => obj.id <= list_length);
		});

		this.on(this.app,"tactions:filter",type => {
			if (type === "all") grid.filter();
			else grid.filter(obj => obj.type == type);
		});

		grid.attachEvent("onAfterSelect", obj => {
			const record = allpayments.getItem(obj.row);
			this.app.callEvent("taction:select",[record]);
		});

		grid.attachEvent("onBeforeUnSelect", () => this.app.callEvent("taction:select"));

		this.on(this.app,"person:select", person => {
			grid.select(person.company);
			grid.showItem(person.company);
		});

		this.on(this.app,"date:select",date => {
			const taction = grid.find(obj => {
				return obj.date.toString().slice(0,14) === date.toString().slice(0,14);
			});

			if (taction.length && grid.data.order.find(taction[0].id) !== -1){
				grid.select(taction[0].id);
				grid.showItem(taction[0].id);
			}
			else {
				grid.clearSelection();
				webix.message(_("Nothing on this day"));
			}
		});
	}
}
