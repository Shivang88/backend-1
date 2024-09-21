import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

const teaData = [];
let nextId = 1;

// Add tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

//get tea
app.get("/tea", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t?.id === parseInt(req.params?.id));
  if (!tea) {
    return res.status(404).send("Tea not found!");
  }
  res.status(200).send(tea);
});

//Update tea
app.put("/tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t?.id === parseInt(req.params?.id));
  if (index !== -1) {
    const { name, price } = req.body;
    teaData[index].name = name;
    teaData[index].price = price;

    res.status(200).send(teaData[index]);
  } else {
    return res.status(404).send("Tea not found!");
  }
});

// delete tea
app.delete("/tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t?.id === parseInt(req.params?.id));
  if (index !== -1) {
    teaData.splice(index, 1);
    res.status(200).send("Deleted successfully");
  }
  return res.status(404).send("Tea not found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
