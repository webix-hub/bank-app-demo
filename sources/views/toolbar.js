import {JetView} from "webix-jet";
import NotificationView from "views/notifications.js"

export default class ToolView extends JetView {
    config(){
        return {
            view:"toolbar", height:60, elements:[
                {
                    view:"button", type:"icon", icon:"bars",
                    width:37, css:"toolbar_button",
                    click:() => this.app.callEvent("menu:toggle")
                },
                {},
                {
                    view:"button", type:"icon", icon:"info-circle",
                    width:37, css:"toolbar_button"
                },
                {
                    view:"button", //localId:"bell",
                    type:"icon", icon:"bell",
                    badge:2, width:37, css:"toolbar_button",
                    click: function(){
                        this.$scope.notifications.showLatest(this.$view);
                    }
                },
                {
                    view:"button", type:"icon", icon:"cog",
                    width:37, css:"toolbar_button",
                    click:() => this.show("/top/typography")
                }
            ]
        };
    }
    init(){
        this.notifications = this.ui(NotificationView);

        // this.on(this.app,"read:notifications",() => {
        //     this.$$("bell").config.badge = "";
        //     this.$$("bell").refresh();
        // });
    }
}
