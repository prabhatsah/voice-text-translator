require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const translateRoutes = require("./routes/translate");
app.use("/api/translate", translateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
