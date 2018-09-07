import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import InformationView from "views/customers/information";
import StatisticsView from "views/customers/statistics";

export default class CustomersView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"wide", cols:[
				{
					rows:[
						{
							view:"tabbar", multiview:true, borderless:false,
							options:[
								{ id:"information", value:_("Information"), width:150 },
								{ id:"statistics", value:_("Statistics"), width:150 },
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
	urlChange(){
		this.app.callEvent("customers:init",[this.getParam("user")||1]);
	}
}