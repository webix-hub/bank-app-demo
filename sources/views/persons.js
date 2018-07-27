import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
    config(){
        return {
            rows:[
                {
                    view:"toolbar", elements:[
                        { view:"label", label:"Persons" },
                        {
                            view:"text", localId:"search", hidden:true,
                            on:{
                                onBlur(){ this.hide(); },
                                onTimedKeyPress(){
                                    const input = this.getValue().toLowerCase();
                                    this.$scope.$$("list").filter(function(obj){
                                        const name = obj.fname + " " + obj.lname;
                                        return name.toLowerCase().indexOf(input) !== -1;
                                    });
                                }
                            }
                        },
                        {
                            view:"button", type:"icon", icon:"search",
                            width:37, css:"toolbar_button",
                            click:() => {
                                this.$$("search").show();
                                this.$$("search").focus();
                            }
                        }
                    ]
                },
                {
                    view:"list",
                    localId:"list",
                    css:"persons_list",
                    width:260,
                    select:true,
                    type:{
                        template:(data,common) => common.userPic(data) + data.fname + " " + data.lname + common.money(data),
                        userPic:data => "<span class='userpic'>" + data.fname.charAt(0) + "</span>",
                        money:data => "<span class='money'>$" + data.money + "</span>",
                        height:70
                    },
                    on:{
                        onAfterSelect:(id) => {
                            const person = persons.getItem(id);
                            this.app.callEvent("person:select",[person]);
                        }
                    }
                }
            ]
        };
    }
    init(){
        this.$$("list").parse(persons);
        this.on(this.app,"customer:save",(id,data) => persons.updateItem(id,data));
    }
}
