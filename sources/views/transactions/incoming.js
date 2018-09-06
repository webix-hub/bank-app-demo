import {JetView} from "webix-jet";
import {getIncoming} from "models/allpayments";
import GridBase from "views/transactions/gridbase";
import findTAction from "helpers/findtaction";

export default class IncomingView extends JetView {
	config(){
		return {
			rows:[
				{ $subview:GridBase }
			]
		};
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});

		grid.parse(getIncoming());
		
		grid.attachEvent("onAfterSelect", obj => {
			const record = grid.data.getItem(obj.row);
			this.app.callEvent("taction:select",[record.date,record.id]);
		});

		this.on(this.app,"date:select",date =>findTAction(grid,grid.data,date));
	}
}
