import {JetView} from "webix-jet";
import {cities} from "models/cities";
import {persons} from "models/persons";
import {geoData} from "helpers/geodata";

export default class GeoView extends JetView {
	config(){
		const _ = this.app.getService("locale")._; 
		return {
			view:"geochart", gravity:2,
			// provide your own Google API key
			// https://developers.google.com/maps/documentation/javascript/get-api-key
			key:"AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
			chart:{
				colorAxis:{ colors:[ "#8664C6","#8664C6","#1CA1C1","#FFC107","#F8643F","#F8643F" ] },
				datalessRegionColor:"#D9D8D7",
				legend:"none"
			},
			columns:[
				{ type:"string", label:"country" },
				{ type:"number", label:"money" }
			],
			tooltip:`${_("Clients")}: #clients#<br/>${_("Income")}: #money#`
		};
	}
	init(view){
		view.parse(geoData(cities,persons));
	}
}
