import {JetView} from "webix-jet";
import {getPositions} from "models/positions";
import {persons} from "models/persons";
import {getPositionOptions} from "helpers/positionsdata";

export default class PositionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"chart",
			type:"pie",
			value:"#number#",
			pieInnerText:obj => `<span style='color:#fff;font-size:24px;'>${obj.number}</span>`,
			legend:{
				width:150,
				align:"right",
				valign:"middle",
				template:obj => _(obj.position)
			},
			shadow:false
		};
	}
	init(view){
		//view.parse(getPositionOptions(getPositions(),persons));
		//console.log(getPositionOptions(getPositions(),persons));
	}
}
