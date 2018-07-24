import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";
import GridBase from "views/gridbase";

export default class PaymentsView extends JetView {
    config(){
        return {
            rows:[
                { $subview:GridBase }
            ]
        };
    }
    ready(view){
        const grid = view.queryView({view:"datatable"});
        grid.sync(allpayments,function(){
			this.filter(function(data){
				return data.type === 0;
			});
		});
        
    }
}
