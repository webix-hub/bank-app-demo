import {JetView} from "webix-jet";
import {notifications} from "models/notifications";

export default class NotificationView extends JetView {
    config(){
        return {
            view:"popup", body:{
                rows:[
                    {
                        view:"list", width:250, height:350,
                        template:(obj,common) => {
                            let result = common.itemNew(obj) + "<b>" + obj.title + "</b>";
                            result += (!obj.read ? "</span> " : "") + "<br/>"; 
                            result += obj.message;
                            return result;
                        },
                        type:{
                            itemNew: obj => !obj.read ? "<span class='unread'>&#9728; " : "",
                            height:150
                        }
                    },
                    {
                        template:"See all notifications",
                        autoheight:true
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
