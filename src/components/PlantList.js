import React from "react";
import PlantCard from "./PlantCard";

function PlantList(prop) {
  return (
    <ul className="cards">{prop.plants.map((plant) => 
    <PlantCard  
    handleSoldOutClick={prop.handleSoldOutClick}  
    key={plant.id} 
    plant={plant}
     />)}</ul>
  );
}

export default PlantList;
