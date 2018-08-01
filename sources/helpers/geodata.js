export function geoData(cities,persons){
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
