//store class

class Store {
    constructor(name, address){
        this.Name = name
        this.Address = address
        this.items = []
        this.storeID = ''
    }
    addItem(item) {
        this.items.push(item)
    }
}

class Item {
    constructor(name){
        this.name = name
    }
}