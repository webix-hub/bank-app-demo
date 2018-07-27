import {JetView} from "webix-jet";
import {cities} from "models/cities";

export default class InformationView extends JetView {
    config(){

        const left_main = {
            gravity:3,
            margin:10, rows:[
                {
                    view:"text", name:"fname",
                    label:"First name", labelPosition:"top",
                    placeholder:"First name"
                },
                {
                    view:"text", name:"lname",
                    label:"Last name", labelPosition:"top",
                    placeholder:"Last name"
                },
                {
                    view:"richselect", name:"position",
                    label:"Position", labelPosition:"top",
                    placeholder:"Click to select",
                    options:[
                        { id:"$empty", value:"-- Not selected --", $empty:true },
                        { id:"1", value:"Sales manager" },
                        { id:"2", value:"Customer service" },
                        { id:"3", value:"General manager" }
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
                    value:1,
                    options:[
                        { id:1, value:"Yes"},
                        { id:2, value:"No" }
                    ]
                },
                { height:20 }
            ]
        };

        const middle_extra = {
            gravity:3,
            margin:10, rows:[
                {
                    view:"richselect", name:"city",
                    label:"City, country", labelPosition:"top",
                    placeholder:"Click to select",
                    options:webix.copy(cities)
                },
                {
                    view:"text", name:"address", label:"Address",
                    labelPosition:"top", placeholder:"Address"
                },
                {
                    view:"datepicker", name:"birthday",
                    label:"Birthday", labelPosition:"top",
                    placeholder:"Click to select",
                    format:webix.Date.dateToStr("%d %M %Y")
                }
            ]
        };

        const right_photo = {
            gravity:3,
            margin:10, rows:[
                {
                    view:"label", name:"photo",
                    width:260, height:260,
                    value:"faceless",
                    template: obj => (`<img class='userphoto' style='height:260px;'
                        src='data/photos/${obj.value}.jpg'></img>`) //class for hover
                },
                {
                    view:"multicombo", name:"tags", options:[
                        { id:"1", value:"New" },
                        { id:"2", value:"Customer" },
                        { id:"3", value:"Supplier" },
                        { id:"4", value:"Discount" },
                        { id:"5", value:"Old Buddy" },
                        { id:"6", value:"Avid Supporter" }
                    ]
                }
            ]
        };

        return {
            view:"form", rows:[
                {
                    cols:[
                        left_main,
                        { gravity:1 },
                        middle_extra,
                        { gravity:2 },
                        right_photo
                    ]
                },
                {
                    view:"richtext", label:"Notes", labelPosition:"top",
                    name:"notes", localId:"notes"
                },
                {
                    margin:10, cols:[
                        {},
                        {
                            view:"button", value:"Reset", width:100,
                            click:() => {
                                this.$$("notes").setValue("");  // ! a crude workaround
                                this.getRoot().clear();
                            }
                        },
                        {
                            view:"button", value:"Save", type:"form", width:100,
                            click:() => {
                                const newdata = this.getRoot().getValues();
                                const id = newdata.id;
                                this.app.callEvent("customer:save",[id,newdata]);
                            }
                        }
                    ]
                }
            ]
        };
    }
    init(form){
        this.on(this.app,"person:select",data => form.setValues(data));
    }
}
