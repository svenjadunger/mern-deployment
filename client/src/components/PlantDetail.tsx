import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Importieren der Card-Komponenten
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

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
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{plant.commonName}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {plant.family && (
            <CardDescription>
              <strong>Family:</strong> {plant.family}
            </CardDescription>
          )}
          {plant.scientificNameWithAuthor && (
            <CardDescription>
              <strong>Scientific Name:</strong> {plant.scientificNameWithAuthor}
            </CardDescription>
          )}
          <CardDescription>
            <strong>Description:</strong> {plant.description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantDetail;
