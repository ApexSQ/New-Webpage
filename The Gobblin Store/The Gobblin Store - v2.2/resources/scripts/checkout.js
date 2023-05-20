  // Function to validate the form fields
  function validateForm() {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const address = $("#address").val();
    const creditCard = $("#creditCard").val();
    const expiry = $("#expiry").val();
    const securityCode = $("#securityCode").val();

    // Regular expressions for field validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;
    const creditCardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const securityCodeRegex = /^\d{3}$/;

    // Perform field validation
    if (!firstName || !lastName || !email || !phone || !address || !creditCard || !expiry || !securityCode) {
      alert("Please fill in all fields.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }

    if (!creditCardRegex.test(creditCard)) {
      alert("Please enter a valid credit card number.");
      return false;
    }

    if (!expiryRegex.test(expiry)) {
      alert("Please enter a valid expiry date (MM/YY).");
      return false;
    }

    if (!securityCodeRegex.test(securityCode)) {
      alert("Please enter a valid security code (3 digits).");
      return false;
    }

    // If all fields are valid, proceed with submission or further processing
    return true;
  }

  // Attach form submission event listener
  $("#checkoutForm form").submit(function (event) {
    event.preventDefault();

    // Validate the form fields
    if (validateForm()) {
      // Perform further processing, e.g., submit the form data to a server
      alert("Form submitted successfully!");
      // You can redirect the user to a thank you page or perform any other action here
    }
  });