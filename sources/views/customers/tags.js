import {JetView} from "webix-jet";
import {getTags} from "models/persons";

export default class TagsView extends JetView {
	config(){
		return {
			view:"chart",
			type:"barH",
			barWidth:60,
			alpha:0.8,
			value:"#number#",
			yAxis:{
				template:"#tag#"
			}
		};
	}
	init(view){
		view.parse(getTags());
	}
}