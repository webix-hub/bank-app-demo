import {JetView} from "webix-jet";
import {notifications} from "models/notifications";

export default class NotificationView extends JetView {
	config(){
		return {
			view:"popup",
			body:{
				rows:[
					{
						view:"list",
						borderless:true,
						css:"notifications",
						width:250, height:350,
						template:(obj,common) => {
							return (!obj.read ? common.itemNew() : "") +
								"<span class='m_title'>" + obj.title + "</span>" +
								"<span class='message'>" + obj.message + "</span>";
						},
						type:{
							itemNew: () => "<span class='webix_icon mdi mdi-alert-decagram unread'></span>",
							height:120
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
	init(view){
		view.queryView({view:"list"}).sync(notifications);
	}
	showLatest(pos){
		this.getRoot().show(pos);
		//this.app.callEvent("read:notifications");
	}
}
