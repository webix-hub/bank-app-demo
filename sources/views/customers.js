import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import InformationView from "views/customers/information";
import StatisticsView from "views/customers/statistics";
import PaymentHistoryView from "views/customers/paymenthistory";

export default class CustomersView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"wide",
			cols:[
				{
					rows:[
						{
							view:"tabbar", multiview:true, borderless:false,
							options:[
								{ id:"information", value:_("Information"), width:150 },
								{ id:"payments", value:_("Payment History"), width:150 },
								{ id:"statistics", value:_("Statistics"), width:150 }
								
							]
						},
						{
							animate:false,
							keepViews:true,
							cells:[
								{ id:"information", $subview:InformationView },
								{ id:"payments", $subview:PaymentHistoryView },
								{ id:"statistics", $subview:StatisticsView }
								
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