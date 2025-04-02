import React, { useState } from "react";

function NewPlantForm(props) {


  function handleChange(e) {
    const { name, value } = e.target;
    props.setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted plant:', props.formData);
  
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(props.formData),
    })
      .then((r) => r.json())
      .then((data) => {
        props.setPlants(prev => [...prev, data]); // เพิ่มพืชใหม่ใน state
       
        
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });
  }
  


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={props.formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={props.formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={props.formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
