import {JetView} from "webix-jet";
export default class TutorialsView extends JetView {
	config(){
		return {
			// template:`<div style="overflow:scroll; height:100%;">
			// 		<iframe scrolling="no" src="https://webix.com/tutorials/" style="border:0px none; height:1600px; margin-top:-70px; width:100%;">
			// 		</iframe>
			// 	</div>`,
			css:"ifr_template",
			view:"iframe",
			on:{
				onAfterLoad(){
					this.hideProgress();
					this.enable();
					//CORS disapproves
					this.getWindow().document.querySelector(".global-header").style.visibility = "hidden";
					this.getWindow().document.querySelector(".section-info-row.section-info-row-get-start").style.visibility = "hidden";
					this.getWindow().document.querySelector(".global-footer-wrap").style.visibility = "hidden";
				}
			}
		};
	}
	init(view){
		view.load("https://webix.com/tutorials/");
		webix.extend(view,webix.ProgressBar);
		view.disable();
		view.showProgress({ type:"icon" });
	}
}
