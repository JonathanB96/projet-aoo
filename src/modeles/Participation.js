require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Route test
app.get("/", (req, res) => {
  res.json({ message: "API AOO: serveur OK ✅" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
