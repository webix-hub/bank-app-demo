import {JetView} from "webix-jet";
export default class DatesView extends JetView{
	config(){
		return {
			view:"calendar",
			width:250,
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
