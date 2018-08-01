export function getPositions(positions,persons){
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
