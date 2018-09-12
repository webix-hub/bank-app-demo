import {JetView} from "webix-jet";
import {persons} from "models/persons";
import {getColor} from "helpers/chartcolors";

export default class MoneyView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"chart",
			type:"bar",
			border:false,
			radius:0,
			color:() => getColor(),
			barWidth:24,
			padding:{
				left:60
			},
			value:"#money#",
			xAxis:{
				template:"#lname#", lines:false, color:"#EDEFF0"
				//title:_("Top clients")	MOVE THIS TO HEADER WHEN ONE IS CREATED
			},
			yAxis:{
				start:1000,
				end:1500,
				step:100,
				color:"#fff",
				lineColor:"#EDEFF0"
				//title:_("Money spent, $")	MOVE THIS TO TOOLTIPS OR SOMETHING
			},
			tooltip:{
				template:"<b>#fname# #lname#</b><br>$#money#"
			}
		};
	}
	init(view){
		view.sync(persons,function(){
			this.filter(obj => obj.money > 1100);
			this.sort("money","desc");
		});
	}
}
