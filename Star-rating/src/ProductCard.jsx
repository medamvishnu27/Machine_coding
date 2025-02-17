import React, { useState, useEffect } from "react";


const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${ratingValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        );
      })}
      <p className="rating-para">{rating}/5 Rating</p>
    </div>
  );
};

const ProductCard = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/1")
      .then(response => response.json())
      .then(data => setProduct(data));
  }, []);

  return (
    <div className="product-card-container">
      {product ? (
        <div className="card">
          <img src={product.image} alt={product.title} className="product-image" />
          <h2>{product.title}</h2>
          <p><span className="decp">Description:</span>{product.description}</p>
          <h3><span className="price">Rs:</span>{product.price}</h3>
          <StarRating />
        </div>
      ) : (
        <p className="loader"></p>
      )}
    </div>
  );
};

export default ProductCard;
