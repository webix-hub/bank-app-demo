import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";
import GridBase from "views/transactions/gridbase";
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
		const grid = view.queryView({ view:"datatable" });

		grid.showColumn("type");

		grid.sync(allpayments);

		grid.attachEvent("onAfterSelect", obj => {
			const record = allpayments.getItem(obj.row);
			this.app.callEvent("taction:select",[record.date,record.id]);
		});

		grid.attachEvent("onBeforeUnSelect", () => this.app.callEvent("taction:select"));

		this.on(this.app,"date:select",date => findTAction(grid,allpayments,date));

		this.on(this.app,"person:select", person => {
			grid.select(person.company);
			grid.showItem(person.company);
		});
	}
}
