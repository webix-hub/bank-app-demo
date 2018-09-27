import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			width:200, view:"sidebar", css:theme,
			data:[
				{ id:"transactions", value:_("Transactions"), icon:"mdi mdi-cart" },
				{ id:"customers", value:_("Customers"), icon:"mdi mdi-cube" },
				{ id:"charts", value:_("Charts"), icon:"mdi mdi-chart-areaspline" },
				{ id:"widgets", value:_("Widgets"), icon:"mdi mdi-code-not-equal-variant" },
				{ id:"demos", value:_("Demos"), icon:"mdi mdi-view-dashboard" },
				{ id:"prices", value:_("Prices"), icon:"mdi mdi-format-line-style" },
				{ id:"tutorials", value:_("Tutorials"), icon:"mdi mdi-calendar" }
			]
		};
	}
	init(sidebar){
		this.use(plugins.Menu,{
			id:sidebar,
			urls:{
				"customers":"customers?user=1/information"
			}
		});
		this.on(this.app,"menu:toggle",() => sidebar.toggle());
		sidebar.getPopup().attachEvent("onBeforeShow",() => false);
	}
	urlChange(ui,url){
		if (!ui.find(opts => url[1].page === opts.id).length)
			ui.unselect();
	}
}
