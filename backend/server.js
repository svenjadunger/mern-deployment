const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
mongoose.Promise = global.Promise;
const { multerUpload } = require("./middlewares/uploadMiddleware");
// Importiere deine Bild-Upload-Routen, falls separat definiert


// Connection to Database
// Connection to Database
mongoose.connect(dbConfig.url)
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

const app = express();

// Import Route-Modules
const userRoutes = require("./app/routes/userRoutes");

const PlantRoute = require("./app/routes/Plant");
const imageRoute = require("./app/routes/Image"); 


app.use(cors());


app.use("/UserImages", express.static("UserImages"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging Middleware 
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(
      `${req.method} ${req.originalUrl} ${
        res.statusCode
      } ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  next();
});

function getDurationInMilliseconds(start) {
  const NS_PER_SEC = 1e9; 
  const NS_TO_MS = 1e6; 
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

// Routes
app.use("/user", userRoutes);

app.use("/plant", PlantRoute);
app.use("/image",imageRoute)

// Root-Route
app.get("/", (req, res) => {
  res.json({ message: "Hello Crud Node Express" });
});

// Hier könntest du deine Upload-Routen definieren oder importieren
// Beispiel: app.use('/api/images', imageRoutes);

// Server-Start
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


//Wenn Users im Programm angemeldet sind, können sie dank der populate() Methode ihre individuell gespeicherten Pflanzen sehen. Dies bedeutet, dass jeder User eine personalisierte Ansicht seiner Pflanzensammlung erhält, basierend auf den Daten, die in der Datenbank hinterlegt sind.