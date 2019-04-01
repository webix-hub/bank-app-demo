export const allpayments = new webix.DataCollection({
	url:"data/payments.json",
	scheme:{
		$init:function(obj){
			obj.date = webix.i18n.parseFormatDate(obj.date);
			const curr_month = new Date().getMonth();
			const data_month = obj.date.getMonth();
			if (curr_month - data_month != 0){
				if (obj.id < 25)
					obj.date.setMonth(curr_month);
				else if (obj.id >= 25)
					obj.date.setMonth(curr_month-1);
			}
			const curr_year = new Date().getFullYear();
			const data_year = obj.date.getFullYear();
			if (curr_year - data_year > 0){
				obj.date.setYear(curr_year);
			}
		}
	}
});
