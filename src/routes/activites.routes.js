const express = require("express");
const ActiviteControleur = require("../controleurs/ActiviteControleur");

const router = express.Router();

router.post("/groupes/:groupeId/activites", ActiviteControleur.creer);
router.get("/groupes/:groupeId/activites", ActiviteControleur.lister);
router.get("/activites/:id", ActiviteControleur.lire);
router.delete("/activites/:id", ActiviteControleur.supprimer);

module.exports = router;
