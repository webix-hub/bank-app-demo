import {JetView} from "webix-jet";
import {getTagsData} from "models/tagsdata";

export default class TagsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		
		return {
			type:"clean", rows:[
				{
					template:_("Awarded Badges"), type:"header",
					css:"webix_header chart_header"
				},
				{
					view:"chart",
					type:"barH",
					localId:"chart",
					radius:0,
					barWidth:20,
					value:"#number#",
					border:false,
					padding:{
						top:0,
						left:20,
						bottom:40
					},
					xAxis:{
						start:0,
						end:32,
						step:4,
						color:"#fff", lineColor:"#EDEFF0"
					},
					yAxis:{
						template:"", lines:false, color:"#EDEFF0"
					},
					color:"#color#",
					legend:{
						template:obj => _(obj.tag),
						valign:"middle",
						align:"right",
						width:100,
						marker:{
							type:"round", width:7, height:8
						}
					},
					tooltip:{
						template:"#number# clients"
					}
				}
			]
		};
	}
	init(){
		this.$$("chart").parse(getTagsData());
	}
}
