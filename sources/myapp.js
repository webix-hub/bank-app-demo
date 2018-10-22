import "./styles/app.css";
import {JetApp, HashRouter, plugins } from "webix-jet";

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
		const app = new MyApp();
		const size = () => {
			const screen = document.body.offsetWidth;
			return screen > 1210 ? "wide" : (screen > 1060 ? "mid" : "small");
		};
		app.config.size = size();
		
		webix.event(window, "resize", function(){
			var newSize = size();
			if (newSize != app.config.size){
				app.config.size = newSize;
				app.refresh();
			}
		});

		app.render();
	});
}

//track js errors
if (PRODUCTION){
	window.Raven
		.config(
			"https://59d0634de9704b61ba83823ec3bf4787@sentry.webix.io/12"
		)
		.install();
}