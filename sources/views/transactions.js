import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import DatesView from "views/dates";
import AllTActions from "views/alltactions";

export default class TransactionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;

		const right = {
			type:"wide", rows:[
				PersonsView,
				DatesView
			]
		};

		const left = {
			rows:[
				{
					view:"toolbar", css:theme,
					elements:[
						{ width:4 },
						{ view:"label", label:_("Transactions"), width:150 },
						{ minWidth:4 },
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
						{ width:6 }
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
