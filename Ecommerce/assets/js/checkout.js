function getCartItemsFromQueryParam() {

    var urlParams = new URLSearchParams(window.location.search);
    var cartItemsParam = urlParams.get('cartItems');
    return cartItemsParam ? JSON.parse(decodeURIComponent(cartItemsParam)) : [];
}

window.addEventListener('load', function () {
    displayOrderSummary();
});

function displayOrderSummary() {

    var orderSummaryElement = document.getElementById('orderSummary');
    var cartItems = getCartItemsFromQueryParam();

    if (cartItems.length > 0) {
        var orderList = document.createElement('ul');
        var totalAmount = 0;

        cartItems.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = item.quantity + ' x ' + item.productName + ' - Rs. ' + (item.price * item.quantity).toFixed(2);
            orderList.appendChild(listItem);


            totalAmount += item.price * item.quantity;
        });


        var totalElement = document.createElement('p');
        totalElement.textContent = 'Total Amount: Rs. ' + totalAmount.toFixed(2);
        orderSummaryElement.appendChild(totalElement);

        orderSummaryElement.appendChild(orderList);
    } else {
        orderSummaryElement.textContent = 'No items in the order.';
    }
}







function updateDistricts() {
    var stateSelect = document.getElementById("selectState");
    var districtSelect = document.getElementById("selectDistrict");


    districtSelect.innerHTML = "";


    var selectedState = stateSelect.options[stateSelect.selectedIndex].value;

    districtSelect.innerHTML = "<option value='' selected>Select</option>";


    switch (selectedState) {
        case "option1":
            addDistrictOption("Visakhapatnam", "Visakhapatnam");
            addDistrictOption("Rajahmaundry", "Rajahmaundry");
            addDistrictOption("Ananthapur", "Ananthapur");

            break;
        case "option2":
            addDistrictOption("Hyderabad", "Hyderabad");
            addDistrictOption("Rangareddy", "Ranga Reddy");
            addDistrictOption("Warangal", "Warangal");

            break;
        case "option3":
            addDistrictOption("Chennai", "Chennai");
            addDistrictOption("Coimbatore", "Coimbatore");
            addDistrictOption("Madurai", "Madurai");

            break;
        case "option4":
            addDistrictOption("Bangalore", "Bangalore");
            addDistrictOption("Mysuru", "Mysuru");
            addDistrictOption("Hubli", "Hubli");

            break;
        case "option5":
            addDistrictOption("Thiruvananthapuram", "Thiruvananthapuram");
            addDistrictOption("Kochi", "Kochi");
            addDistrictOption("Kozhikode", "Kozhikode");


        default:
            break;
    }
}

function addDistrictOption(district) {
    var districtSelect = document.getElementById("selectDistrict");
    var option = document.createElement("option");
    option.value = district;
    option.text = district;
    districtSelect.add(option);
}

document.getElementById('orderForm').addEventListener('submit', submitForm);

window.addEventListener('load', function () {
    displayOrderSummary();
});

function backToCart() {
    window.location.href = "cart.html";
}

function placeorder() {
    if (validateForm()) {
        window.location.href = "OrderConfirmation.html";
    }
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

function validateForm() {
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;
    var email = document.getElementById('email').value;
    var selectState = document.getElementById('selectState').value;
    var selectDistrict = document.getElementById('selectDistrict').value;
    var pincode = document.getElementById('pincode').value;
    var address = document.querySelector('textarea').value;

    if (name && number && email && selectState && selectDistrict && pincode && address) {
        return true;
    } else {
        alert('Please fill the shipping information .');
        return false;
    }
}

function placeOrder() {

}