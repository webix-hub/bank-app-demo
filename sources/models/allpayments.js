export const allpayments = new webix.DataCollection({
	url:"data/payments.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.date = new Date(obj.date);
		}                                                                                  
	}
});
