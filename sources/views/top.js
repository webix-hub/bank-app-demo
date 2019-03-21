import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import MenuView from "views/menu";

export default class TopView extends JetView{
	config(){
		return {
			rows:[
				ToolView,
				{
					cols:[
						MenuView,
						{
							type:"space",
							cols:[
								{ $subview:true }
							]
						}
					]
				}
			]
		};
	}
}
