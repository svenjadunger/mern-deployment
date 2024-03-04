// components/Plant.tsx
import React, { useEffect, useState } from "react";

type Plant = {
  _id: string;
    name: string;
    family: string;
};

const Plant: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

 useEffect(() => {
   fetch("http://localhost:3000/plant/") 
     .then((response) => response.json())
     .then((data) => setPlants(data))
     .catch((error) => console.error("Fetching plants failed:", error));
 }, []);


  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          
        </tr>
      </thead>
      <tbody>
        {plants.map((plant) => (
          <tr key={plant._id}>
            <td>{plant.name}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Plant;
