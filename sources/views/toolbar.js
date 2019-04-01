import {JetView} from "webix-jet";
import NotificationView from "views/notifications";

export default class ToolView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		return {
			view:"toolbar", css:theme,
			height:56,
			elements:[
				{
					paddingY:7,
					rows:[
						{
							view:"icon", icon:"mdi mdi-menu",
							click:() => this.app.callEvent("menu:toggle"),
							tooltip:_("Click to collapse / expand the sidebar")
						}
					]
				},
				{ css:"logo" },
				{},
				{
					paddingY:7,
					rows:[
						{
							margin:8,
							cols:[
								{
									view:"icon", icon:"mdi mdi-bell",
									localId:"bell", badge:3,
									tooltip:_("Open latest notifications"),
									click:function(){
										this.$scope.notifications.showPopup(this.$view);
									}
								},
								{
									view:"icon", icon:"mdi mdi-settings",
									tooltip:_("Go to settings"),
									click:() => this.show("/top/settings")
								}
							]
						}
					]
				},
				{ width:6 }
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationView);

		this.on(this.app,"read:notifications",() => {
			this.$$("bell").config.badge = 0;
			this.$$("bell").refresh();

			setTimeout(() => {
				if (this.app){
					this.$$("bell").config.badge += 1;
					this.$$("bell").refresh();
					this.app.callEvent("new:notification");
				}
			},10000);
		});
	}
}
