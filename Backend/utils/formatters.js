function formatPhoneNumber(phone) {
  // Remove spaces and non-numeric characters
  phone = phone.replace(/\D/g, "");

  if (phone.startsWith("0")) {
    return "254" + phone.slice(1);
  }
  if (phone.startsWith("7")) {
    return "254" + phone;
  }
  if (phone.startsWith("254")) {
    return phone;
  }
  if (phone.startsWith("1") || phone.startsWith("2")) {
    return "254" + phone;
  }

  return null;
}

module.exports = { formatPhoneNumber };
