import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id			: APPNAME,
			version 	: VERSION,
			router 		: HashRouter,
			debug 		: !PRODUCTION,
			start 		: "/top/transactions",
			theme		: webix.storage.local.get("bank_app_theme") || "",
			dateFormat	: "%j %F, %H:%i",
			listLength	: 50,
			views:{
				"information":"customers.information",
				"statistics":"customers.statistics",
				"paymenthistory":"customers.paymenthistory"
			}
		};

		super({ ...defaults, ...config });

		this.use(plugins.Locale,{ storage:webix.storage.local });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
			webix.CustomScroll.init();
		new MyApp().render();
	});
}
