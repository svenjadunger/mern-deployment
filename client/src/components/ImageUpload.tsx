import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function ImageUpload() {

  const [picture, setPicture] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setPicture(null);
      setFileName("");
    }
  };


    const handleUpload = async () => {
      if (!picture) {
        alert("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("image", picture); 

      try {
        const response = await fetch("http://localhost:3000/upload/image", {
          // URL an Ihren Endpunkt anpassen
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Image uploaded successfully:", data);
          alert(`Image uploaded successfully! Path: ${data.filePath}`);
        } else {
          console.error("Upload failed:", response.statusText);
          alert("Upload failed.");
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("An error occurred while uploading the image.");
      }
    };


  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-10 w-10 text-muted-foreground"
          viewBox="0 0 24 24"
        >
          {/* SVG content */}
        </svg>

        <h3 className="mt-4 text-lg font-semibold">No images added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any images. Add some below.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                Select an image file to upload.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="imageFile">Image File</Label>
                <Button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="relative"
                >
                  Choose File
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {fileName && (
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {fileName}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpload}>Upload Image</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ImageUpload;
