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
import { Link } from "react-router-dom";



type PlantType = {
  _id: string;
  commonName?: string;
  family: string;
  scientificNameWithAuthor: string;
  symbol?: string;
  synonymSymbol?: string;
  imageUrl: string;
};

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<PlantType[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch("http://localhost:3000/plant/");
      const data = await response.json();
      const filteredAndEnrichedPlants = data
        .filter(
          (plant: {
            commonName: unknown;
            family: unknown;
            scientificNameWithAuthor: unknown;
          }) =>
            plant.commonName && plant.family && plant.scientificNameWithAuthor
        )
        .map((plant: { family: string | number | boolean }) => ({
          ...plant,
          imageUrl: `https://source.unsplash.com/random/?${encodeURIComponent(
            plant.family
          )}`,
        }));
      setPlants(filteredAndEnrichedPlants);
    };

    fetchPlants();
  }, []);

  return (
    <Table>
      <TableCaption>A list of plants</TableCaption>
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
              <Link to={`/plants/${plant._id}`}>
                {plant.commonName || "N/A"}
              </Link>
            </TableCell>
            <TableCell>{plant.family}</TableCell>
            <TableCell>{plant.scientificNameWithAuthor}</TableCell>
            <TableCell>
              <div className="flex justify-center">
                <div className="p-2 border border-gray-200 rounded-lg shadow-sm">
                  <img
                    src={plant.imageUrl}
                    alt="Plant"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlantList;