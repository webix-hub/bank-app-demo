import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import PersonsView from "views/persons";
import MenuView from "views/menu";

export default class TopView extends JetView{
	config(){
		const main = {
			type:"space", cols:[
				{ $subview:true },
				{
					type:"wide", rows:[
						PersonsView,
						{ view:"calendar" }
					]
				}
			]
		};
		return {
			cols:[
				MenuView,
				{
					rows:[
						ToolView,
						main
					]
				}
			]
		};
	}
}