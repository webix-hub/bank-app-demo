import {JetView} from "webix-jet";
import NotificationView from "views/notifications";

export default class ToolView extends JetView {
	config(){
		return {
			view:"toolbar",
			height:60,
			elements:[
				{
					paddingY:7,
					rows:[
						{
							view:"icon", icon:"menu",
							click:() => this.app.callEvent("menu:toggle")
						}
					]
				},
				{ css:"logo" },
				{},
				{
					paddingY:7,
					rows:[
						{
							cols:[
								{
									view:"icon", icon:"bell", badge:2,
									tooltip:"Open latest notifications",
									click:function(){
										this.$scope.notifications.showLatest(this.$view);
									}
								},
								{
									view:"icon", icon:"settings",
									tooltip:"Go to settings",
									click:() => this.show("/top/settings")
								}
							]
						}
					]
				}
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationView);
	}
}
