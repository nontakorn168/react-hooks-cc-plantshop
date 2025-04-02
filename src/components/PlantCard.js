import React from "react";

function PlantCard({ plant, handleSoldOutClick }) {
  const handleClick = () => {
    handleSoldOutClick(plant);
    console.log(plant);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {plant.sold ? (
        <button className="sold-out" onClick={handleClick}>
          Out of Stock
        </button>
      ) : (
        <button className="primary" onClick={handleClick}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
