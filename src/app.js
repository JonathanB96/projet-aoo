require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const pool = require("./configuration/baseDeDonnees");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/groupes", require("./routes/groupes.routes"));
app.use("/api/roles", require("./routes/roles.routes"));
app.use("/api", require("./routes/membres.routes"));
app.use("/api", require("./routes/activites.routes"));
app.use("/api", require("./routes/participations.routes"));
app.use("/api", require("./routes/participations.routes"));

app.get("/", (req, res) => {
  res.json({ message: "API AOO: serveur OK ✅" });
});

app.get("/test-bdd", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ message: "Connexion MySQL OK ✅", resultat: rows[0] });
  } catch (error) {
    res.status(500).json({
      message: "Erreur connexion MySQL ❌",
      erreur: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
