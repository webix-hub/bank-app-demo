import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";

export default class AllTActionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const dateFormat = webix.Date.dateToStr(this.app.config.dateFormat);

		return {
			view:"datatable",
			select:true,
			columns:[
				{ id:"id", header:"#", width:40, sort:"int" },
				{
					id:"status", header:"", width:40,
					css:"status", sort:"text",
					template:data => {
						let icon = "";
						if (data.status === "success")
							icon = "check-circle";
						else if (data.status === "failed")
							icon = "alert-box";
						else
							icon = "clock";
						return `<span class='webix_icon mdi mdi-${icon} ${data.status}'></span>`;
					}
				},
				{
					id:"date", header:_("Date"), fillspace:2, minWidth:170,
					sort:"date", format:dateFormat
				},
				{
					id:"", header:_("Payment"), fillspace:3, minWidth:240, sort:"text",
					template:data => {
						return `<img style="margin-bottom:-7px;margin-right:8px;" src="sources/styles/${data.method}.svg" />${data.method} ${data.number || ""}`;
					}
				},
				{
					id:"", header:_("Purchase"), fillspace:4, sort:"text",
					template: data => `${data.name} / ${data.city} / ${data.country}`
				},
				{
					id:"type", header:"+/-", sort:"int", css:"type",
					template:data => {
						let type = data.type ? "plus incoming" : "minus payment";
						return `<span class='webix_icon mdi mdi-${type}'></span>`;
					}
				},
				{ id:"sum", header:_("Sum"), sort:"int", format:webix.i18n.priceFormat },
				{ id:"left", header:_("Left"), sort:"int", format:webix.i18n.priceFormat }
			]
		};
	}
	init(grid){
		const _ = this.app.getService("locale")._;
		const list_length = this.app.config.listLength;
		
		grid.sync(allpayments,function(){
			this.filter(obj => obj.id <= list_length);
		});

		this.on(this.app,"tactions:filter",type => {
			if (type === "all") grid.filter();
			else grid.filter(obj => obj.type == type);
		});

		grid.attachEvent("onAfterSelect", obj => {
			const record = allpayments.getItem(obj.row);
			this.app.callEvent("taction:select",[record]);
		});

		grid.attachEvent("onBeforeUnSelect", () => this.app.callEvent("taction:select"));

		this.on(this.app,"person:select", person => {
			grid.select(person.company);
			grid.showItem(person.company);
		});

		this.on(this.app,"date:select",date => {
			const taction = grid.find(obj => {
				return obj.date.toString().slice(0,14) === date.toString().slice(0,14);
			});

			if (taction.length && grid.data.order.find(taction[0].id) !== -1){
				grid.select(taction[0].id);
				grid.showItem(taction[0].id);
			}
			else {
				grid.clearSelection();
				webix.message(_("Nothing on this day"));
			}
		});
	}
}
