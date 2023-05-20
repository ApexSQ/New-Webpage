// Define an empty array to store the items in the shopping cart
let shoppingCart = [];

// Function to add an item to the shopping cart
function addItemToCart(item) {
  // Get the current cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the item already exists in the cart
  const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    // Increment the quantity of the existing item
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Add the item to the cart
    item.quantity = 1;
    cartItems.push(item);
  }

  // Update the cart items in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to update the message and number in the shopping cart button
function updateShoppingCartButton() {
  const cartItemCount = getCartItemCount();
  const cartButton = $("#viewCartBtn");

  // Remove any existing count
  cartButton.find("span.badge").remove();

  // Update the count
  if (cartItemCount > 0) {
    cartButton.append(`<span class="badge bg-secondary">${cartItemCount}</span>`);
  }
}

// Function to get the total number of items in the shopping cart
function getCartItemCount() {
  // Get the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Calculate the total count of items
  let totalCount = 0;
  for (const item of cartItems) {
    totalCount += item.quantity || 1;
  }

  return totalCount;
}

// Function to display the shopping cart
function showShoppingCart() {
  // Clear the modal body
  $("#shoppingCartItems").empty();

  // Get the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Calculate the total cost of items
  let totalCost = 0;


  //resources/styles/pics/tiny.png 
  // Loop through the items in the shopping cart and append them to the modal body

  cartItems.forEach((item) => {
    // Check if the current page is index.html
    const isIndexPage = window.location.pathname.endsWith('index.html');
  
    // Set the image path based on the current page
    const imagePath = isIndexPage ? "resources/styles/pics/tiny.png" : item.img;
  
    const itemHTML = `
      <div class="cart-item">
        <img src="${imagePath}" alt="" class="cart-item-image">
        <div>
          <p>${item.name}</p>
          <p>$${item.price}</p>
          <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-name="${item.name}">
          <button class="remove-item-btn btn btn-danger btn-sm" data-name="${item.name}">Remove</button>
        </div>
      </div>
    `;
    $("#shoppingCartItems").append(itemHTML);
  
    // Calculate the cost of the current item and add it to the total cost
    const itemCost = item.price * item.quantity;
    totalCost += itemCost;
  });
  

  // Show the shopping cart modal
  $("#shoppingCartModal").modal("show");

  // Display the total cost at the end of the modal body
  const totalCostHTML = `
    <div class="total-cost">
      <p>Total Cost: $${totalCost.toFixed(2)}</p>
    </div>
  `;
  $("#shoppingCartItems").append(totalCostHTML);

  // Attach event listener to handle quantity change
  $(".item-quantity").change(function () {
    const itemName = $(this).data("name");
    const newQuantity = parseInt($(this).val());
    updateCartItemQuantity(itemName, newQuantity);
  });

  // Attach event listener to handle item removal
  $(".remove-item-btn").click(function () {
    const itemName = $(this).data("name");
    removeCartItem(itemName);
  });
}


// Function to remove a cart item
function removeCartItem(itemName) {
  // Get the cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Find the index of the item to remove
  const itemIndex = cartItems.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    // Remove the item from the cart
    cartItems.splice(itemIndex, 1);

    // Update the cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Refresh the shopping cart display
    showShoppingCart();

    // Update the shopping cart button
    updateShoppingCartButton();
  }
}

// Function to update the quantity of a cart item
function updateCartItemQuantity(itemName, newQuantity) {
  // Get the cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Find the item in the cart
  const itemToUpdate = cartItems.find((item) => item.name === itemName);

  if (itemToUpdate) {
    if (newQuantity <= 0) {
      // Remove the item from the cart
      const itemIndex = cartItems.indexOf(itemToUpdate);
      cartItems.splice(itemIndex, 1);
    } else {
      // Update the quantity of the item
      itemToUpdate.quantity = newQuantity;
    }

    // Update the cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Refresh the shopping cart display
    showShoppingCart();

    // Update the shopping cart button
    updateShoppingCartButton();
  }
}

// Function to handle the checkout process
function checkout() {
  // Get the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if there are items in the shopping cart
  if (cartItems.length === 0) {
    alert("No items in the shopping cart.");
    return;
  }

  // Perform the checkout logic here, e.g., sending the cart data to a server, processing payment, etc.

  // Clear the cart items from localStorage
  localStorage.removeItem("cartItems");

  // Close the shopping cart modal
  $("#shoppingCartModal").modal("hide");

  // Update the shopping cart button
  updateShoppingCartButton();

  // Display a confirmation message or redirect to a thank you page
  alert("Thank you for your purchase!");
}
