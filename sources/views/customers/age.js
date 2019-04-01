import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class AgeView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			type:"clean",
			rows:[
				{ template:_("Income from various age groups"), type:"header", css:"chart_header" },
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
						shadow:false,
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
		this.$$("chart").sync(persons);
	}
}
