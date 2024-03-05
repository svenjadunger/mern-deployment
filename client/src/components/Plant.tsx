import React, { useEffect, useState } from "react";

type PlantType = {
  _id: string;
  commonName?: string;
  family: string;
  scientificNameWithAuthor: string;
  symbol?: string;
  synonymSymbol?: string;
};

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<PlantType[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:3000/plant/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlants(data);
        console.log("Number of fetched plants:", data.length);
      } catch (error) {
        console.error("Fetching plants failed:", error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Family</th>
          <th>Scientific Name</th>
        </tr>
      </thead>
      <tbody>
        {plants.map((plant) => (
          <tr key={plant._id}>
            <td>{plant.commonName || "N/A"}</td>
            <td>{plant.family || "Unknown"}</td>
            <td>{plant.scientificNameWithAuthor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlantList;
