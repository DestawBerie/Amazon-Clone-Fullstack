import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is the basket", basket);
  const addtoBasket = () => {
    dispatch({
      type: `ADD_TO_BASKET`,
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <p>{title}</p>

      <img src={image} alt="" />
      <div className="product__info">
        <div className="product__rating">
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <button onClick={addtoBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
