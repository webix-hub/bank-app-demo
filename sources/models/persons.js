import {cities} from "models/cities";
import {tags} from "models/tags";

export const persons = new webix.DataCollection({
	url:"data/persons.json"
});

export function geoData(){
	let data = [];
	return persons.waitData.then(() => {
		cities.map(city => {
			if (city.id !== "$empty"){
				let country = city.value.split(", ").pop();
				
				let clients = persons.find(obj => obj.city === city.id);
				let money = 0;
				clients.map(client => {
					money += parseFloat(client.money);
				});
				money = Math.round(money*100)/100;
				data.push({ country:country, clients:clients.length, money:money });
				
			}
		});
		return data;
	});
}

export function getTags(){
	let data = [];

	return persons.waitData.then(() => {
		tags.map(tag => {
			let who = persons.find(pers => {
				return pers.tags.find(el => el === tag.id);
			});
			data.push({ tag:tag.value, number:who.length });
		});
		return data;
	});
}
