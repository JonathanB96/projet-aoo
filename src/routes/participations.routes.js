const express = require("express");
const ParticipationControleur = require("../controleurs/ParticipationControleur");

const router = express.Router();

router.post("/activites/:activiteId/participations", ParticipationControleur.inscrire);
router.get("/activites/:activiteId/participations", ParticipationControleur.lister);
router.put("/activites/:activiteId/participations/:membreId", ParticipationControleur.changerStatut);
router.delete("/activites/:activiteId/participations/:membreId", ParticipationControleur.retirer);

module.exports = router;
