import {JetView} from "webix-jet";
import {getTags} from "models/tagsdata";

export default class TagsView extends JetView {
	config(){
		return {
			view:"chart",
			type:"barH",
			alpha:0.8,
			radius:0,
			value:"#number#",
			padding:{
				left:90,
				bottom:60
			},
			xAxis:{
				start:0,
				end:32,
				step:2,
				title:"Awarded badges"
			},
			yAxis:{
				template:"#tag#"
			},
			label:obj => `<span style='font-size:20px;'>${obj.number}</span>`
		};
	}
	init(view){
		view.parse(getTags());
	}
}
