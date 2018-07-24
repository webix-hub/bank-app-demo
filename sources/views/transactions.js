import {JetView,plugins} from "webix-jet";

export default class TransactionsView extends JetView {
    config(){
        return {
            rows:[
                { view:"toolbar", elements:[
                    { view:"label", label:"Transactions" },
                    {},
                    { view:"segmented", localId:"seg:tactions", options:[
                        { id:"alltactions", value:"All" },
                        { id:"payments", value:"Payments" },
                        { id:"incoming", value:"Incoming" }
                    ] }
                ] },
                { $subview:true }
            ]
        };
    }
    init(){
        this.use(plugins.Menu,"seg:tactions");
    }
}
