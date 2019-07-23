let coffeeURL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/'

let deleteOrderURL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/emailaddress'

let coffeeOrders = document.getElementById("viewAll")

async function fetchAllOrders() {
    let response = await fetch(coffeeURL)
    let json = await response.json()
    console.log(json)
    return json


}
function displayOrders() {
fetchAllOrders().then(json => {

    console.log(json)
    console.log(Object.keys(json))
    emailAddresses = Object.keys(json)
    let coffeeOrdered = emailAddresses.map(key => {
        let order = json[key]
        //console.log(order.coffee, order.emailAddress)

        return `<div><span>coffee order: ${order.coffee} email address: ${order.emailAddress}</span><button onClick"">Delete Order</button></div>`
    })



    coffeeOrders.innerHTML = coffeeOrdered.join('')


})

}

displayOrders()

document.getElementById('postData').addEventListener('submit', postData);

function postData(event){
    event.preventDefault();

    let coffee = document.getElementById('coffee').value;
    let emailAddress = document.getElementById('emailAddress').value;
    fetch(coffeeURL, {
        method: 'Post',
        body: JSON.stringify({coffee:coffee, emailAddress:emailAddress}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(json => displayOrders())
    .catch(error => console.error('Error:', error));

}



