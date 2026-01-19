const express = require("express");
const GroupeControleur = require("../controleurs/GroupeControleur");

const router = express.Router();

router.post("/", GroupeControleur.creer);
router.get("/", GroupeControleur.lister);
router.get("/:id", GroupeControleur.lire);
router.put("/:id", GroupeControleur.modifier);
router.delete("/:id", GroupeControleur.supprimer);

module.exports = router;
