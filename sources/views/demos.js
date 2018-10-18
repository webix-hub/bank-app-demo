import {JetView} from "webix-jet";
export default class DemosView extends JetView {
	config(){
		return {
			css:"ifr_template",
			view:"iframe",
			on:{
				onAfterLoad(){
					this.hideProgress();
					this.enable();
					try{
						this.getWindow().document.querySelector(".global-header").style.display = "none";
						this.getWindow().document.querySelector(".section-info-row-get-start").style.display = "none";
						this.getWindow().document.querySelector(".global-footer-wrap").style.display = "none";
					}
					catch(err){ /*when demo is opened on localhost*/ }
				}
			}
		};
	}
	init(view){
		webix.extend(view,webix.ProgressBar);
		view.disable();
		view.showProgress({ type:"icon" });
		view.load("https://webix.com/demos/");
	}
}
