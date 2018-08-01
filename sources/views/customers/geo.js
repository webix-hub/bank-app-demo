import {JetView} from "webix-jet";
import {cities} from "models/cities";
import {persons} from "models/persons";
import {geoData} from "helpers/geodata";

export default class GeoView extends JetView {
	config(){
		return {
			view:"geochart", gravity:2,
			// provide your own Google API key
			// https://developers.google.com/maps/documentation/javascript/get-api-key
			key:"AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
			chart:{
				colorAxis:{ colors:["blue","gold","red"] }
			},
			columns:["country","money"],
			tooltip:"Clients: #clients#<br/>Income: #money#"
		};
	}
	init(view){
		view.parse(geoData(cities,persons));
	}
}
