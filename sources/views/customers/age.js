import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class AgeView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"chart", type:"scatter",
			padding:{
				left:50,
				bottom:40
			},
			xValue:obj => {
				return (new Date().getFullYear() - new Date(obj.birthday).getFullYear());
			},
			value:"#money#",
			item:{
				borderColor:"#fff",
				color:"#8664C6",
				shadow:true,
				radius:7,
				type:"d"
			},
			xAxis:{
				// title:_("Age"),	MOVE SOMEWHERE IF SOMEWHERE IS
				start:22,
				end:44,
				step:4,
				lines:false, color:"#EDEFF0"
			},
			yAxis:{
				// title:_("Total money spent, $"),	MOVE TO HEADER
				start:0,
				end:1500,
				step:500,
				color:"#fff", lineColor:"#EDEFF0"
			},
			tooltip:{
				template:"<b>#fname# #lname#</b><br>$#money#"
			}
		};
	}
	init(view){
		view.sync(persons);
	}
}
