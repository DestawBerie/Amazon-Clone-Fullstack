// import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  // console.log(basket);
  return (
    <div className="chekOut">
      <div className="chekout_left">
        <img
          className="chekout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h3>Hello</h3>
        <h2 className="checkout_title">Your Shoping Basket</h2>
        {/* <CheckoutProduct /> */}
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
      <div className="chekout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
