import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id			: APPNAME,
			version 	: VERSION,
			router 		: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 		: !PRODUCTION,
			start 		: "/top/transactions",
			theme		: webix.storage.local.get("bank_app_theme") || "",
			dateFormat	: "%j %F, %H:%i",
			views:{
				"information":"customers.information",
				"statistics":"customers.statistics",
				"paymenthistory":"customers.paymenthistory"
			}
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		// webix.codebase = "//cdn.webix.com/components/tinymce/";
		if (!webix.env.touch && webix.ui.scrollSize && webix.CustomScroll)
			webix.CustomScroll.init();
		const app = new MyApp();
		app.use(plugins.Locale,{ storage:webix.storage.local });
		app.render();
	});
}
