
// Add event listeners to the buttons
$(document).ready(() => {
    // Add item to shopping cart
    $(".add-item-btn").click((event) => {
      const name = $(event.target).data("name");
      const price = $(event.target).data("price");
      const img = $(event.target).data("img");
      const item = { name, price, img };
      addItemToCart(item);
  
      // Update the shopping cart button
      updateShoppingCartButton();
  
      // Show the item added message
      showMessage(`${item.name} added to cart. View cart in the bottom right.`);
    });
     
    // View shopping cart button
    $("#viewCartBtn").click(() => {
        showShoppingCart();
      });
    
      // Checkout button
      $("#checkoutBtn").click(() => {
        checkout();
      });
    
      // Initialize the shopping cart button
      updateShoppingCartButton();
  });
  
  // Function to show a message
  function showMessage(message) {
    const messageElement = $("#message");
    messageElement.text(message);
    messageElement.show();
    setTimeout(() => {
      messageElement.hide();
    }, 5000);
  }
  