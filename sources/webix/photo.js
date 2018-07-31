webix.protoUI({
	name:"photo",
	getValue(){
		return this.config.value;
	},
	setValue(value){
		this.setHTML("<img style='height:260px;' src='data/photos/"+value+".jpg'>");
		this.config.value = value;
	}
},
webix.ui.template);
