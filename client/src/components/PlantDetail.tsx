import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface PlantType {
  commonName: string;
  family?: string;
  scientificNameWithAuthor?: string;
  description: string;
}


const PlantDetail = () => {
  const [plant, setPlant] = useState<PlantType | null>(null);
  const { plantId } = useParams<{ plantId: string }>();

  useEffect(() => {
    fetch(`http://localhost:3000/plant/${plantId}`)
      .then((response) => response.json())
      .then((data) => {

        const description =
          data.family && data.scientificNameWithAuthor
            ? `The plant ${data.commonName} (${data.scientificNameWithAuthor}) belongs to the ${data.family} family.`
            : "No detailed description available.";

        setPlant({
          ...data,
          description, 
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [plantId]);

  if (!plant) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#33691e" }}>{plant.commonName}</h2>
      {plant.family && (
        <p>
          <strong>Family:</strong> {plant.family}
        </p>
      )}
      {plant.scientificNameWithAuthor && (
        <p>
          <strong>Scientific Name:</strong> {plant.scientificNameWithAuthor}
        </p>
      )}
      <p>
        <strong>Description:</strong> {plant.description}
      </p>
    </div>
  );
};

export default PlantDetail;
