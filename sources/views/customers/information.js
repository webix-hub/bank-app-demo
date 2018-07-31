import {JetView} from "webix-jet";
import {cities} from "models/cities";
import {tags} from "models/tags";
import {positions} from "models/positions";
import "webix/photo";

export default class InformationView extends JetView {
	config(){

		const left_main = {
			gravity:3,
			margin:10, rows:[
				{
					view:"text", name:"fname",
					label:"First name", labelPosition:"top",
					placeholder:"First name"
				},
				{
					view:"text", name:"lname",
					label:"Last name", labelPosition:"top",
					placeholder:"Last name"
				},
				{
					view:"richselect", name:"position",
					label:"Position", labelPosition:"top",
					placeholder:"Click to select",
					options:positions
				},
				{
					view:"text", name:"email",
					label:"Email", labelPosition:"top",
					placeholder:"judetheawesome@obscure.com"
				},
				{
					view:"radio", name:"notifications",
					label:"Notifications", labelPosition:"top",
					value:1,
					options:[
						{ id:1, value:"Yes"},
						{ id:2, value:"No" }
					]
				},
				{ height:20 }
			]
		};

		const middle_extra = {
			gravity:3, margin:10, rows:[
				{
					view:"richselect", name:"city",
					label:"City, country", labelPosition:"top",
					placeholder:"Click to select",
					options:webix.copy(cities)
				},
				{
					view:"text", name:"address", label:"Address",
					labelPosition:"top", placeholder:"Address"
				},
				{
					view:"datepicker", name:"birthday",
					label:"Birthday", labelPosition:"top",
					placeholder:"Click to select",
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
					width:260,
					height:260,
					borderless:true
				},
				{
					view:"multicombo", name:"tags", placeholder:"Click to add tags",
					options:tags
				}
			]
		};

		return {
			view:"form", rows:[
				{
					cols:[
						left_main,
						{ gravity:1 },
						middle_extra,
						{ gravity:2 },
						right_photo
					]
				},
				{ view:"label", template:"Notes" },
				{
					view:"richtext", labelPosition:"top",
					name:"notes", localId:"notes"
				},
				{
					margin:10, cols:[
						{},
						{
							view:"button", value:"Reset", width:100,
							click:() => {
								this.$$("notes").setValue("");  // ! a crude workaround
								this.getRoot().clear();
							}
						},
						{
							view:"button", value:"Save", type:"form", width:100,
							click:() => {
								const newdata = this.getRoot().getValues();
								const id = newdata.id;
								this.app.callEvent("customer:save",[id,newdata]);
							}
						}
					]
				}
			]
		};
	}
	init(form){
		this.on(this.app,"person:select",data => form.setValues(data));
	}
}
