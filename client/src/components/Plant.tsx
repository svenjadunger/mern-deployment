import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";

// Angenommen, dies ist der Typ für Ihre Pflanzendaten
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
      const response = await fetch("http://localhost:3000/plant/");
      const data = await response.json();
      setPlants(data);
    };

    fetchPlants();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your plants</TableCaption>
      <TableHead>
        <TableRow>
          <TableHead>Common Name</TableHead>{" "}
          {/* Ändern Sie diesen und die folgenden zurück zu TableHead, wenn TableHead für th vorgesehen ist. */}
          <TableHead>Family</TableHead>
          <TableHead>Scientific Name</TableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {plants.map((plant) => (
          <TableRow key={plant._id}>
            <TableCell>{plant.commonName || "N/A"}</TableCell>
            <TableCell>{plant.family}</TableCell>
            <TableCell>{plant.scientificNameWithAuthor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlantList;