import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import MenuView from "views/menu";
import {getLangsList} from "models/langslist";

export default class TopView extends JetView{
	config(){
		return {
			rows:[
				ToolView,
				{
					cols:[
						MenuView,
						{
							type:"space",
							cols:[
								{ $subview:true }
							]
						}
					]
				}
			]
		};
	}
	init(){
		const lang = this.app.getService("locale").getLang();
		if (lang !== "en"){
			const langs = getLangsList();
			const country = langs.find(l => l.id === lang).code;
			webix.i18n.setLocale(lang+"-"+country);
		}
	}
}
