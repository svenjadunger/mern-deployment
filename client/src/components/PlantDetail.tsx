import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface PlantType {
  commonName: string;
  family?: string;
  scientificNameWithAuthor?: string;
}


const PlantDetail = () => {
  const [plant, setPlant] = useState<PlantType | null>(null);
  const { plantId } = useParams(); 

  useEffect(() => {
    fetch(`http://localhost:3000/plant/${plantId}`)
      .then((response) => response.json())
      .then((data) => setPlant(data))
      .catch((error) => console.error("Error", error));
  }, [plantId]);

  if (!plant) return <div>Loading...</div>;

  return (
    <div>
      <h2>{plant.commonName}</h2>

      {plant.family && <p>Familiy: {plant.family}</p>}
      {plant.scientificNameWithAuthor && (
        <p>Name: {plant.scientificNameWithAuthor}</p>
      )}
    </div>
  );
};

export default PlantDetail;
