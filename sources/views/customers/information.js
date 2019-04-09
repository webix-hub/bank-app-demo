import {JetView} from "webix-jet";
import {getCities} from "models/cities";
import {getTags} from "models/tags";
import {getPositions} from "models/positions";
import "webix/photo";
import "webix/tinymce/tinymce";

export default class InformationView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const screen = this.app.config.size;
		const dateFormat = webix.Date.dateToStr("%d %M %Y");

		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"fname",
					label:_("First name"), labelPosition:"top",
					placeholder:_("First name"),
					invalidMessage:_("A name is required"),
					tooltip:_("Client's name is ") + "#value#"
				},
				{
					view:"text", name:"lname",
					label:_("Last name"), labelPosition:"top",
					placeholder:_("Last name"),
					tooltip:_("Client's last name is ") + "#value#"
				},
				{
					view:"datepicker", name:"birthday",
					label:_("Birthday"), labelPosition:"top",
					placeholder:_("Click to select"),
					format:dateFormat,
					tooltip:obj => {
						let result = _("Client is ");
						if (obj.value){
							result += Math.floor((new Date() - obj.value) / (1000 * 60 * 60 * 24 * 365)) + _(" years old");
							let nearestBDay = new Date();
							nearestBDay.setMonth(obj.value.getMonth());
							nearestBDay.setDate(obj.value.getDate());
							if (nearestBDay < new Date()){
								webix.Date.add(nearestBDay, 1, "year");
							}
							result += "<br>" + _("Next birthday is on ") + dateFormat(nearestBDay);
						}
						return result;
					}
				}
			]
		};

		const position = {
			view:"richselect", name:"position",
			localId:"position:combo",
			label:_("Position"), labelPosition:"top",
			placeholder:_("Click to select"),
			options:[],
			tooltip:obj => {
				return obj.value ? _("The position that client occupies within their company") : "<span class='notselected'>" + _("Not selected") + "</span>";
			}
		};

		const notifications = {
			view:"radio", name:"notifications",
			label:_("Notifications"), labelPosition:"top",
			value:1,
			tooltip:obj => {
				return obj.id%2 ? _("You will receive email notifications about actions performed by this client.") : _("You will receive no email notifications.");
			},
			options:[
				{ id:1, value:_("Yes") },
				{ id:2, value:_("No") }
			]
		};

		const left_main = {
			gravity:3,
			minWidth:200,
			margin:10,
			rows:[
				main_info,
				position,
				notifications
			]
		};

		const more_info = {
			gravity:3,
			minWidth:200,
			margin:10,
			rows:[
				{
					view:"richselect", name:"city",
					localId:"cities:combo",
					label:_("City, country"), labelPosition:"top",
					placeholder:_("Click to select"),
					options:[],
					tooltip:obj =>{
						return obj.value ? _("The city where the client works") : "<span class='notselected'>"+_("Not selected")+"</span>";
					}
				},
				{
					view:"text", name:"address", label:_("Address"),
					labelPosition:"top", placeholder:_("Address"),
					tooltip:obj =>{
						return obj.value ? _("The address of the client's office") : "<span class='notselected'>"+_("Not specified")+"</span>";
					}
				},
				{
					view:"text", name:"email",
					label:_("Email"), labelPosition:"top",
					placeholder:"judetheawesome@obscure.com",
					tooltip:obj =>{
						return obj.value ? _("The working email address of the client") : "<span class='notselected'>"+_("Not specified")+"</span>";
					}
				}
			]
		};

		const right_photo = {
			gravity:3,
			margin:10,
			rows:[
				{
					view:"photo", localId:"photo",
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
					options:[],
					tooltip:obj => {
						return obj.value ? _("The badges unlocked by the client") : "<span class='notselected'>"+_("No badges")+"</span>";
					}
				}
			]
		};

		const upper_section = {
			cols:[
				left_main,
				{ gravity:1, minWidth:20 },
				more_info,
				{ gravity:2, minWidth:20 },
				right_photo
			]
		};

		const upper_section_narrow = {
			cols:[
				{
					gravity:4,
					margin:10,
					rows:[
						main_info, more_info, position
					]
				},
				{ gravity:1, minWidth:20 },
				{
					margin:10,
					rows:[
						right_photo,
						notifications
					]
				}
			]
		};

		const notes = {
			view:"forminput",
			labelWidth:0,
			body:{
				rows:[
					{ view:"label", template:_("Notes"), css:"input_label" },
					{
						view:"tinymce-editor",
						borderless:true,
						name:"notes",
						localId:"notes",
						config:{
							menubar:false,
							plugins:"link",
							toolbar:"fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | link",
							content_style:"* { color:#475466; font-family:Roboto,sans-serif; font-size:15px; }"
						}
					}
				]
			}
		};

		const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button", value:_("Reset"), autowidth:true,
					click:() => {
						this.$$("notes").setValue("");  // !
						this.getRoot().clear();
					},
					tooltip:_("Click to clean the form")
				},
				{
					view:"button", value:_("Save"), type:"form", autowidth:true,
					tooltip:"Save changes",
					click:() => {
						if (this.getRoot().validate()){
							const newdata = this.getRoot().getValues();
							this.app.callEvent("customer:save",[newdata]);
						}
					}
				}
			]
		};

		return {
			view:"form",
			rows:[
				(screen !== "small") ? upper_section : upper_section_narrow,
				notes,
				buttons
			],
			rules:{
				"fname":webix.rules.isNotEmpty
			}
		};
	}
	init(form){
		this.app.callEvent("form:update",[this.getParam("user",true)]);

		this.on(this.app,"customer:updatedata",person => form.setValues(person));

		this.on(this.app,"person:select",person => form.setValues(person));

		this.getLocalizedComboOptions();

		webix.TooltipControl.addTooltip(this.$$("photo").$view);

		const tagsCombo = this.$$("tags:combo");
		this.on(tagsCombo, "onChange",() => {
			webix.delay(() => {
				const delIcons = tagsCombo.$view.querySelectorAll(".webix_multicombo_delete");
				for (let i = 0; i < delIcons.length; i++){
					if (!delIcons[i].getAttribute("webix_tooltip")){
						delIcons[i].setAttribute(
							"webix_tooltip",
							"<span class=\"danger\">Click to remove the badge</span>"
						);
					}
				}
			});
		});
	}
	getLocalizedComboOptions(){
		const _ = this.app.getService("locale")._;

		let p_options = webix.copy(getPositions());
		p_options.map(x => x.value = _(x.value));
		this.$$("position:combo").getPopup().getList().parse(p_options);

		let t_options = webix.copy(getTags());
		t_options.map(x => x.value = _(x.value));
		this.$$("tags:combo").getPopup().getList().parse(t_options);

		let c_options = webix.copy(getCities());
		c_options.map(x => x.value = _(x.value));
		this.$$("cities:combo").getPopup().getList().parse(c_options);
	}
}
