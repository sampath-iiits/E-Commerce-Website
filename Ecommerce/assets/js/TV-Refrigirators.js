function addToCart(productName, price, button) {

    let cartItemsString = localStorage.getItem('cartItems');


    if (!cartItemsString || cartItemsString === "undefined" || cartItemsString === "null") {

        var cartItems = [];
    } else {

        try {
            var cartItems = JSON.parse(cartItemsString);


            if (!Array.isArray(cartItems)) {
                cartItems = [];
            }
        } catch (error) {

            var cartItems = [];
        }
    }


    let existingCartItem = cartItems.find(item => item.productName === productName);
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {

        cartItems.push({ productName, price, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));


    alert(productName + ' has been added to the cart!');


    button.innerHTML = 'Added to Cart';
    button.disabled = true;
}

function applyPriceFilter() {
    var minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    var maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;

    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        var price = parseInt(card.querySelector('.price').innerText.replace('Rs.', '').replace('/-', ''));
        if (price >= minPrice && price <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function applyCategoryFilter() {
    var categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();

    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        var category = card.querySelector('h3').innerText.toLowerCase();
        if (category.includes(categoryFilter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let scrollButton = document.querySelector('.scrolltotop button');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});