let cart = [];


/* ADD PRODUCT TO CART */

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to your cart! 🛍️");
}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }


    cart.forEach((product, index) => {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;

        itemCount += product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${product.name}
                </div>

                <div>
                    Rs ${product.price}
                </div>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

            <strong>
                Rs ${itemTotal}
            </strong>

        `;

        cartItems.appendChild(item);

    });


    cartCount.textContent = itemCount;

    cartTotal.textContent =
        "Rs " + total;

}


/* INCREASE QUANTITY */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* DECREASE QUANTITY */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* REMOVE PRODUCT */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document.getElementById("cart-overlay").style.display =
        "block";

}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cart-overlay").style.display =
        "none";

}


/* WHATSAPP CHECKOUT */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let message =
        "Assalamu Alaikum! 🌸%0A%0A" +
        "I would like to order from Hayaa & Grace:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;


        message +=
            "• " +
            product.name +
            " × " +
            product.quantity +
            " = Rs " +
            productTotal +
            "%0A";

    });


    message +=
        "%0A*Total: Rs " +
        total +
        "*%0A%0A" +
        "Please let me know the delivery details. Thank you! 🌷";


    /*
       CHANGE 5822 0949
       TO YOUR REAL WHATSAPP NUMBER.

       Mauritius country code = 230
       Example:
       2305822 0949
    */

    const phoneNumber = "2305822 0949";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(whatsappURL, "_blank");

}