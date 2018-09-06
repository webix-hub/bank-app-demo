import {JetView} from "webix-jet";
export default class GridBase extends JetView {
	config(){
		return {
			view:"datatable", select:true,
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
					id:"", header:"Payment", fillspace:1, minWidth:200, sort:"text",
					template:data => {
						return `<img style="margin-bottom:-6px;margin-right:8px;" src="sources/styles/${data.method}.svg" />${data.method} ${data.number || ""}`
					}
				},
				{
					id:"", header:"Purchase", fillspace:2, sort:"text",
					template: data => `${data.name} / ${data.city} / ${data.country}`
				},
				{
					id:"type", header:"+/-", width:40, sort:"int", css:"type", hidden:true,
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
}