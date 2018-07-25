import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import PersonsView from "views/persons";
import MenuView from "views/menu";
import CalendarView from "views/calendar";

export default class TopView extends JetView{
	config(){
		const main = {
			type:"space", cols:[
				{ $subview:true },
				{
					type:"wide", rows:[
						PersonsView,
						CalendarView
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