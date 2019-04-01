import {JetView} from "webix-jet";
import {persons} from "models/persons";
import {getColor} from "helpers/chartcolors";

export default class MoneyView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			type:"clean", rows:[
				{ template:_("Top clients"), type:"header", css:"chart_header" },
				{
					view:"chart",
					type:"bar",
					localId:"chart",
					border:false,
					radius:0,
					color:() => getColor(),
					barWidth:24,
					padding:{
						top:5,
						left:60
					},
					value:"#money#",
					xAxis:{
						template:"#lname#", lines:false, color:"#EDEFF0"
					},
					yAxis:{
						start:1000,
						end:1500,
						step:100,
						color:"#fff",
						lineColor:"#EDEFF0"
					},
					tooltip:{
						template:obj => {
							return `<div class="username_chart">${obj.fname} ${obj.lname}</div>
							<p align="center" style="margin:0px;"><img src="data/photos/${obj.photo}_1.jpg" width="100px" height="100px"></p>
							$${obj.money}`;
						}
					}
				}
			]
		};
	}
	init(){
		this.$$("chart").sync(persons,function(){
			this.filter(obj => obj.money > 1100);
			this.sort("money","desc");
		});
	}
}
