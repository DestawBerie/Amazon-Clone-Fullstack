const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51MevkULDRGJPrzAnvUhNkLt2L4m3nn7wJwVfWUqg4bqC9xoQ5P9U44pYBX10fEQG7Fd0DtKU1ypO7FIBm5AK2AHX00Cpn3XFyk"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello Destaw"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("payment request recived for the amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-7943a/us-central1/api
// http://127.0.0.1:5001/clone-7943a/us-central1/api
