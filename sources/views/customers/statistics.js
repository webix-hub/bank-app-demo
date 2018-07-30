import {JetView} from "webix-jet";
import GeoView from "views/customers/geo";
import MoneyView from "views/customers/money";
import AgeView from "views/customers/age";
import TagsView from "views/customers/tags";

export default class StatisticsView extends JetView {
    config(){
        return {
            type:"wide", cols:[
                {
                    type:"wide", rows:[
                        GeoView,
                        MoneyView
                    ]
                },
                {
                    type:"wide", rows:[
                        AgeView,
                        TagsView,
                        { template:"Positions pie" }
                    ]
                }
            ]
        };
    }
}
