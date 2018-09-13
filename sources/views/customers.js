import {JetView, plugins} from "webix-jet";
import PersonsView from "views/persons";

export default class CustomersView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"wide",
			cols:[
				{
					localId:"inner:layout", rows:[
						{
							view:"tabbar", localId:"tabbar",
							borderless:false, height:43,
							options:[
								{ id:"information", value:_("Information"), width:170 },
								{ id:"paymenthistory", value:_("Payment History"), width:170 },
								{ id:"statistics", value:_("Statistics"), width:170 }
								
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
		this._spacer = "";
	}
	urlChange(ui,url){
		if (url[0].page === "customers" && url[1].page === "statistics")
			this._spacer = this.$$("inner:layout").addView({ height:12 },1);
		else {
			if (this._spacer){
				this.$$("inner:layout").removeView(this._spacer);
				this._spacer = "";
			}
		}
	}
}