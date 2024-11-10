import React, { useState } from "react";

function AddPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPlant = { name, image, price: parseFloat(price) };

    // Send the new plant data to the backend
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddPlant(data); // Notify the parent component about the new plant
        setName("");
        setImage("");
        setPrice("");
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Plant</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default AddPlantForm;
