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
						this.getWindow().document.querySelector(".global-header").style.visibility = "hidden";
						this.getWindow().document.querySelector(".top-demo-bg").style.visibility = "hidden";
						this.getWindow().document.querySelector(".demos-main-links-section").style.visibility = "hidden";
						this.getWindow().document.querySelector(".section-info-row.section-info-row-get-start").style.visibility = "hidden";
						this.getWindow().document.querySelector(".global-footer-wrap").style.visibility = "hidden";
					}
					catch(err){ /*when demo is opened on localhost*/ }
				}
			}
		};
	}
	init(view){
		view.load("https://webix.com/demos/");
		webix.extend(view,webix.ProgressBar);
		view.disable();
		view.showProgress({ type:"icon" });
	}
}
