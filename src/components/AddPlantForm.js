import React, { useState } from "react";

// AddPlantForm component to handle form submission
function AddPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the new plant object
    const newPlant = {
      id: Date.now(), // Generate a unique id based on timestamp
      name,
      image,
      price: parseFloat(price),
      soldOut: false, // Default to false
    };

    // Call the onAddPlant function passed from parent to update plant list
    onAddPlant(newPlant);

    // Reset form fields
    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Plant Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Add Plant</button>
    </form>
  );
}

// Main component to manage plants state
function PlantManager() {
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: "Aloe",
      image: "./images/aloe.jpg",
      price: 15.99,
      soldOut: true,
    },
    {
      id: 2,
      name: "ZZ Plant",
      image: "./images/zz-plant.jpg",
      price: 25.98,
      soldOut: false,
    },
    {
      id: 3,
      name: "Pilea peperomioides",
      image: "./images/pilea.jpg",
      price: 5.99,
      soldOut: false,
    },
    {
      id: 4,
      name: "Pothos",
      image: "./images/pothos.jpg",
      price: 12.11,
      soldOut: false,
    },
    {
      id: 5,
      name: "Jade",
      image: "./images/jade.jpg",
      price: 10.37,
      soldOut: false,
    },
    {
      id: 6,
      name: "Monstera Deliciosa",
      image: "./images/monstera.jpg",
      price: 25.99,
      soldOut: false,
    },
    {
      id: 7,
      name: "Fiddle Leaf Fig",
      image: "./images/fiddle-leaf-fig.jpg",
      price: 55.0,
      soldOut: false,
    },
  ]);

  // Function to add new plant to the list
  const addPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  return (
    <div>
      <h1>Plant Manager</h1>
      <AddPlantForm onAddPlant={addPlant} />
      <div>
        <h2>Plant List</h2>
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              <h3>{plant.name}</h3>
              <img src={plant.image} alt={plant.name} width="100" />
              <p>Price: ${plant.price}</p>
              <p>{plant.soldOut ? "Sold Out" : "In Stock"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlantManager;
