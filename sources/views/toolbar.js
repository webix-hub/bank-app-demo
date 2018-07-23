import {JetView} from "webix-jet";
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
                    view:"button", type:"icon", icon:"bell", badge:3,
                    width:37, css:"toolbar_button"
                },
                {
                    view:"button", type:"icon", icon:"cog",
                    width:37, css:"toolbar_button"
                }
            ]
        };
    }
}
