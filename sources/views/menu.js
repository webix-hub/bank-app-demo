import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			width:250, localId:"side:menu", view:"sidebar",
			data:[
				{ id:"transactions", value:_("Transactions"), icon:"cart" },
				{ id:"customers", value:_("Customers"), icon:"cube" },
				{ id:"snippets", value:"Snippets", icon:"code-not-equal-variant" },
				{ id:"layout", value:"Layout", icon:"view-dashboard" },
				{ id:"charts", value:_("Charts"), icon:"chart-areaspline" },
				{ id:"typography", value:"Typography", icon:"format-line-style" },
				{ id:"calendar", value:"Calendar", icon:"calendar" },
				{ id:"filemanager", value:"File Manager", icon:"folder-star" }
			]
		};
	}
	init(){
		this.use(plugins.Menu,this.$$("side:menu"));
		this.on(this.app,"menu:toggle",() => this.$$("side:menu").toggle());
	}
	urlChange(ui,url){
		if (!ui.find(opts => url[1].page === opts.id).length)
			ui.unselect();
	}
}
