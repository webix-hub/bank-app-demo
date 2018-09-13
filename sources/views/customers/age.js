import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class AgeView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			type:"clean",
			rows:[
				{ template:_("Income from various age groups"), type:"header", css:"webix_header chart_header" },
				{
					view:"chart", type:"scatter",
					localId:"chart",
					padding:{
						top:10,
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
						start:22,
						end:44,
						step:4,
						lines:false, color:"#EDEFF0"
					},
					yAxis:{
						start:0,
						end:1500,
						step:500,
						color:"#fff", lineColor:"#EDEFF0"
					},
					tooltip:{
						template:"<b>#fname# #lname#</b><br>$#money#"
					}
				}
			]
		};
	}
	init(){
		this.$$("chart").sync(persons);
	}
}
