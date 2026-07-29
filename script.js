const menu = [

{
name:"Margherita Pizza",
cuisine:"Italian",
type:"Veg",
price:250,
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
},

{
name:"Chicken Burger",
cuisine:"Fast Food",
type:"Non Veg",
price:220,
image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
},

{
name:"Veg Biryani",
cuisine:"Indian",
type:"Veg",
price:220,
image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500"
},

{
name:"Chicken Biryani",
cuisine:"Indian",
type:"Non Veg",
price:320,
image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500"
},

{
name:"Masala Dosa",
cuisine:"Indian",
type:"Veg",
price:120,
image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
},

{
name:"Paneer Butter Masala",
cuisine:"Indian",
type:"Veg",
price:260,
image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
},

{
name:"Hakka Noodles",
cuisine:"Chinese",
type:"Veg",
price:190,
image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500"
},

{
name:"Chicken Fried Rice",
cuisine:"Chinese",
type:"Non Veg",
price:240,
image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
},

{
name:"White Sauce Pasta",
cuisine:"Italian",
type:"Veg",
price:280,
image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500"
},

{
name:"Grilled Chicken",
cuisine:"Fast Food",
type:"Non Veg",
price:380,
image:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
},

{
name:"Chocolate Cake",
cuisine:"Dessert",
type:"Veg",
price:150,
image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
},

{
name:"Ice Cream Sundae",
cuisine:"Dessert",
type:"Veg",
price:130,
image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
}

];

const container = document.getElementById("menu-container");

menu.forEach(food => {

    container.innerHTML += `
        <div class="food-card">

            <img src="${food.image}" alt="${food.name}">

            <h2>${food.name}</h2>

            <p><b>Cuisine:</b> ${food.cuisine}</p>

            <p><b>Type:</b> ${food.type}</p>

            <p><b>Price:</b> ₹${food.price}</p>

            <button>View Details</button>
            <button>Add to Cart</button>

        </div>
    `;

});

function displayMenu(foodItems) {

    container.innerHTML = "";

    foodItems.forEach(food => {

        container.innerHTML += `
            <div class="food-card">

                <img src="${food.image}" alt="${food.name}">

                <h2>${food.name}</h2>

                <p><b>Cuisine:</b> ${food.cuisine}</p>

                <p><b>Type:</b> ${food.type}</p>

                <p><b>Price:</b> ₹${food.price}</p>

                <button onclick="showDetails('${food.name}', '${food.cuisine}', '${food.type}', ${food.price})">View Details</button>
                <button onclick="addCart('${food.name}')">Add to Cart</button>

            </div>
        `;

    });

}

displayMenu(menu);

const searchBox = document.getElementById("search");

searchBox.addEventListener("keyup", function () {

    const searchText = searchBox.value.toLowerCase();

    const filteredMenu = menu.filter(function(food){

        return food.name.toLowerCase().includes(searchText);

    });

    displayMenu(filteredMenu);

});

const cuisineFilter = document.getElementById("cuisineFilter");

cuisineFilter.addEventListener("change", function () {

    const selectedCuisine = cuisineFilter.value;

    if (selectedCuisine === "All Cuisines") {
        displayMenu(menu);
        return;
    }

    const filteredMenu = menu.filter(function(food){

        return food.cuisine === selectedCuisine;

    });

    displayMenu(filteredMenu);

});

const typeFilter = document.getElementById("typeFilter");

typeFilter.addEventListener("change", function () {

    const selectedType = typeFilter.value;

    if (selectedType === "All") {
        displayMenu(menu);
        return;
    }

    const filteredMenu = menu.filter(function(food){

        return food.type === selectedType;

    });

    displayMenu(filteredMenu);

});

const priceFilter = document.getElementById("priceFilter");

priceFilter.addEventListener("change", function () {

    let filteredMenu = [];

    if(priceFilter.value==="Below ₹200"){

        filteredMenu = menu.filter(food=>food.price<200);

    }

    else if(priceFilter.value==="₹200 - ₹500"){

        filteredMenu = menu.filter(food=>food.price>=200 && food.price<=500);

    }

    else if(priceFilter.value==="Above ₹500"){

        filteredMenu = menu.filter(food=>food.price>500);

    }

    else{

        filteredMenu = menu;

    }

    displayMenu(filteredMenu);

});

function showDetails(name,cuisine,type,price){

    alert(
`Food : ${name}

Cuisine : ${cuisine}

Type : ${type}

Price : ₹${price}`
);

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.reduce((sum,item)=>sum+item.qty,0);

document.getElementById("cartDisplay").innerText =
"Cart : " + cartCount + " Items";

function addCart(name){

    const item = menu.find(food => food.name === name);

    const existing = cart.find(food => food.name === name);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            name:item.name,
            price:item.price,
            qty:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    cartCount = cart.reduce((sum,item)=>sum+item.qty,0);

    document.getElementById("cartDisplay").innerText =
    "Cart : " + cartCount + " Items";

    alert(name + " added to cart.");
}

document.getElementById("checkoutBtn").addEventListener("click",function(){

    if(cart.length===0){

        alert("Cart is empty.");
        return;

    }

    window.location.href="Checkout.html";

});