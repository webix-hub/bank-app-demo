import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config(){
		return {
			rows:[
				{ template:"Settings", type:"header" },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },elements:[
						{ template:"Regional settings", type:"section" },
						{
							cols:[
								{
									label:"Language", view:"richselect", name:"lang",
									value:"en",
									options:[
										{ id:"en", value:"English" },
										{ id:"es", value:"Spanish" },
										{ id:"cn", value:"Chinese" },
										{ id:"ru", value:"Russian" }
									], gravity:3
								},
								{},
								{
									label:"Date format", view:"richselect", name:"dateformat",
									value:"5",
									options:[
										{ id:"1", value:"dd/mm/yyyy hh:mm" },
										{ id:"2", value:"mm/dd/yyyy hh:mm" },
										{ id:"3", value:"dd.mm.yyyy hh:mm" },
										{ id:"4", value:"mm.dd.yyyy hh:mm" },
										{ id:"5", value:"d Mon, hh:mm" }
									], gravity:3
								},
								{},
								{
									label:"Money format", view:"richselect", name:"moneyformat",
									value:"1",
									options:[
										{ id:"1", value:"1,234.56" },
										{ id:"2", value:"1'234,56" }
									], gravity:3
								},
								{ gravity:5 }
							]
						},
						{ template:"Environment settings", type:"section" },
						{
							cols:[
								{
									label:"Theme", view:"richselect", name:"theme",
									value:"some",
									options:[
										{ id:"some", value:"Some" }
									], gravity:3
								},
								{},
								{
									label:"Max list length", view:"slider", name:"maxlist",
									min:20, max:100, value:50, step:10,
									title:"#value#",
									gravity:3
								},
								{ gravity:9 }
							]
						},
						{},
						{
							cols:[
								{
									view:"button", value:"Default settings",
									width:130
								},
								{
									view:"button", value:"Reset",
									width:100, type:"danger"
								},
								{},
								{
									view:"button", value:"Save",
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
