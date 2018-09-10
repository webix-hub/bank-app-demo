import {JetView} from "webix-jet";
export default class WidgetsView extends JetView {
	config(){
		return {
			template:`<div style="overflow:scroll; height:100%;">
			<iframe scrolling="no" src="https://webix.com/widgets/" style="border:0px none; height:3570px; margin-top:-70px; width:100%;">
			</iframe>
			</div>`,
			css:"ifr_template"
		};
	}
}
