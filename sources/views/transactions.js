import {JetView,plugins} from "webix-jet";
import PersonsView from "views/persons";
import CalendarView from "views/calendar";

export default class TransactionsView extends JetView {
    config(){

        const right = {
            type:"wide", rows:[
                PersonsView,
                CalendarView
            ]
        };

        const left = {
            rows:[
                { view:"toolbar", elements:[
                    { view:"label", label:"Transactions" },
                    {},
                    { view:"segmented", localId:"seg:tactions", options:[
                        { id:"alltactions", value:"All" },
                        { id:"payments", value:"Payments" },
                        { id:"incoming", value:"Incoming" }
                    ] }
                ] },
                { $subview:true }
            ]
        };

        return {
            type:"wide", cols:[
                left, right
            ]
        };
    }
    init(){
        this.use(plugins.Menu,"seg:tactions");
    }
}
