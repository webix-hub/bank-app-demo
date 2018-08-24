import {JetView} from "webix-jet";
import NotificationView from "views/notifications";

export default class ToolView extends JetView {
	config(){
		return {
			view:"toolbar", height:60,
			elements:[
				{
					view:"button", type:"icon", icon:"menu",
					width:37, css:"toolbar_button",
					click:() => this.app.callEvent("menu:toggle")
				},
				{ css:"logo" },
				{},
				{
					view:"button", type:"icon", icon:"credit-card",
					width:37, css:"toolbar_button", tooltip:"Make a payment"
				},
				{
					view:"button", //localId:"bell",
					type:"icon", icon:"bell",
					badge:2, width:37, css:"toolbar_button",
					tooltip:"Open latest notifications",
					click: function(){
						this.$scope.notifications.showLatest(this.$view);
					}
				},
				{
					view:"button", type:"icon", icon:"settings",
					width:37, css:"toolbar_button",
					tooltip:"Go to settings",
					click:() => this.show("/top/typography")
				}
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationView);

		// this.on(this.app,"read:notifications",() => {
		//	 this.$$("bell").config.badge = "";
		//	 this.$$("bell").refresh();
		// });
	}
}
