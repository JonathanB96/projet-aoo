const express = require("express");
const MembreControleur = require("../controleurs/MembreControleur");

const router = express.Router();

// Ajout + liste par groupe
router.post("/groupes/:groupeId/membres", MembreControleur.creerPourGroupe);
router.get("/groupes/:groupeId/membres", MembreControleur.listerParGroupe);

// CRUD membre
router.get("/membres/:id", MembreControleur.lire);
router.put("/membres/:id", MembreControleur.modifier);
router.delete("/membres/:id", MembreControleur.supprimer);

// Changer rôle
router.put("/membres/:id/role", MembreControleur.changerRole);

module.exports = router;
