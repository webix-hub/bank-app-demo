import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import InformationView from "views/customers/information";
import StatisticsView from "views/customers/statistics";

export default class CustomersView extends JetView {
	config(){
		return {
			type:"wide", cols:[
				{
					rows:[
						{
							view:"tabbar", multiview:true, options:[
								{ id:"information", value:"Information", width:150 },
								{ id:"statistics", value:"Statistics", width:150 },
								{ id:"add", value:"Something", width:150 }
							]
						},
						{
							animate:false,
							cells:[
								{ id:"information", $subview:InformationView },
								{ id:"statistics", $subview:StatisticsView },
								{ id:"add", template:"Something else" }
							]
						}
					]
				},
				PersonsView
			]
		};
	}
	ready(){
		this.app.callEvent("customers:init");
	}
}