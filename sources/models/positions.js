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
				data.push({ position:pos.value, number:who.length, color:pos.color });
			}
		});
		return data;
	});
}

const positions = [
	{ id:"$empty", value:"-- Not selected --", $empty:true },
	{ id:"1", value:"Sales manager", color:"#8664C6" },
	{ id:"2", value:"Customer service", color:"#1CA1C1" },
	{ id:"3", value:"General manager", color:"#F8643F" }
];
