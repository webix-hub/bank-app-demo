import {JetView} from "webix-jet";
import {getPositionsData} from "models/positions";

export default class PositionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			gravity:1.02, type:"clean",
			rows:[
				{
					template:_("Clients by occupation"), type:"header",
					css:"webix_header chart_header"
				},
				{
					view:"chart",
					type:"donut",
					localId:"chart",
					value:"#number#",
					lineColor:obj => obj.color,
					color:"#color#",
					innerRadius:60,
					padding:{ top:10, bottom:20 },
					legend:{
						width:220,
						align:"right",
						valign:"middle",
						marker:{
							type:"round", width:7, height:8
						},
						template:obj => _(obj.position)
					},
					shadow:false,
					tooltip:{ template:obj => `${_("Clients")}: ${obj.number}` }
				}
			]
		};
	}
	init(){
		this.$$("chart").parse(getPositionsData());
	}
}
