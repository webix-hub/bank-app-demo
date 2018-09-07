import {JetView} from "webix-jet";
import {allpayments} from "models/allpayments";

export default class AllTActionsView extends JetView {
	config(){
		return {
			view:"datatable",
			select:true,
			tooltip:true,
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
						return `<span class='webix_icon mdi mdi-${icon} ${data.status}'></span>`
					}
				},
				{
					id:"date", header:"Date", fillspace:1, minWidth:170,
					sort:"date", format:webix.Date.dateToStr("%d %F, %H:%i")
				},
				{
					id:"", header:"Payment", fillspace:1, minWidth:240, sort:"text",
					template:data => {
						return `<img style="margin-bottom:-6px;margin-right:8px;" src="sources/styles/${data.method}.svg" />${data.method} ${data.number || ""}`
					}
				},
				{
					id:"", header:"Purchase", fillspace:2, sort:"text",
					template: data => `${data.name} / ${data.city} / ${data.country}`
				},
				{
					id:"type", header:"+/-", width:40, sort:"int", css:"type",
					template:data => {
						let type = data.type ? "plus incoming" : "minus payment";
							return `<span class='webix_icon mdi mdi-${type}'></span>`;
					}
				},
				{ id:"sum", header:"Sum", sort:"int", format:webix.i18n.priceFormat },
				{ id:"left", header:"Left", sort:"int", format:webix.i18n.priceFormat }
			]
		};
	}
	init(grid){
		grid.sync(allpayments);

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
				webix.message("Nothing on this day");
			}
		});
	}
}