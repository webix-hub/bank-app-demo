import {JetView} from "webix-jet";
export default class PricesView extends JetView {
	config(){
		return {
			css:"ifr_template",
			view:"iframe",
			on:{
				onAfterLoad(){
					this.hideProgress();
					this.enable();
					//CORS disapproves
					this.getWindow().document.querySelector(".global-header").style.visibility = "hidden";
					this.getWindow().document.querySelector(".licenses-info-section").style.visibility = "hidden";
					this.getWindow().document.querySelector(".section-info-row.section-info-row-get-start").style.visibility = "hidden";
					this.getWindow().document.querySelector(".global-footer-wrap").style.visibility = "hidden";
				}
			}
		};
	}
	init(view){
		view.load("https://webix.com/licenses/");
		webix.extend(view,webix.ProgressBar);
		view.disable();
		view.showProgress({ type:"icon" });
	}
}
