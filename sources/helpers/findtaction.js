export default function findTAction(view,data,date){
    const taction = data.find(obj => {
        const a = obj.date.toString().slice(0,14);
        const b = date.toString().slice(0,14);
        return a === b;
    });
    if (taction.length){
        view.select(taction[0].id);
        view.showItem(taction[0].id);
    }
    else{
        view.clearSelection();
        webix.message("Nothing on this day");
    }
}
