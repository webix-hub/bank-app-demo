import {JetView} from "webix-jet";
import {notifications} from "models/notifications";
import {newNotification} from "models/newnotifications";

export default class NotificationView extends JetView {
	config(){
		return {
			view:"popup",
			body:{
				rows:[
					{
						view:"list",
						localId:"list",
						// select:true,
						borderless:true,
						css:"notifications",
						width:250, height:350,
						template:(obj,common) => {
							return (!obj.read ? common.itemNew() : "") +
								"<span class='m_title" + (!obj.read ? " unread" : "") + "'>" + obj.title + "</span>" +
								"<span class='message'>" + obj.message + "</span>";
						},
						type:{
							itemNew:() => "<span class='webix_icon mdi mdi-alert-decagram unread'></span>",
							height:"auto"
						}
					},
					{
						template:"<a class='link' route='top/snippets'>See all notifications</a>",
						autoheight:true, borderless:true
					}
				]
			}
		};
	}
	init(){
		const list = this.$$("list");
		list.sync(notifications);

		this.on(this.app,"new:notification",() => {
			list.add(newNotification(),0);
		});
	}
	showPopup(pos){
		this.getRoot().show(pos);
		this.app.callEvent("read:notifications");
		const list = this.$$("list");
		webix.delay(() => {
			const unread = list.find(obj => obj.read === 0);
			for (let i = 0; i < unread.length; i++)
				list.updateItem(unread[i].id,{ read:1 });
		},null,null,1000);
	}
}
