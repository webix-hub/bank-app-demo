export const allpayments = new webix.DataCollection({
	url:"data/payments.json",
	scheme:{
		$init:function(obj){
			obj.date = webix.i18n.parseFormatDate(obj.date);
			const curr_month = new Date().getMonth();
			const data_month = obj.date.getMonth();
			if ((curr_month - data_month > 0) && (obj.id < 25)){
				obj.date.setMonth(obj.date.getMonth()+1);
			}
			else if ((curr_month - data_month > 1) && (obj.id >= 25)){
				obj.date.setMonth(obj.date.getMonth()+1);
			}
		}
	}
});
