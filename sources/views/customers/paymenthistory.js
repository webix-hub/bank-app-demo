import {JetView} from "webix-jet";
import {individualpayments} from "models/individualpayments";

export default class PaymentHistoryView extends JetView{
	config(){
		return {
			view:"datatable",
			autoConfig:true
		};
	}
	init(view){
		view.sync(individualpayments,function(){
			this.filter(obj => obj.id%2 === 0);
		});
		this.on(this.app,"person:select",person => view.filter(obj => {
			return obj.id%2 === person.id%2;
		}));
	}
}
