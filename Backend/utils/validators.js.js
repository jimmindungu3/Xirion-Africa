function emailValidator(email) {
  // First check basic email format
  const basicFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicFormatRegex.test(email.toLowerCase())) {
    return false;
  }

  // List of allowed common email domains
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
  ];

  // Extract domain from email
  const domain = email.toLowerCase().split("@")[1];

  // Check if domain is in the allowed list
  return allowedDomains.includes(domain);
}

function phoneNumberValidator(phone) {
  const regex = /^(?:\+254|254|0)?7\d{8}$/;
  return regex.test(phone);
}

function passwordValidator(password) {
    // Minimum 6 characters, at least one letter/number/special character
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

module.exports = { emailValidator, phoneNumberValidator, passwordValidator };
