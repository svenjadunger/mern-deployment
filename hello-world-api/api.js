import express from "express";
const app = express();
const port = process.env.PORT || 5011;

const helloWorldHandler = (req,res) => {
  res.send('Hello World from my Express Api')
}



app.get('/',helloWorldHandler);

app.listen(port, () => {
  console.log("Server is running on port" + port);
});

