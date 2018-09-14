import {JetView} from "webix-jet";
import {getLangsList} from "models/langslist";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();
		const theme = this.app.config.theme;
		const combo_theme_value = theme ? "1" : "0";
		const date_combo_value = this.app.config.dateFormat;

		return {
			rows:[
				{ template:_("Settings"), type:"header", css:`webix_header ${theme}` },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },
					rules:{
						$all:webix.rules.isNotEmpty
					},
					elements:[
						{ template:_("Regional settings"), type:"section" },
						{
							cols:[
								{
									label:_("Language"), view:"richselect",
									name:"lang", localId:"langs:combo",
									value:lang, gravity:3,
									minWidth:144,
									options:getLangsList(),
									on:{
										onChange:function(newlang){
											this.$scope._lang = newlang;
											const country = this.getList().getItem(newlang).code;
											webix.i18n.setLocale(newlang+"-"+country);
										}
									}
								},
								{},
								{
									label:_("Date format"), view:"richselect",
									name:"dateformat", value:date_combo_value, gravity:3,
									minWidth:144,
									options:[
										{ value:"dd/mm/yyyy hh:mm", id:"%d/%m/%Y %H:%i" },
										{ value:"mm/dd/yyyy hh:mm", id:"%m/%d/%Y %H:%i" },
										{ value:"dd.mm.yyyy hh:mm", id:"%d.%m.%Y %H:%i" },
										{ value:"mm.dd.yyyy hh:mm", id:"%m.%d.%Y %H:%i" },
										{ value:"d Month, hh:mm", 	id:"%j %F, %H:%i" }
									],
									on:{
										onChange(newv){
											this.$scope.app.config.dateFormat = newv;
										}
									}
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
									name:"theme", minWidth:144, gravity:3,
									value:combo_theme_value,
									options:[
										{ id:"0", value:_("Light") },
										{ id:"1", value:_("Dark") }
									],
									on:{
										onChange:newtheme => {
											const th = this.app.config.theme = newtheme === "1" ? "webix_dark" : "";
											webix.storage.local.put("bank_app_theme",th);
										}
									}
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
									autowidth:true,
									click:function(){
										this.getFormView().setValues(this.$scope._defaults);
									}
								},
								{
									view:"button", value:_("Reset"),
									autowidth:true, type:"danger",
									click:function(){
										this.getFormView().clear();
									}
								},
								{},
								{
									view:"button", value:_("Save"),
									autowidth:true, type:"form",
									click:function(){
										if (this.getFormView().validate())
											this.$scope.app.getService("locale").setLang(this.$scope._lang);
									}
								}
							]
						}
					]
				}
			]
		};
	}
	init(){
		this._lang = this.app.getService("locale").getLang();

		this._defaults = {
			lang:"en",
			dateformat:"5",
			moneyformat:"1",
			theme:"0",
			maxlist:50
		};
	}
}
