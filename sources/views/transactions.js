import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import DatesView from "views/dates";
import AllTActions from "views/alltactions";

export default class TransactionsView extends JetView {
	config(){

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
						{ view:"label", label:"Transactions" },
						{},
						{
							view:"segmented",
							options:[
								{ id:"all", value:"All" },
								{ id:"0", value:"Payments" },
								{ id:"1", value:"Incoming" }
							],
							on:{
								onChange: newv => this.app.callEvent("tactions:filter",[newv])
							}
						}
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
