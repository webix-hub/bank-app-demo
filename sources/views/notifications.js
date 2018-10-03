import {JetView} from "webix-jet";
import {getNotifications} from "models/notifications";
import {newNotification} from "models/newnotifications";

export default class NotificationView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"popup",
			body:{
				view:"list",
				localId:"list",
				select:true,
				borderless:true,
				css:"notifications",
				width:250,
				autoheight:true,
				template:(obj) => {
					return "<span class='m_title'>" + _(obj.title) + "</span>" +
						"<span class='message'>" + _(obj.message) + "</span>";
				},
				type:{
					height:120
				}
			},
			on:{
				onHide:() => {
					const list = this.$$("list");
					list.clearAll();
					list.showOverlay("<div style='margin:20px; font-size:14px;'>No new notifications</div>");
					list.define({ autoheight:false, height:80 });
        			list.resize();
					this.app.callEvent("read:notifications");
				}
			}
		};
	}
	init(){
		const list = this.$$("list");

		list.parse(getNotifications());
		list.waitData.then(() => list.resize());

		webix.extend(list,webix.OverlayBox);

		this.on(this.app,"new:notification",() => {
			list.hideOverlay();
			list.define({ autoheight:true });
        	list.resize();
			list.add(newNotification(),0);
		});
	}
	showPopup(pos){
		this.getRoot().show(pos);
	}
}
