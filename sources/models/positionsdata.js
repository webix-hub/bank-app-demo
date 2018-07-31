import {positions} from "models/positions";
import {persons} from "models/persons";

export function getPositions(){
	let data = [];
	return persons.waitData.then(() => {
		positions.map(pos => {
			if (pos.id !== "$empty"){
				let who = persons.find(pers => pers.position === pos.id);
				data.push({ position:pos.value, number:who.length });
			}
		});
		return data;
	});
}
