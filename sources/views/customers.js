import {JetView} from "webix-jet";
import PersonsView from "views/persons";

export default class CustomersView extends JetView {
    config(){
        return {
            type:"wide", cols:[
                {
                    template:"Will be added in stage 2"
                },
                PersonsView
            ]
        };
    }
}