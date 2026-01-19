const GroupeService = require("../services/GroupeService");

class GroupeControleur {
  static async creer(req, res) {
    try {
      const groupe = await GroupeService.creer(req.body);
      res.status(201).json(groupe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async lister(req, res) {
    try {
      const groupes = await GroupeService.lister();
      res.json(groupes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async lire(req, res) {
    try {
      const id = Number(req.params.id);
      const groupe = await GroupeService.lire(id);
      res.json(groupe);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async modifier(req, res) {
    try {
      const id = Number(req.params.id);
      const groupe = await GroupeService.modifier(id, req.body);
      res.json(groupe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async supprimer(req, res) {
    try {
      const id = Number(req.params.id);
      await GroupeService.supprimer(id);
      res.json({ message: "Groupe supprimé ✅" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = GroupeControleur;
