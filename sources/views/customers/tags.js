import {JetView} from "webix-jet";
import {getTagsData} from "models/tagsdata";

export default class TagsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		
		return {
			view:"chart",
			type:"barH",
			radius:0,
			barWidth:20,
			value:"#number#",
			border:false,
			padding:{
				top:20,
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
		};
	}
	init(view){
		view.parse(getTagsData());
	}
}
