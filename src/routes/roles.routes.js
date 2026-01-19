const express = require("express");
const RoleControleur = require("../controleurs/RoleControleur");

const router = express.Router();

router.get("/", RoleControleur.lister);

module.exports = router;
