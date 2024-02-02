function getCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}


function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


function renderCart() {
    var cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = '';

    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);


        updateTotalAmount(cartItems);

        cartItems.forEach(function (item, index) {
            var row = document.createElement('tr');
            var productNameCell = document.createElement('td');
            var priceCell = document.createElement('td');
            var quantityCell = document.createElement('td');
            var quantityControls = document.createElement('div');
            var increaseButton = document.createElement('button');
            var decreaseButton = document.createElement('button');
            var quantityDisplay = document.createElement('span');
            var deleteButton = document.createElement('button');

            productNameCell.textContent = item.productName;


            var initialQuantity = item.quantity;
            var initialPrice = item.price;
            var totalPrice = initialPrice * initialQuantity;

            priceCell.textContent = 'Rs.' + totalPrice.toFixed(2);
            quantityDisplay.textContent = initialQuantity;

            increaseButton.textContent = '+';
            decreaseButton.textContent = '-';
            deleteButton.textContent = 'Delete';

            increaseButton.addEventListener('click', function () {

                var currentQuantity = parseInt(quantityDisplay.textContent);
                var newQuantity = currentQuantity + 1;
                quantityDisplay.textContent = currentQuantity + 1;


                cartItems[index].quantity = currentQuantity + 1;


                totalPrice = initialPrice * (currentQuantity + 1);
                priceCell.textContent = 'Rs.' + totalPrice.toFixed(2);

                updateQuantityAndSave(index, newQuantity);


                updateTotalAmount(cartItems);
            });

            decreaseButton.addEventListener('click', function () {

                var currentQuantity = parseInt(quantityDisplay.textContent);
                var newQuantity = Math.max(1, currentQuantity - 1);

                if (currentQuantity > 1) {
                    quantityDisplay.textContent = currentQuantity - 1;


                    cartItems[index].quantity = currentQuantity - 1;


                    totalPrice = initialPrice * (currentQuantity - 1);
                    priceCell.textContent = 'Rs.' + totalPrice.toFixed(2);

                    updateQuantityAndSave(index, newQuantity);


                    updateTotalAmount(cartItems);
                }
            });



            deleteButton.addEventListener('click', function () {

                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));


                row.remove();


                renderCart();
                updateTotalAmount(cartItems);
            });


            quantityControls.appendChild(decreaseButton);
            quantityDisplay.textContent = initialQuantity;
            quantityControls.appendChild(quantityDisplay);
            quantityControls.appendChild(increaseButton);

            row.appendChild(productNameCell);
            row.appendChild(priceCell);
            quantityCell.appendChild(quantityControls);
            row.appendChild(quantityCell);
            row.appendChild(deleteButton);

            cartTable.appendChild(row);
        });


        updateTotalAmount(cartItems);
    }
}

function calculateTotalAmount(cartItems) {
    var totalAmount = 0;


    if (Array.isArray(cartItems)) {
        cartItems.forEach(function (item) {
            var price = parseFloat(item.price);
            var quantity = parseInt(item.quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                totalAmount += price * quantity;
            }
        });
    }

    return totalAmount;
}


function updateTotalAmount(cartItems) {
    var totalAmount = 0;
    if (cartItems && cartItems.length > 0) {
        totalAmount = calculateTotalAmount(cartItems);
    }
    var totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.textContent = 'Total Amount: Rs. ' + totalAmount.toFixed(2);
}

function handleQuantityChange(index, delta) {
    var cartItems = getCartItems();


    cartItems[index].quantity += delta;


    cartItems[index].quantity = Math.max(1, cartItems[index].quantity);


    saveCartItems(cartItems);


    renderCart();
}

function updateQuantityAndSave(index, newQuantity) {
    var cartItems = getCartItems();


    cartItems[index].quantity = newQuantity;


    saveCartItems(cartItems);


    renderCart();
}

function checkout() {

    var cartItems = getCartItems();


    if (cartItems.length > 0) {

        var cartItemsQueryParam = encodeURIComponent(JSON.stringify(cartItems));


        window.location.href = 'checkout.html?cartItems=' + cartItemsQueryParam;
    } else {

        alert('Your cart is empty. Add items before checkout.');
    }
}

renderCart();


window.addEventListener('load', renderCart);

function backToProducts() {
    window.location.href = "products.html";
}