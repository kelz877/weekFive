let storeTextBox = document.getElementById("storeTextBox")
let addressTextBox = document.getElementById("addressTextBox")
let submitButton = document.getElementById("submitButton")
let viewButton = document.getElementById("viewButton")
let listOfStores = document.getElementById("listOfStores")
let signUpButton = document.getElementById("signUpButton")
let signInButton = document.getElementById("signInButton")


//reference to the data base
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

//take a snspshot of what the stores look like at this particular moment in time... listens for changes using the 'on' method. 'value' listends for changes on teh entire contensts of a path
storesRef.on('value', (snapshot) => {
    stores = []

    //for loop through each store to make sure it snapshots every store
    snapshot.forEach(store => {
        let groceryStore = store.val() //object
        console.log(groceryStore)
        let newStore = new Store(groceryStore.Name, groceryStore.Address)
        newStore.storeID = store.key //unique key from FireBase database
        newStore.items = !groceryStore.items ? [] : groceryStore.items
        //adds the data from new store into the stores array
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
    console.log(itemName)
    //sets the value for teh node with the store id as the key to the value of the store object
    storesRef.child(store.storeID).set(store)
}



/*
function deleteItem(storeId, obj){
    let store = stores.find(s => s.storeID == storeID)
}

*/

function displayStores(stores){
    //console.log(stores)
    let groceryStores = stores.map(store => {


        let groceryItems = []
        if(store.items){
            console.log(store.items)
            groceryItems = store.items.map(item => {
                console.log(item)
            return `<span class='groceryItem'>${item.name}
            <button class='deleteItemButton' onclick='deleteItem("${item.name}", "${store.storeID}")'>Delete Item</button></span>`
        }).join('')
        }
        return `<div class='newStoreDiv'>
        <span class="newStoreInfo">Store Name: ${store.Name} | Store Address: ${store.Address}</span>
        <button class="removeButton" onclick='deleteStore("${store.storeID}")'>Remove</button></div>
        <br>
        <span class="enterItem"><input class="enterItemBox" type="text" placeholder="enter item">
        <button class="addGroceryItem" onclick='addItem("${store.storeID}", this)' />Add Item</button>
        </span>
        ${groceryItems == null ? '' : groceryItems}`
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
/*

} */

//make a ref to the items array for the specific store and loop through the array checking if the item name matches what you wantto delete //  loop through this --> stores/storeID/items


//THEN DELETE .remove()


function deleteItem(name, storeID){

    let newItems = null
    stores.forEach((store) => {
        if(store.storeID == storeID){
            newItems = store.items.filter(function(item){
                return item.name != name
            })
        }
    })
    let itemsRef = database.ref(`stores/${storeID}/items`)
    itemsRef.set(newItems)

}
/*
    itemToDelete.remove()
        .then(function(){
            console.log("remove succeeded.")
        })
        .catch(function(error){
            console.log("Remove failed: " + error.message)
        });

    }
*/

/*

let db = firebase.database();
let ref = db.ref();
let survey = db.ref('stores/-LkfnS1iJ6A8QG_ZVHvr/items/2');
survey.child('toast').remove();

*/