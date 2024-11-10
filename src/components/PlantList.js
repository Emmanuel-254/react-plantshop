import React, { useState, useEffect } from "react";
import AddPlantForm from "./AddPlantForm";

function PlantList() {
  // State to hold all plants
  const [plants, setPlants] = useState([]);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the plants based on the search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch plants data from the backend API
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        // Ensure each plant has a `soldOut` field
        const plantsWithSoldOut = data.map((plant) => ({
          ...plant,
          soldOut: plant.soldOut || false, // Default to false if missing
        }));
        setPlants(plantsWithSoldOut);
      });
  }, []);

  // Add a new plant to the list
  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  // Mark a plant as sold out
  const handleSoldOut = (plantId) => {
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldOut: true }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? updatedPlant : plant
          )
        );
      });
  };

  return (
    <div>
      <h1>Plant List</h1>
      <AddPlantForm onAddPlant={handleAddPlant} /> {/* Form to add new plants */}
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search for a plant"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      
      {/* Render filtered list of plants */}
      <div className="plant-list">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <img src={plant.image} alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>Price: ${plant.price}</p>
            {/* If the plant is not sold out, show the "Mark as Sold Out" button */}
            {!plant.soldOut && (
              <button onClick={() => handleSoldOut(plant.id)}>
                Mark as Sold Out
              </button>
            )}
            {/* If the plant is sold out, show the "Sold Out" label */}
            {plant.soldOut && <span>Sold Out</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantList;
