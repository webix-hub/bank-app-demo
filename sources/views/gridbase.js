import {JetView} from "webix-jet";
export default class GridBase extends JetView {
    config(){
        return {
            view:"datatable", select:true,
            columns:[
                { id:"id", header:"#", width:40, sort:"int" },
                {
                    id:"status", header:"", width:40,
                    css:"status", sort:"text", // when icons - change to custom sorting
                    template:data => `<span class='${data.status}'>&#9728;</span>`
                },
                {
                    id:"date", header:"Date", fillspace:1, minWidth:170, //sort:"date", - custom as well
                    format:webix.Date.dateToStr("%d %F, %H:%i")
                },
                {
                    id:"", header:"Payment", fillspace:1, minWidth:200, sort:"text",
                    template:data => `${data.method} ${data.number || ""}`
                },
                {
                    id:"", header:"Purchase", fillspace:2, sort:"text",
                    template: data => `<span class='shop'>${data.name}</span> / ${data.city} / ${data.country}`
                },
                {
                    id:"type", header:"+/-", width:40, sort:"int", css:"type", hidden:true,
                    template:data => data.type ? "<span class='incoming'>+</span>" : "<span class='payment'>-</span>"
                },
                { id:"sum", header:"Sum", sort:"int", template:data => `$${data.sum}` },
                { id:"left", header:"Left", sort:"int", template:data => `$${data.left}` }
            ]
        };
    }
}