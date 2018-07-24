import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";
import GridBase from "views/gridbase";

export default class AllTActionsView extends JetView {
    config(){
        return {
            rows:[
                { $subview:GridBase }
            ]
        };
    }
    ready(view){
        const grid = view.queryView({view:"datatable"});
        grid.showColumn("type");
        grid.sync(allpayments);
        
    }
}
