import {JetView} from "webix-jet";
export default class DatesView extends JetView{
	config(){
		const screen = this.app.config.size;

		return {
			view:"calendar",
			width:(screen !== "small") ? 250 : 230,
			height:(screen !== "small") ? 250 : 230,
			on:{
				onDateSelect:date => this.app.callEvent("date:select",[date])
			}
		};
	}
	init(calendar){
		this.on(this.app,"taction:select",record => {
			if (record)
				calendar.setValue(record.date);
		});
	}
}
