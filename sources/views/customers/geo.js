import {JetView} from "webix-jet";
import {GetGeoData} from "models/geodata";

export default class GeoView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean",
			gravity:2,
			rows:[
				{ template:_("Origin of clients"), type:"header", css:"chart_header" },
				{
					type:"form", rows:[
						{
							view:"geochart",
							localId:"chart",
							borderless:true,
							// provide your own Google API key
							// https://developers.google.com/maps/documentation/javascript/get-api-key
							key:"AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
							chart:{
								colorAxis:{
									colors:[
										"#8664C6","#8664C6","#8664C6",
										"#1CA1C1","#FFC107","#FFC107",
										"#F8643F","#F8643F"
									]
								},
								datalessRegionColor:"#D9D8D7",
								legend:"none"
							},
							columns:[
								{ type:"string", label:"country" },
								{ type:"number", label:"money" }
							],
							tooltip:`<div class="mytooltip">${_("Clients")}: #clients#<br/>${_("Income")}: #money#</div>`
						}
					]
				}
			]
		};
	}
	init(){
		this.$$("chart").parse(GetGeoData());
	}
}
