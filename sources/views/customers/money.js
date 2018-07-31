import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class MoneyView extends JetView {
	config(){
		return {
			view:"chart", type:"bar",
			value:"#money#",
			xAxis:{
				template:"#lname#",
				title:"Top clients"
			},
			yAxis:{
				start:1000,
				end:1500,
				step:100,
				title:"Money spent, $"
			},
			tooltip:{
				template:"<b>#fname# #lname#</b><br>$#money#"
			}
		};
	}
	init(view){
		view.sync(persons,function(){
			this.filter(function(obj){
				return obj.money > 1100;
			});
			this.sort("money","desc");
		});
	}
}