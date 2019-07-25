let storeTextBox = document.getElementById("storeTextBox")
let addressTextBox = document.getElementById("addressTextBox")
let submitButton = document.getElementById("submitButton")
let viewButton = document.getElementById("viewButton")
let listOfStores = document.getElementById("listOfStores")
let signUpButton = document.getElementById("signUpButton")
let signInButton = document.getElementById("signInButton")

let storesRef = database.ref('stores')

let stores = []
/*

function reloadStores(){
    storesRef.on('value', (snapshot) => {
        stores = []

        for(key in snapshot.val()){
            let store = snapshot.val()[key]
            console.log(store)
            store.key = key
            stores.push(store)
            console.log(key) 
        }
        displayStores(stores)
    })
}

reloadStores()
*/


storesRef.on('value', (snapshot) => {
    stores = []

    snapshot.forEach(store => {
        let groceryStore = store.val() //object
        console.log(groceryStore)
        let newStore = new Store(groceryStore.Name, groceryStore.Address)
        newStore.storeID = store.key //unique key from FireBase database
        newStore.items = !groceryStore.items ? [] : groceryStore.items
        stores.push(newStore)

    })
    displayStores(stores)
})

function addItem(storeID, obj){
    //find store in local JS array
    let store = stores.find(s => s.storeID == storeID)
    //onsole.log(store)    
    //gets the value from the text input
    let itemName = obj.previousElementSibling.value
    //adds the item to the local javascript store array
    store.addItem(new Item(itemName, ""))
    //console.log(itemName)
    //sets the value for teh node qith the sotre id as the key to the value of the store object
    storesRef.child(store.storeID).set(store)
}

function displayStores(stores){
    //console.log(stores)
    let groceryStores = stores.map(store => {


        let groceryItems = []
        if(store.items){
            groceryItems = store.items.map(item => {
                console.log(item)
            return `<p>${item.name}</p>`
        }).join('')
        }
        return `<div>
        <span class="newStoreInfo">Store Name: ${store.Name} | Store Address: ${store.Address}</span>
        <button class="removeButton" onclick='deleteStore("${store.storeID}")'>Remove</button></div>
        <br>
        <span><input type="text"><button class="addGroceryItem" onclick='addItem("${store.storeID}", this)' />Add Item</button></span>
        ${groceryItems == null ? '' : groceryItems}
        `
    })
    listOfStores.innerHTML = groceryStores.join('')
}

submitButton.addEventListener('click', () => {
    let storeName = storeTextBox.value
    let storeAddress = addressTextBox.value
    saveStore(storeName, storeAddress)
})

function deleteStore(storeID){
    storesRef.child(storeID).remove()
}

function saveStore(storeName, storeAddress){
    storesRef.push({
        Name: storeName,
        Address: storeAddress
    })
}