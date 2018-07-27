import {JetView} from "webix-jet";
import {cities} from "models/cities";

export default class InformationView extends JetView {
    config(){
        return {
            view:"form", rows:[
                {
                    margin:30, cols:[
                        {
                            margin:10, rows:[
                                {
                                    view:"text", name:"fname",
                                    label:"First name", labelPosition:"top"
                                },
                                {
                                    view:"text", name:"lname",
                                    label:"Last name", labelPosition:"top"
                                },
                                {
                                    view:"richselect", name:"positions",
                                    label:"Position", labelPosition:"top",
                                    placeholder:"Click to select",
                                    options:[
                                        { id:"", value:"-- Not selected --", $empty:true },
                                        { id:1, value:"Sales manager" },
                                        { id:2, value:"Customer service" },
                                        { id:3, value:"General manager" }
                                    ]
                                },
                                {
                                    view:"text", name:"email",
                                    label:"Email", labelPosition:"top",
                                    placeholder:"judetheawesome@obscure.com"
                                },
                                {
                                    view:"radio", name:"notifications",
                                    label:"Notifications", labelPosition:"top",
                                    options:[
                                        { id:1, value:"Yes"},
                                        { id:2, value:"No" }
                                    ]
                                },
                                { height:20 }
                            ]
                        },
                        {
                            rows:[
                                {
                                    view:"richselect", name:"city",
                                    label:"City, country", labelPosition:"top",
                                    placeholder:"Click to select",
                                    options:{
                                        on:{
                                            onShow(){
                                                this.getList().parse(cities);
                                            }
                                        }
                                    }
                                },
                                {},
                                {}
                            ]
                        },
                        {

                        }
                    ]
                },
                {
                    view: "richtext", label:"Notes", labelPosition:"top",
                    name:"notes"
                },
                {
                    margin:10, cols:[
                        {},
                        { view:"button", value:"Reset", width:100 },
                        { view:"button", value:"Save", type:"form", width:100 }
                    ]
                }
            ]
        };
    }
}
