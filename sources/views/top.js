import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import MenuView from "views/menu";

export default class TopView extends JetView{
	config(){
		return {
			cols:[
				MenuView,
				{
					rows:[
						ToolView,
						{
							type:"space", cols:[
								{ $subview:true }
							]
						}
					]
				}
			]
		};
	}
}
