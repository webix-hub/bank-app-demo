import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class AgeView extends JetView {
	config(){
		return {
			view:"chart", type:"scatter",
			xValue:obj => {
				return (new Date().getFullYear()
					- new Date(obj.birthday).getFullYear());
			},
			value:"#money#",
			preset:"diamond",
			xAxis:{
				title:"Age",
				start:22,
				end:44,
				step:1
			},
			yAxis:{
				title:"Total money spent, $",
				start:0,
				end:1500,
				step:250
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
