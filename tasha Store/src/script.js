let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "White Dress",
        tag: "white-dress",
        price: 100,
        inCart: 0
    },
    {
        name: "Red Dress",
        tag: "red-dress",
        price: 200,
        inCart: 0
    },
    {
        name: "Orange Dress",
        tag: "orange-dress",
        price: 300,
        inCart: 0
    },
    {
        name: "Black  Dress",
        tag: "black-dress",
        price: 400,
        inCart: 0
    },
    {
        name: "Brown  Dress",
        tag: "brown-dress",
        price: 500,
        inCart: 0
    },
    {
        name: "Red Black Dress",
        tag: "red-black",
        price: 600,
        inCart: 0
    },
    {
        name: "Brown White",
        tag: "brown-white",
        price: 700,
        inCart: 0
    },
    {
        name: "Flower Dress",
        tag: "flower",
        price: 800,
        inCart: 0
    },
    {
        name: "Gray Dress",
        tag: "gray",
        price: 900,
        inCart: 0
    }

];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
    }
}
    
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    //console.log('the product price is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log('my cart cost is',cartCost);
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost +
        product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle" id="${item.tag}"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">£${item.price},00</div>
            <div class="quantity">
            <span>${item.inCart}</span>
            </div>
            <div class="total">
            £${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML +=`
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                £${cartCost},00
            </h4>
        `;
    }
    deleteButtons();
}

function deleteButtons(){
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for(let i=0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click', () => {
            let productKey = deleteButtons[i].id;
            
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productKey].inCart);

            localStorage.setItem('totalCost', cartCost - 
            (cartItems[productKey].price * 
                cartItems[productKey].inCart));


            delete cartItems[productKey];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

onLoadCartNumbers();
displayCart();