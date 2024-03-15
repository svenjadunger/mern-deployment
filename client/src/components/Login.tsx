import { useState } from "react";
// import { Link } from "react-router-dom";
// UI components from the library
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const triggerFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", name);
    formData.append("phone", "45837783");
    formData.append("email", email);
    formData.append("password", password);
    if (picture) {
      formData.append("picture", picture);
    }

    const url = "http://localhost:3000/user/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log("Account successfully created", data);
      } else {
        console.error("Registration failed", data.error);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your details below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              {" "}
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="input-align"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="input-align"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="input-align"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <div>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  type="button"
                  className="w-full"
                  onClick={triggerFileInput}
                >
                  Choose file
                </Button>
                {fileName && (
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {fileName}
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default Login;
