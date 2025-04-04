import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { set } from "date-fns";

function PlantPage() {
  const [plants, setPlants] = useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  }); 
  const [filteredPlantsSearch, setFilteredPlantsSearch] = useState((""));



  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);
  
    // function handleSoldOutClick(plant) {
    //   const updatedPlant = { ...plant, sold: !plant.sold };
    
    //   const res =  fetch(`http://localhost:6001/plants/${plant.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ sold: updatedPlant.sold })
    //   })
    
    //   .then(res.json());
    
    //   setPlants(prevPlants =>
    //     prevPlants.map(p =>
    //       p.id === updatedData.id ? updatedData : p
    //     )
    //   );
    // }

    // function handleSoldOutClick(plant) {
    //   const updatedPlant = { ...plant, soldOut: !plant.soldOut };
    
    //   fetch(`http://localhost:6001/plants/${plant.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ soldOut: updatedPlant.soldOut }),
    //   })
    //     .then((res) => res.json())
    //     .then((updatedData) => {
    //       setPlants((prevPlants) =>
    //         prevPlants.map((p) =>
    //           p.id === updatedData.id ? updatedData : p
    //         )
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("Error updating plant:", error);
    //     });
        
    // }

    async function handleSoldOutClick(plant) {
      const updatedPlant = { ...plant, sold: !plant.sold };
    
      try {
        const res = await fetch(`http://localhost:6001/plants/${plant.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sold: updatedPlant.sold }),
        });
    
        const updatedData = await res.json();
    
        setPlants((prevPlants) =>
          prevPlants.map((p) =>
            p.id === updatedData.id ? updatedData : p
          )
        );
    
        return updatedData; //  ส่งกลับให้ปลายทางใช้งาน
      } catch (error) {
        console.error("Error updating plant:", error);
      }
    }

  function handleSeach(e) {
  setFilteredPlantsSearch(e.target.value)
  }
  const filteredPlants = plants.filter((plant) =>
  plant.name.toLowerCase().includes(filteredPlantsSearch.toLowerCase())
);



  return (
    <main>
      <NewPlantForm formData={formData} setFormData={setFormData} setPlants={setPlants} />
      <Search handleSeach={handleSeach} />
      <PlantList plants={filteredPlants} handleSoldOutClick={handleSoldOutClick} />
    </main>
  );
}

export default PlantPage;
