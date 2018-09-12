import {JetView} from "webix-jet";

export default class PaymentHistoryView extends JetView{
	config(){
		return {
			view:"datatable", autoConfig:true,
			data:[]
		};
	}
}
