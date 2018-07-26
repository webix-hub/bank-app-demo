import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/transactions",
			views:{
                "alltactions":"transactions.alltactions",
                "payments":"transactions.payments",
                "incoming":"transactions.incoming"
            }
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.ui.scrollSize)
			webix.CustomScroll.init();
		new MyApp().render();
	});
}