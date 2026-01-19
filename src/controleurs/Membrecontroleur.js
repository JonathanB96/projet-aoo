const MembreService = require("../services/MembreService");

class MembreControleur {
  static async creerPourGroupe(req, res) {
    try {
      const groupeId = Number(req.params.groupeId);
      const membre = await MembreService.creerPourGroupe(groupeId, req.body);
      res.status(201).json(membre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async listerParGroupe(req, res) {
    try {
      const groupeId = Number(req.params.groupeId);
      const membres = await MembreService.listerParGroupe(groupeId);
      res.json(membres);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async lire(req, res) {
    try {
      const id = Number(req.params.id);
      const membre = await MembreService.lire(id);
      res.json(membre);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async modifier(req, res) {
    try {
      const id = Number(req.params.id);
      const membre = await MembreService.modifier(id, req.body);
      res.json(membre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async changerRole(req, res) {
    try {
      const id = Number(req.params.id);
      const { role_id } = req.body;
      const membre = await MembreService.changerRole(id, Number(role_id));
      res.json(membre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async supprimer(req, res) {
    try {
      const id = Number(req.params.id);
      await MembreService.supprimer(id);
      res.json({ message: "Membre supprimé ✅" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = MembreControleur;
