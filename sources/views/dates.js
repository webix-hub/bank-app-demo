import {JetView} from "webix-jet";
export default class DatesView extends JetView{
	config(){
        return {
            view:"calendar",
            on:{
                onDateSelect: date => this.app.callEvent("date:select",[date])
            }
        };
    }
    init(calendar){
        this.on(this.app,"taction:select",date => calendar.setValue(date));
    }
}
