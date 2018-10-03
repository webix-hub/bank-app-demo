import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			view:"sidebar",
			css:theme,
			width:200,
			data:[
				{ id:"transactions", value:_("Transactions"), icon:"mdi mdi-cart" },
				{ id:"customers", value:_("Customers"), icon:"mdi mdi-cube" },
				{ id:"charts", value:_("Charts"), icon:"mdi mdi-chart-areaspline" },
				{ id:"widgets", value:_("Widgets"), icon:"mdi mdi-widgets" },
				{ id:"demos", value:_("Demos"), icon:"mdi mdi-cellphone-link" },
				{ id:"prices", value:_("Prices"), icon:"mdi mdi-currency-usd" },
				{ id:"tutorials", value:_("Tutorials"), icon:"mdi mdi-school" }
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
