import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";
import GridBase from "views/gridbase";
import findTAction from "helpers/findtaction";

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

        grid.attachEvent("onAfterSelect", obj => {
            const date = allpayments.getItem(obj.row).date;
            this.app.callEvent("taction:select",[date]);
        });

        this.on(this.app,"date:select",date =>findTAction(grid,allpayments,date));
    }
}
