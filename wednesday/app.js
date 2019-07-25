
/*
//users node
let usersRef = database.ref("users")  //<-- database.ref points to the root which is on firebse database page
usersRef.child("user1").set({
    name: 'John',
    age: 34
})


usersRef.on('value') //updates you anytime there is an update to anything in the usersRef database

let usersRef = database.ref('users')
usersRef.push({ //gives random userID number
    name: "Alex",
    age: 31
})
*/

let storeTextBox = document.getElementById("storeTextBox")
let addressTextBox = document.getElementById("addressTextBox")
let submitButton = document.getElementById("submitButton")
let viewButton = document.getElementById("viewButton")
let listOfStores = document.getElementById("listOfStores")
let signUpButton = document.getElementById("signUpButton")
let signInButton = document.getElementById("signInButton")

let storesRef = database.ref('stores')

submitButton.addEventListener('click', () => {

    let storeName = storeTextBox.value
    let storeAddress = addressTextBox.value
    saveStore(storeName, storeAddress)
})

//submitButton.addEventListener('click', refreshStores());

function saveStore(storeName, storeAddress){
    storesRef.push({
        Name: storeName,
        Address: storeAddress
    })
}


    refreshStores()


    /**
     * Handles the sign up button press.
     */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }


/**
     * Handles the sign in button press.
     */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
          // [START signout]
        firebase.auth().signOut();
          // [END signout]
    } else {
        var email = document.getElementById('userEmail').value;
        var password = document.getElementById('userPassword').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
        return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
        return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
        });
        // [END authwithemail]
    }

}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("THIS IS SIGN IN DATA")
      console.log(displayName)
      console.log(email)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

signUpButton.addEventListener('click', () => {
    handleSignUp()
    window.alert("You have signed up!")
})

signInButton.addEventListener('click', () => {
    toggleSignIn()
})

//function refreshStores(){
function refreshStores(){   
    storesRef.on('value', (snapshot) => {

        stores = []

        for(key in snapshot.val()) {
            let store = snapshot.val()[key]
            store.key = key
            stores.push(store)
        //console.log(store)
        //console.log(stores)
        }

        displayStores(stores)
    })
//})
    }

function displayStores(stores){
    let storeItems = stores.map(store => {
        return `<div><span class="newStoreInfo">Store Name: ${store.Name} | Store Address: ${store.Address}</span><button class="removeButton" onclick='deleteStore("${store.key}")'>Remove</button></div>`
    })
    listOfStores.innerHTML = storeItems.join('')
}

function deleteStore(key){
    storesRef.child(key).remove()
}