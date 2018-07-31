import {tags} from "models/tags";
import {persons} from "models/persons";

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
