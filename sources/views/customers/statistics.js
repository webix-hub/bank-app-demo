import {JetView} from "webix-jet";
import GeoView from "views/customers/geo";
import MoneyView from "views/customers/money";
import AgeView from "views/customers/age";
import TagsView from "views/customers/tags";
import PositionsView from "views/customers/positions";

export default class StatisticsView extends JetView {
	config(){
		return {
			rows:[
				{
					height:10
				},
				{
					type:"wide",
					rows:[
						{
							gravity:2,
							type:"wide",
							cols:[
								GeoView,
								{
									type:"wide",
									minWidth:370,
									rows:[
										PositionsView,
										TagsView
									]
								}
							]
						},
						{
							type:"wide", cols:[
								MoneyView,
								AgeView
							]
						}
					]
				}
			]
		};
	}
}
