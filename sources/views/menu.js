import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		return {
			rows:[
				{
					css:"logo", height:60
				},
				{
					width:250, localId:"side:menu", view:"sidebar",
					data:[
						{ id:"transactions", value:"Transactions", icon:"cart" },
						{ id:"customers", value:"Customers", icon:"cube" },
						{ id:"snippets", value:"Snippets", icon:"code-not-equal-variant" },
						{ id:"layout", value:"Layout", icon:"view-dashboard" },
						{ id:"charts", value:"Charts", icon:"chart-areaspline" },
						{ id:"typography", value:"Typography", icon:"format-line-style" },
						{ id:"calendar", value:"Calendar", icon:"calendar" },
						{ id:"filemanager", value:"File Manager", icon:"folder-star" }
					]
				}
			]
		};
	}
	init(){
		this.use(plugins.Menu,{
			id:"side:menu",
			urls:{
				"transactions":"transactions/alltactions"
			}
		});
		this.on(this.app,"menu:toggle",() => this.$$("side:menu").toggle());
	}
}
