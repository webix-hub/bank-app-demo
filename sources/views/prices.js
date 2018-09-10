import {JetView} from "webix-jet";
export default class PricesView extends JetView {
	config(){
		return {
			template:`<div style="overflow:scroll; height:100%;">
			<iframe scrolling="no" src="https://webix.com/licenses/" style="border:0px none; height:1550px; margin-top:-70px; width:100%;">
			</iframe>
			</div>`,
			css:"ifr_template"
		};
	}
}
