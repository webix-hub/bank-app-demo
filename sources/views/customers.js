import {JetView, plugins} from "webix-jet";
import PersonsView from "views/persons";

export default class CustomersView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"wide",
			cols:[
				{
					rows:[
						{
							view:"tabbar", borderless:false, localId:"tabbar",
							options:[
								{ id:"information", value:_("Information"), width:150 },
								{ id:"paymenthistory", value:_("Payment History"), width:150 },
								{ id:"statistics", value:_("Statistics"), width:150 }
								
							]
						},
						{ $subview:true }
					]
				},
				PersonsView
			]
		};
	}
	init(){
		this.use(plugins.Menu,this.$$("tabbar"));
	}
	urlChange(){
		this.app.callEvent("customers:init",[this.getParam("user")||1]);
	}
}