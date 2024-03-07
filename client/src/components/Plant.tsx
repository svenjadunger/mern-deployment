import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Common Name</TableHead>
          <TableHead>Family</TableHead>
          <TableHead>Scientific Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plants.map((plant) => (
          <TableRow key={plant._id}>
            <TableCell className="font-medium">
              {plant.commonName || "N/A"}
            </TableCell>
            <TableCell>{plant.family}</TableCell>
            <TableCell>{plant.scientificNameWithAuthor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlantList;