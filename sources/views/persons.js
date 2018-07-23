import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
    config(){
        return {
            rows:[
                {
                    view:"toolbar", elements:[
                        { view:"label", label:"Payments" },
                        {},
                        {
                            view:"button", type:"icon", icon:"search",
                            width:37, css:"toolbar_button"
                        }
                    ]
                },
                {
                    view:"list", data:persons, css:"persons_list",
                    select:true,
                    type:{
                        template:(data,common) => common.userPic(data) + data.name + common.money(data),
                        userPic:data => "<span class='userpic'>" + data.name.charAt(0) + "</span>",
                        money:data => "<span class='money'>$" + data.money + "</span>",
                        height:90
                    }
                }
            ]
        };
    }
}
