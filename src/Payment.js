import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
// import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import CurencyFormat from "react-currency-format";
import axios from "./axios.js";
import { type } from "@testing-library/user-event/dist/type";

// import {  usestr, useElements } from "@stripe/react-stripe-js";

function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [{ basket, user }, dispatch] = useStateValue();// puting user out of internal curly brass dont navigat that is a one day error
  //  const [{ cart }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState(true);
  // const getBasketTotal = (basket) =>
  //   basket?.reduce((amount, item) => item.price + amount, 0);
  console.log(clientSecret);

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axios({
        method: "post",
        url: `payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      console.log(res);
      setClientSecret(res.data.clientSecret);
      // console.log(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  //added from the group
  console.log("THE SECRET IS  ", clientSecret);

  const handleSubmit = async (event) => {
    console.log("heloo text");
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
          // id: id,
        });
      });
    navigate("/orders");
  };
  // const someEventHandler = () => {
  //   <button type=""></button>;
  // };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="paymnet_container">
        <h1>Checkout {<Link to="/checkout">{basket?.length} items</Link>}</h1>
        <div className="payment_section">
          <div className="payment_title">
            <h1> Delivery Address</h1>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="Payment_title">
            <h3> Review Items and Deliver</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Methods</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_pricecontainer">
                <CurencyFormat
                  renderText={(value) => <h3>Order Total:{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparater={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
