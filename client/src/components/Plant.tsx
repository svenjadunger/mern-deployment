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
    fetch("http://localhost:3000/plant/65e6126882cafc76e2da8289")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        console.log("Number of fetched plants:", data.length);
      })
      .catch((error) => console.error("Fetching plants failed:", error));
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
            <td>{plant.commonName || "N/A"}</td>{" "}
            {/* Display "N/A" if commonName is missing */}
            <td>{plant.family || "Unknown"}</td>{" "}
            {/* Display "Unknown" if family is empty */}
            <td>{plant.scientificNameWithAuthor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlantList;
