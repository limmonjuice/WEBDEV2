import { useState } from "react";

function ProductInfo({ name, price, details }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="price">₱{price}</p>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <p>{details}</p>
      )}
    </div>
  );
}

export default ProductInfo;