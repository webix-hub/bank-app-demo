import {JetView} from "webix-jet";
import GeoView from "views/customers/geo";
import MoneyView from "views/customers/money";
import AgeView from "views/customers/age";
import TagsView from "views/customers/tags";
import PositionsView from "views/customers/positions";

export default class StatisticsView extends JetView {
	config(){
		return {
			type:"wide", cols:[
				{
					type:"wide", rows:[
						{gravity:2},//GeoView,
						MoneyView
					]
				},
				{
					type:"wide", rows:[
						AgeView,
						TagsView,
						PositionsView
					]
				}
			]
		};
	}
}
