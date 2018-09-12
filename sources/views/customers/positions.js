import {JetView} from "webix-jet";
import {getPositionsData} from "models/positions";

export default class PositionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"chart",
			type:"donut",
			value:"#number#",
			lineColor:obj => obj.color,
			color:"#color#",
			innerRadius:65,
			legend:{
				width:220,
				align:"right",
				valign:"middle",
				marker:{
					type:"round", width:7, height:8
				},
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
