import axios from "axios";
let token;

export const createToken = async (req, res, next) => {
  const consumerKey = process.env.DARAJA_CONSUMER;
  const consumerSecret = process.env.DARAJA_SECRET;
  const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  await axios
    .get(
      "https://api.safaricom.co.ke/oauth/v1/generate", // Correct endpoint
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      token = data.data.access_token;
      console.log(data.data);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

export const stkPush = async (req, res) => {
  if (!token) {
    return res.status(500).json({ error: "Token not available" });
  }
  const shortCode = 174379;
  const passkey = process.env.DARAJA_PASSKEY;
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: shortCode,
    Password: password, // Generate this using Daraja documentation
    Timestamp: timestamp, // Format: YYYYMMDDHHmmss
    TransactionType: "CustomerPayBillOnline",
    Amount: req.body.amount,
    PartyA: req.body.phone, // Customer's phone number
    PartyB: shortCode,
    PhoneNumber: req.body.phone,
    CallBackURL: "https://mydomain.com/pat",
    AccountReference: req.body.orderId,
    TransactionDesc: "Payment for Reservation",
  };

  await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log("STK Push Response:", data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.error(
        "Error making STK Push request:",
        err.response?.status,
        err.response?.data
      );
      res.status(400).json(err.response?.data || err.message);
    });
};

export const checkTransactionStatus = async (req, res) => {
  if (!token) {
    return res.status(500).json({ error: "Token not available" });
  }

  const url =
    "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query";

  const data = {
    Initiator: process.env.INITIATOR,
    SecurityCredential: password,
    CommandID: "TransactionStatusQuery",
    TransactionID: "OEI2AK4Q16",
    PartyA: shortCode, // Replace with your shortcode
    IdentifierType: "1", // Or "2" for Till Number
    Remarks: "Test remarks",
    QueueTimeOutURL: "https://mydomain.com/TransactionStatus/queue/",
    ResultURL: "https://mydomain.com/TransactionStatus/result/",
  };

  await axios
    .get(url, {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log("Transaction Status Query Response:", data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.error(
        "Error checking transaction status:",
        err.response?.status,
        err.response?.data
      );
      res.status(400).json(err.response?.data || err.message);
    });
};
