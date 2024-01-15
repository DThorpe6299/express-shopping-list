const items = require('./fakeDb');

class Item {
    constructor(name, price){
        this.name=name;
        this.price=price;
        items.push(this)
    }

    static allItems(){
        return items
    }

    static update(name, data){
        let foundItem = Item.find(name);
        if(!foundItem) throw {message: "Item not found", status: 400}
        foundItem.name=data.name;
        foundItem.price=data.price;
        return foundItem;
    }

    static findItem(name, data){
        let foundItem = items.find(i => i.name === name);
        if(!foundItem) throw {message: "Item not found", status: 400}

        return foundItem;
    }
    
    static delete(name){
        let idx = items.findIndex(i => i.name === name)
        if(idx === -1) throw {message: "Item not found", status: 400};
        items.splice(idk,1);
    }
}

module.exports = Item;