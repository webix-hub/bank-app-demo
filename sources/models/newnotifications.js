let i = 0;
export function newNotification(){
	return webix.copy(notifications[i++%notifications.length]);
}

const notifications = [
	{
		title:"Warning",
		message:"Dear client, we know where you store your passwords. We highly recommend you to memorize them and destroy those memos of yours.",
		read:0
	},
	{
		title:"Editing customers data",
		message:"Dear client, if you want to see the details on every customer and edit them, double-click the customer in the list on the right.",
		read:0
	},
	{
		title:"We miss you",
		message:"Dear client, it has been a while since you talked to us. We are waiting for you in the same place at the same time.",
		read:0
	},
	{
		title:"Have a nice day",
		message:"Dear client, whenever you are reading this, we wish you a merry day. May the luck and success attend you.",
		read:0
	},
	{
		title:"Localization",
		message:"Dear client, you can pick one of the six languages we provided for this demo app. Click the icon in the top right corner.",
		read:0
	},
	{
		title:"We love you",
		message:"Dear client, we love you very much. If our feelings are mutual, contact us and download Webix. Then we will love you eternally.",
		read:0
	}
];
