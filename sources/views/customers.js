import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import InformationView from "views/customers/information";
import VisitsView from "views/customers/visits";

export default class CustomersView extends JetView {
    config(){
        return {
            type:"wide", cols:[
                {
                    rows:[
                        {
                            view:"tabbar", multiview:true, options:[
                                { id:"information", value:"Information", width:150 },
                                { id:"visits", value:"Visits", width:150 },
                                { id:"add", value:"Add customer", width:150 }
                            ]
                        },
                        {
                            animate:false,
                            cells:[
                                { id:"information", $subview:InformationView },
                                { id:"visits", $subview:VisitsView },
                                { id:"form", template:"Same form but empty" }
                            ]
                        }
                    ]
                },
                PersonsView
            ]
        };
    }
}