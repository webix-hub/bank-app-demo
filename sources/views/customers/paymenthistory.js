import {JetView} from "webix-jet";
import {individualpayments} from "models/individualpayments";

export default class PaymentHistoryView extends JetView{
	config(){
		const dateFormat = webix.Date.dateToStr(this.app.config.dateFormat);

		return {
			view:"datatable", localId:"grid",
			select:true,
			tooltip:true,
			footer:true,
			columns:[
				{
					id:"date", header:"Date", sort:"date",
					format:dateFormat,
					width:155, tooltip:false,
					footer:{
						text:"Total:"
					}
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
					width:67, tooltip:false
				},
				{
					id:"sum", header:"Cost", sort:"int",
					format:webix.i18n.priceFormat, adjust:"data",
					tooltip:false,
					footer:{
						content:"summColumn",
						tooltip:obj => {
							const sum = this.$$("grid").getHeaderContent(obj.contentId).getValue();
							return _("Total money flow: ") + sum;
						}
					}
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
