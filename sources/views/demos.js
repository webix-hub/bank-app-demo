import {JetView} from "webix-jet";
export default class DemosView extends JetView {
	config(){
		return {
			template:`<div style="overflow:scroll; height:100%;">
			<iframe scrolling="no" src="https://webix.com/demos/" style="border:0px none; height:5800px; margin-top:-550px; width:100%;">
			</iframe>
			</div>`,
			css:"ifr_template"
			// view:"iframe", src:"https://webix.com/demos/",
			// on:{
			// 	onAfterLoad(){
			//		//CORS disapproves
			// 		this.getWindow().document.querySelector(".global-header").style.visibility = "hidden";
			// 		this.getWindow().document.querySelector(".top-demo-bg").style.visibility = "hidden";
			// 		this.getWindow().document.querySelector(".demos-main-links-section").style.visibility = "hidden";
			// 		this.getWindow().document.querySelector(".section-info-row.section-info-row-get-start").style.visibility = "hidden";
			// 		this.getWindow().document.querySelector(".global-footer-wrap").style.visibility = "hidden";
			// 	}
			// }
		};
	}
}
