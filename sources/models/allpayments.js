export const allpayments = new webix.DataCollection({
	url:"data/payments.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.date = webix.i18n.parseFormatDate(obj.date);
		}                                                                                  
	}
});

export function getPayments(){
	return allpayments.waitData.then(() => {
		return allpayments.find(obj => obj.type === 0);
	});
}

export function getIncoming(){
	return allpayments.waitData.then(() => {
		return allpayments.find(obj => obj.type === 1);
	});
}
