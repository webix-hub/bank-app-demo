let i = 0;
export function getColor(){
	return colors[i++%colors.length];
}

const colors = [
	"#8664C6", "#BCAAE0", "#1CA1C1", "#5ABBD2", "#FDBF4C", "#F8643F"
];
