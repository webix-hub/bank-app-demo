import {JetView} from "webix-jet";
import {positions} from "models/positions";
import {persons} from "models/persons";
import {getPositions} from "helpers/positionsdata";

export default class PositionsView extends JetView {
	config(){
		return {
			view:"chart",
			type:"pie",
			value:"#number#",
			pieInnerText:obj => `<span style='color:#fff;font-size:24px;'>${obj.number}</span>`,
			legend:{
				width:150,
				align:"right",
				valign:"middle",
				template:"#position#"
			},
			shadow:false
		};
	}
	init(view){
		view.parse(getPositions(positions,persons));
	}
}
