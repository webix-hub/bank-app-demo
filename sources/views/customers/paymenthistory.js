import {JetView} from "webix-jet";
import {individualpayments} from "models/individualpayments";

export default class PaymentHistoryView extends JetView{
	config(){
		return {
			view:"datatable",
			select:true,
			tooltip:true,
			columns:[
				{
					id:"date", header:"Date", sort:"date",
					format:webix.Date.dateToStr("%d %F, %H:%i"),
					width:155, tooltip:""
				},
				{
					id:"type", header:"Type", sort:"string",
					adjust:"header", tooltip:obj => obj.type ? "Bought" : "Sold",
					template:obj => {
						let type = obj.type ? "left bought" : "right sold";
						return `<span class="webix_icon mdi mdi-arrow-${type}"></span>`
					}
				},
				{
					id:"item", header:"Item", sort:"string",
					fillspace:8, tooltip:"#item#"
				},
				{
					id:"number", header:"Quantity", sort:"int",
					fillspace:1, tooltip:""
				},
				{
					id:"sum", header:"Cost", sort:"int",
					format:webix.i18n.priceFormat, fillspace:1,
					tooltip:""
				}
			]
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
