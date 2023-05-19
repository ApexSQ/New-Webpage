// Define an empty array to store the items in the shopping cart
let shoppingCart = [];

// Function to add an item to the shopping cart
function addItemToCart(item) {
  shoppingCart.push(item);
}

// Function to display the shopping cart
function showShoppingCart() {
    // Clear the modal body
    $("#shoppingCartItems").empty();
  
    // Loop through the items in the shopping cart and append them to the modal body
    shoppingCart.forEach((item) => {
      const itemHTML = `
        <div class="cart-item">
          <img src="${item.img}" alt="" class="cart-item-image">
          <div>
            <p>${item.name}</p>
            <p>$${item.price}</p>
          </div>
        </div>
      `;
      $("#shoppingCartItems").append(itemHTML);
    });
  
    // Show the shopping cart modal
    $("#shoppingCartModal").modal("show");
  }

// Function to handle the checkout process
function checkout() {
  // Perform the checkout logic here, e.g., sending the cart data to a server, processing payment, etc.

  // Clear the shopping cart
  shoppingCart = [];

  // Close the shopping cart modal
  $("#shoppingCartModal").modal("hide");

  // Display a confirmation message or redirect to a thank you page
  alert("Thank you for your purchase!");
}

// Add event listeners to the buttons
$(document).ready(() => {
  // Add item to shopping cart
  $(".add-item-btn").click((event) => {
    const name = $(event.target).data("name");
    const price = $(event.target).data("price");
    const img = $(event.target).data("img");
    const item = { name, price, img };
    addItemToCart(item);
  });

  // View shopping cart button
  $("#viewCartBtn").click(() => {
    showShoppingCart();
  });

  // Checkout button
  $("#checkoutBtn").click(() => {
    checkout();
  });
});
