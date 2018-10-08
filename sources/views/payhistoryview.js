import {JetView} from "webix-jet";
import PaymentHistoryView from "views/customers/paymenthistory";
import PersonsView from "views/persons";

export default class PayHistoryView extends JetView {
	config(){
		return {
			type:"wide", cols:[
				PaymentHistoryView,
				PersonsView
			]
		};
	}
	ready(){
		this.app.callEvent("payment:history:ready");
	}
}
