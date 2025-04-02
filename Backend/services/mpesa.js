const axios = require("axios");
const Order = require("../models/order");
require("dotenv").config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASS_KEY,
  MPESA_CALLBACK_URL,
} = process.env;

const getAccessToken = async () => {
  try {
    const credentials = `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${encodedCredentials}` } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to get Mpesa access token: ${error.message}`);
  }
};

const initiateSTKPush = async (phoneNumber, amount) => {
  try {
    const accessToken = await getAccessToken();
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = new Buffer.from(
      `${MPESA_SHORTCODE}${MPESA_PASS_KEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "XirionAfrica",
      TransactionDesc: "Shop at Xirion Africa",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const handleSTKCallback = async (callBackObject, orderDetails) => {
  const stkCallback = callBackObject.Body.stkCallback;

  const { ResultCode, ResultDesc, CallbackMetadata, CheckoutRequestID } =
    stkCallback;

  if (ResultCode === 0) {
    // 0 result code means successful payment
    const amount = CallbackMetadata?.Item?.find(
      (item) => item.Name === "Amount"
    )?.Value;
    const receipt = CallbackMetadata?.Item?.find(
      (item) => item.Name === "MpesaReceiptNumber"
    )?.Value;

    // add CheckoutRequestID to order details
    orderDetails.CheckoutRequestID = CheckoutRequestID;

    // add receipt to orderDetails
    orderDetails.mpesaConfirmationCode = receipt;

    // Save to db
    const newOrder = new Order(orderDetails);
    const placedOrder = await newOrder.save(newOrder);
    return;
  } else if (ResultCode === 1032) {
    console.log("❌ Request Cancelled by User");
    return;
  } else {
    console.log(`⚠️ Payment Failed - Code: ${ResultCode}, Desc: ${ResultDesc}`);
    return;
  }
};

module.exports = { initiateSTKPush, handleSTKCallback };
