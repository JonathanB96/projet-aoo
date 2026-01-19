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

// TODO: routes principales (on les branchera à l'étape suivante)
// app.use("/api/groupes", require("./routes/groupes.routes"));
// app.use("/api/membres", require("./routes/membres.routes"));
// app.use("/api/activites", require("./routes/activites.routes"));
// app.use("/api/participations", require("./routes/participations.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
