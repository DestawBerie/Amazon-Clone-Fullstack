import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({id, image, price, title, rating}) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="chekoutProduct_image" src={image} alt="" />
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="CheckoutProduct_rating">
          {Array(rating)
            .fill()
            .map(() => (
              // <StarIcon className="star"/>
              <p>🌟</p>
            ))}
        </div>
        <button onClick={removeFromBasket}> removeFromBasket </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
