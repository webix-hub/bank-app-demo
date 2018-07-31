import {JetView} from "webix-jet";
import StatisticsView from "views/customers/statistics";
import PersonsView from "views/persons";

export default class ChartsView extends JetView {
	config(){
		return {
			type:"wide", cols:[
				StatisticsView,
				PersonsView
			]
		};
	}
}
