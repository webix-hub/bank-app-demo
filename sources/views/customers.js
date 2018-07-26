import {JetView} from "webix-jet";
import PersonsView from "views/persons";

export default class CustomersView extends JetView {
    config(){
        return {
            type:"wide", cols:[
                {
                    rows:[
                        {
                            view:"tabbar", multiview:true, options:[
                                { id:"information", value:"Information" },
                                { id:"visits", value:"Visits" },
                                { id:"form", value:"Form" }
                            ]
                        },
                        {
                            animate:false,
                            cells:[
                                { id:"information", template:"Customer form" },
                                { id:"visits", template:"Something about visits" },
                                { id:"form", template:"Something else" }
                            ]
                        }
                    ]
                },
                PersonsView
            ]
        };
    }
}