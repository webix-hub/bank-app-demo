import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			width:200, localId:"side:menu", view:"sidebar",
			data:[
				{ id:"transactions", value:_("Transactions"), icon:"cart" },
				{ id:"customers", value:_("Customers"), icon:"cube" },
				{ id:"charts", value:_("Charts"), icon:"chart-areaspline" },
				{ id:"widgets", value:_("Widgets"), icon:"code-not-equal-variant" },
				{ id:"demos", value:_("Demos"), icon:"view-dashboard" },
				{ id:"prices", value:_("Prices"), icon:"format-line-style" },
				{ id:"tutorials", value:_("Tutorials"), icon:"calendar" }
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
