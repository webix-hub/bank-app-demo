import {JetView} from "webix-jet";
// import {notifications} from "models/notifications";
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
				},
				data:[
					{ id:1, title:"Deposits News", message:"Dear client, we inform you about the following changes: beginning from September 24, 2018 all transactions (incoming and out..." },
					{ id:2, title:"Search Improved", message:"Dear client! Following the latest updates of the SeekMeEverywhere engines, your search has become more reliable and convenient! No..." },
					{ id:3, title:"Transaction Reports", message:"Dear client, we inform you about a change in the date of monthly transaction reports. Beginning from September 20, 2018 reports..." }
				]
			},
			on:{
				onHide:() => {
					this.$$("list").clearAll();
					this.$$("list").showOverlay("<div style='margin:20px; font-size:14px;'>There is no data</div>");
					this.app.callEvent("read:notifications");
				}
			}
		};
	}
	init(){
		const list = this.$$("list");
		//list.sync(notifications);
		webix.extend(list,webix.OverlayBox);

		this.on(this.app,"new:notification",() => {
			list.hideOverlay();
			list.add(newNotification(),0);
		});
	}
	showPopup(pos){
		this.getRoot().show(pos);
	}
}
