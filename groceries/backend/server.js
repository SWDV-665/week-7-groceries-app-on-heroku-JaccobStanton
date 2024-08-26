const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "where_I_would_put_connection_string_if_port_not_blocked_for_me",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const grocerySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Grocery = mongoose.model("Grocery", grocerySchema);

// CRUD Routes

// Create a grocery
app.post("/groceries", async (req, res) => {
  const grocery = new Grocery(req.body);
  await grocery.save();
  res.status(201).send(grocery);
});

// Get all groceries
app.get("/groceries", async (req, res) => {
  const groceries = await Grocery.find();
  res.send(groceries);
});

// Update a grocery
app.put("/groceries/:id", async (req, res) => {
  const grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(grocery);
});

// Delete a grocery
app.delete("/groceries/:id", async (req, res) => {
  await Grocery.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
