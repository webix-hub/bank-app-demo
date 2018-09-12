import {JetView} from "webix-jet";
import {getPositionsData} from "models/positions";

export default class PositionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"chart",
			type:"donut",
			value:"#number#",
			legend:{
				width:200,
				align:"right",
				valign:"middle",
				template:obj => _(obj.position)
			},
			shadow:false,
			tooltip:{ template:obj => `${_("Clients")}: ${obj.number}` }
		};
	}
	init(view){
		view.parse(getPositionsData());
	}
}
