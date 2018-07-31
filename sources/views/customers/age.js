import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class AgeView extends JetView {
	config(){
		return {
			view:"chart", type:"scatter",
			padding:{
				left:60,
				bottom:50
			},
			xValue:obj => {
				return (new Date().getFullYear()
					- new Date(obj.birthday).getFullYear());
			},
			value:"#money#",
			item:{
				borderColor:"#fff",
				color:"#b64040",
				shadow:true,
				radius:7,
				type:"d"
			},
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
