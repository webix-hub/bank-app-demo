import {JetView} from "webix-jet";
import {cities} from "models/cities";
import {getTags} from "models/tags";
import {getPositions} from "models/positions";
import "webix/photo";
import "webix/tinymce/tinymce";

export default class InformationView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		
		const left_main = {
			gravity:3,
			minWidth:210,
			margin:10,
			rows:[
				{
					view:"text", name:"fname",
					label:_("First name"), labelPosition:"top",
					placeholder:_("First name")
				},
				{
					view:"text", name:"lname",
					label:_("Last name"), labelPosition:"top",
					placeholder:_("Last name")
				},
				{
					view:"richselect", name:"position",
					localId:"position:combo",
					label:_("Position"), labelPosition:"top",
					placeholder:_("Click to select"),
					options:[]
				},
				{
					view:"text", name:"email",
					label:_("Email"), labelPosition:"top",
					placeholder:"judetheawesome@obscure.com"
				},
				{
					view:"radio", name:"notifications",
					label:_("Notifications"), labelPosition:"top",
					value:1,
					options:[
						{ id:1, value:_("Yes") },
						{ id:2, value:_("No") }
					]
				},
				{ height:20 }
			]
		};

		const middle_extra = {
			gravity:3,
			minWidth:200,
			margin:10,
			rows:[
				{
					view:"richselect", name:"city",
					label:_("City, country"), labelPosition:"top",
					placeholder:_("Click to select"),
					options:webix.copy(cities)
				},
				{
					view:"text", name:"address", label:_("Address"),
					labelPosition:"top", placeholder:_("Address")
				},
				{
					view:"datepicker", name:"birthday",
					label:_("Birthday"), labelPosition:"top",
					placeholder:_("Click to select"),
					format:webix.Date.dateToStr("%d %M %Y")
				}
			]
		};

		const right_photo = {
			gravity:3,
			margin:10,
			rows:[
				{
					view:"photo",
					name:"photo",
					css:"form_photo",
					width:260,
					height:260,
					borderless:true
				},
				{
					view:"multicombo", name:"tags",
					localId:"tags:combo",
					placeholder:_("Click to add tags"),
					options:[]
				}
			]
		};

		return {
			view:"form",
			rows:[
				{
					cols:[
						left_main, { gravity:1 }, middle_extra, { gravity:2 }, right_photo
					]
				},
				{
					view:"forminput",
					labelWidth:0,
					body:{
						rows:[
							{ view:"label", template:_("Notes") },
							{
								view:"tinymce-editor",
								name:"notes",
								localId:"notes",
								config:{
									menubar:false,
									skin_url:"sources/styles/tiny_mce_webix_white",
									plugins:"link",
									toolbar:"fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | link"
								}
							}
						]
					}
				},
				{
					margin:10,
					cols:[
						{},
						{
							view:"button", value:_("Reset"), width:100,
							click:() => {
								this.$$("notes").setValue("");  // ! a crude workaround
								this.getRoot().clear();
							}
						},
						{
							view:"button", value:_("Save"), type:"form", width:100,
							click:() => {
								const newdata = this.getRoot().getValues();
								const id = newdata.id;
								this.app.callEvent("customer:save",[id,newdata]);
							}
						}
					]
				}
			],
			on:{
				onValues(){
					const id = this.getValues().id;
					if (id) this.$scope.setParam("user",id,true);
				}
			}
		};
	}
	init(form){
		this.on(this.app,"person:select",data => form.setValues(data));

		const _ = this.app.getService("locale")._;
		let p_options = getPositions();
		p_options.map(x => {
			x.value = _(x.value);
		});
		let c_options = getTags();
		c_options.map(x => {
			x.value = _(x.value);
		});

		this.$$("position:combo").getPopup().getList().parse(p_options);
		this.$$("tags:combo").getPopup().getList().parse(c_options);
	}
}
