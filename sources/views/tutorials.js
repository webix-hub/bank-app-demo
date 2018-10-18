import {JetView} from "webix-jet";
export default class TutorialsView extends JetView {
	config(){
		return {
			css:"ifr_template",
			view:"iframe",
			on:{
				onAfterLoad(){
					try{
						this.getWindow().document.querySelector(".global-header").style.display = "none";
						this.getWindow().document.querySelector(".section-info-row.section-info-row-get-start").style.display = "none";
						this.getWindow().document.querySelector(".global-footer-wrap").style.display = "none";
					}
					catch(err){ /*when demo is opened on localhost*/ }
					if (this.hideProgress) this.hideProgress();
					this.enable();
				}
			}
		};
	}
	init(view){
		webix.extend(view,webix.ProgressBar);
		view.disable();
		view.showProgress({ type:"icon" });
		view.load("https://webix.com/tutorials/");
	}
}
