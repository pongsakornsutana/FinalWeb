
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let header = document.querySelector("header");

menu.addEventListener("click",function() {
    navbar.classList.toggle("active");
});

menu.onclick =() =>{
    header.classList.toggle('active');

}
window.onscroll = () => {
    header.classList.remove("active");
    navbar.classList.remove("active");
}

////////////
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
              : scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)
    


// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInput = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
    
    Swal.fire({
        title: 'Confirm?',
        text: "You sure for purchase!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6D8B74',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:'Thank you',
            text:'Your order are ordered',
            icon:'success',
            confirmButtonColor:'#6D8B74'
          }
          )
          var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) 
    {
        cartContent.removeChild(cartContent.firstChild);
    }
    cart.classList.remove("active");
    updatetotal();
        }
        else {
            return;
        }
      })
    
}

// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) 
    {
        input.value = 1;
    }
    updatetotal();
}

// Add to cart
function addCartClicked(event) {
    cart.classList.add("active");
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) 
    {
        if (cartItemsNames[i].innerHTML == title)
        {
            Swal.fire({
                title: ' You already ordered',
                icon: 'warning',
                confirmButtonColor: '#6D8B74',
            })
            return;
        }
    } 
    var cartBoxContent =   `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class="fa-solid fa-circle-minus cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}


// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0; //start
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }

    // percentage price
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
/////////////
function openForm() {
    document.getElementById("myPopup").style.display = "block";
  }
//////////////
function closeForm() {
    document.getElementById("myPopup").style.display = "none";
  }

          
    

  