const sgMail = window.sgMail;
sgMail.setApiKey('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');

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

// Function to send the confirmation email
function sendConfirmationEmail(formData) {
  const { firstName, lastName, email, phone, address, creditCard, expiry, securityCode } = formData;

  // Blur out credit card information
  const blurredCreditCard = "**** **** **** " + creditCard.slice(-4);

  // Prepare the email content
  const emailContent = `
    Dear ${firstName} ${lastName},

    Thank you for your purchase. Here are your purchased items:

    [List the purchased items here]

    We have received your payment successfully. Confirmation details will be sent shortly.

    Best regards,
    The XYZ Team
  `;

  const msg = {
    to: email,
    from: 'djosh734@gmail.com', // Replace with your sender email address
    subject: 'Order Confirmation',
    text: emailContent,
    html: emailContent.replace(creditCard, blurredCreditCard), // Replace credit card information with blurred version in HTML content
  };

  sgMail
    .send(msg)
    .then(() => console.log('Email sent'))
    .catch((error) => console.error(error));
}

// Attach form submission event listener
$("#checkoutForm form").submit(function (event) {
  event.preventDefault();

  // Validate the form fields
  if (validateForm()) {
    const formData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      address: $("#address").val(),
      creditCard: $("#creditCard").val(),
      expiry: $("#expiry").val(),
      securityCode: $("#securityCode").val(),
    };

    // Send the confirmation email
    sendConfirmationEmail(formData);

    // Perform further processing, e.g., submit the form data to a server
    alert("Form submitted successfully!");
    // You can redirect the user to a thank you page or perform any other action here
  }
});
