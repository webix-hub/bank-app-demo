import {JetView} from "webix-jet";
import {individualpayments} from "models/individualpayments";

export default class PaymentHistoryView extends JetView{
	config(){
		const dateFormat = webix.Date.dateToStr(this.app.config.dateFormat);

		return {
			view:"datatable",
			select:true,
			tooltip:true,
			columns:[
				{
					id:"date", header:"Date", sort:"date",
					format:dateFormat,
					width:155, tooltip:""
				},
				{
					id:"type", header:"Type", sort:"string",
					adjust:"header", tooltip:obj => obj.type ? "Bought" : "Sold",
					template:obj => {
						let type = obj.type ? "left bought" : "right sold";
						return `<span class="webix_icon mdi mdi-arrow-${type}"></span>`;
					}
				},
				{
					id:"item", header:"Item", sort:"string",
					fillspace:8, tooltip:"#item#"
				},
				{
					id:"number", header:"Quantity", sort:"int",
					width:67, tooltip:""
				},
				{
					id:"sum", header:"Cost", sort:"int",
					format:webix.i18n.priceFormat, adjust:"data",
					tooltip:""
				}
			]
		};
	}
	init(view){
		const cur_user = this.getParam("user",true);
		
		view.sync(individualpayments,function(){
			if (cur_user) this.filter(obj => obj.id%6 === cur_user%6);
		});
		
		this.on(this.app,"person:select",person => {
			individualpayments.waitData.then(() => {
				view.filter(obj => {
					return obj.id%6 === person.id%6;
				});
			});
		});
	}
}
