import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import DatesView from "views/dates";
import AllTActions from "views/alltactions";

export default class TransactionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		const right = {
			type:"wide", rows:[
				PersonsView,
				DatesView
			]
		};

		const left = {
			rows:[
				{
					view:"toolbar",
					elements:[
						{ view:"label", label:_("Transactions"), minWidth:100 },
						{},
						{
							view:"segmented", minWidth:333,
							options:[
								{ id:"all", value:_("All") },
								{ id:"0", value:_("Payments") },
								{ id:"1", value:_("Incoming") }
							],
							on:{
								onChange:newv => this.app.callEvent("tactions:filter",[newv])
							}
						},
					]
				},
				AllTActions
			]
		};

		return {
			type:"wide", cols:[
				left, right
			]
		};
	}
}
