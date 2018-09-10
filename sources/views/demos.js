import {JetView} from "webix-jet";
export default class DemosView extends JetView {
	config(){
		return {
			template:`<div style="overflow:scroll; height:100%;">
			<iframe scrolling="no" src="https://webix.com/demos/" style="border:0px none; height:5800px; margin-top:-550px; width:100%;">
			</iframe>
			</div>`,
			css:"ifr_template"
		};
	}
}
