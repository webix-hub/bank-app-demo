import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();
		return {
			rows:[
				{ template:_("Settings"), type:"header" },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },
					elements:[
						{ template:_("Regional settings"), type:"section" },
						{
							cols:[
								{
									label:_("Language"), view:"richselect",
									name:"lang", value:lang, gravity:3,
									minWidth:144,
									options:[
										{ id:"en", code:"US", value:"English" },
										{ id:"zh", code:"CN", value:"中文" },
										{ id:"es", code:"ES", value:"Español" },
										{ id:"ko", code:"KR", value:"한국어" },
										{ id:"ru", code:"RU", value:"Русский" },
										{ id:"de", code:"DE", value:"Deutsch" }
									],
									on:{
										onChange:newlang => {
											webix.delay(() => this.app.getService("locale").setLang(newlang));
										}
									}
								},
								{},
								{
									label:_("Date format"), view:"richselect",
									name:"dateformat", value:"5", gravity:3,
									minWidth:144,
									options:[
										{ id:"1", value:"dd/mm/yyyy hh:mm" },
										{ id:"2", value:"mm/dd/yyyy hh:mm" },
										{ id:"3", value:"dd.mm.yyyy hh:mm" },
										{ id:"4", value:"mm.dd.yyyy hh:mm" },
										{ id:"5", value:"d Month, hh:mm" }
									]
								},
								{},
								{
									label:_("Money format"), view:"richselect",
									name:"moneyformat", value:"1",
									minWidth:144, gravity:3,
									options:[
										{ id:"1", value:"1,234.56" },
										{ id:"2", value:"1'234,56" }
									]
								},
								{ gravity:5 }
							]
						},
						{ template:_("Environment settings"), type:"section" },
						{
							cols:[
								{
									label:_("Theme"), view:"richselect",
									name:"theme", value:"light", gravity:3,
									minWidth:144,
									options:[
										{ id:"light", value:_("Light") },
										{ id:"dark", value:_("Dark") }
									]
								},
								{},
								{
									label:_("Max list length"), view:"slider",
									name:"maxlist", minWidth:144,
									min:10, max:50, value:50, step:10,
									title:"#value#", gravity:3
								},
								{ gravity:9 }
							]
						},
						{},
						{
							margin:10, cols:[
								{
									view:"button", value:_("Default settings"),
									width:160
								},
								{
									view:"button", value:_("Reset"),
									width:100, type:"danger"
								},
								{},
								{
									view:"button", value:_("Save"),
									width:100, type:"form"
								}
							]
						}
					]
				}
			]
		};
	}
}
