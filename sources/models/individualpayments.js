export const individualpayments = new webix.DataCollection({
	url:"data/individualpayments.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.date = webix.i18n.parseFormatDate(obj.date);
		}                                                                                  
	}
});
