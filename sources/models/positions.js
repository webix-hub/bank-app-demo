import {persons} from "models/persons";

export function getPositions(){ 
	return positions;
}

export function getPositionsData(){ 
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

const positions = [
	{ id:"$empty", value:"-- Not selected --", $empty:true },
	{ id:"1", value:"Sales manager" },
	{ id:"2", value:"Customer service" },
	{ id:"3", value:"General manager" }
];
