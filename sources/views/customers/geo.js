import {JetView} from "webix-jet";
import {geoData} from "models/persons";

export default class GeoView extends JetView {
	config(){
		return {
			view:"geochart", gravity:2,
			// provide your own Google API key
			// https://developers.google.com/maps/documentation/javascript/get-api-key
			key:"AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
			chart:{
				legend:"none",
				colorAxis: { colors: ["#9370db"] }
			},
			columns:["country","clients"],
			tooltip:"Clients: #clients#<br/>Income: #money#"
		};
	}
	init(view){
		view.parse(geoData());
	}
}
