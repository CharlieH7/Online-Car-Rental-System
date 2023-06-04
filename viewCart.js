$(document).ready(function() {
  // Get the cart data from the localStorage or initialize an empty array
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to update the cart data in localStorage
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Add to Cart button click event handler
  $('#carTable').on('click', '.addToCartButton', function() {
    // Get the selected car details from the table row
    var row = $(this).closest('tr');
    var brand = row.find('td:nth-child(2)').text().trim();
    var model = row.find('td:nth-child(3)').text().trim();
    var year = row.find('td:nth-child(4)').text().trim();
    var price = parseFloat(row.find('td:nth-child(8)').text().trim());
    // Create an object representing the car
    var car = { brand: brand, model: model, year: year, price: price };
    // Add the car to the cart array
    cart.push(car);
    // Update the cart data in localStorage
    updateCart();
    // Display the animation
    var animation = $('<div>')
      .addClass('cart-animation')
      .text('Car added to cart successfully.');
    $('#cartAnimation').append(animation);
    
    // Remove the animation after a certain duration
    setTimeout(function() {
      animation.remove();
    }, 1500);
  });

  // Remove from Cart button click event handler
  $('#cartTableBody').on('click', '.removeFromCartButton', function() {
    // Get the index of the item to be removed
    var index = $(this).data('index');

    // Remove the item from the cart array
    cart.splice(index, 1);

    // Update the cart data in localStorage
    updateCart();

    // Remove the row from the table
    $(this).closest('tr').remove();

    // Recalculate the total price
    var totalPrice = 0;
    $.each(cart, function(index, item) {
      totalPrice += parseFloat(item.price);
    });

    // Store the total price in localStorage
    localStorage.setItem('totalPrice', totalPrice);

    $('#totalPrice').text(totalPrice.toFixed(2));
  });

  // Update the shopping cart table on the viewCart.html page
  if (window.location.pathname.endsWith('viewCart.html')) {
    var cartTableBody = $('#cartTableBody');
    var totalPrice = 0;

    // Clear any existing rows in the cart table
    cartTableBody.empty();

    // Loop through the cart items and add them to the HTML table
    $.each(cart, function(index, item) {
      var row = $('<tr>');
      row.append($('<td>').html('<img src="./assets/' + item.model + '.jpg" alt="Car Thumbnail" class="car-thumbnail">'));
      row.append($('<td>').text(item.brand));
      row.append($('<td>').text(item.model));
      row.append($('<td>').text(item.year));
      row.append($('<td>').text(item.price));
      row.append($('<td>').html('<input type="number" class="quantity" value="1" min="1" max="10">'));
      row.append($('<td>').html('<button class="removeFromCartButton">Remove</button>').data('index', index));
      cartTableBody.append(row);

      totalPrice += parseFloat(item.price);
    });

    // Store the total price in localStorage
    localStorage.setItem('totalPrice', totalPrice);

    // Display the total cart price
    $('#totalPrice').text("$" + totalPrice.toFixed(2));
  // Check if the cart is empty
  if (cart.length === 0) {
    // If the cart is empty, disable the checkout button
    $("#checkoutButton").addClass("disabled");
    // Disable the checkout button
    $("#checkoutButton").prop("disabled", true);
    $("#checkoutButton").css("background-color", "#ccc");
    $("#checkoutButton").css("cursor", "not-allowed");
  }
}
});
