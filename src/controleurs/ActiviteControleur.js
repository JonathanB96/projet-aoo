const ActiviteService = require("../services/ActiviteService");

class ActiviteControleur {
  static async creer(req, res) {
    try {
      const activite = await ActiviteService.creer(
        Number(req.params.groupeId),
        req.body
      );
      res.status(201).json(activite);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async lister(req, res) {
    try {
      const list = await ActiviteService.lister(
        Number(req.params.groupeId)
      );
      res.json(list);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  static async lire(req, res) {
    try {
      const act = await ActiviteService.lire(Number(req.params.id));
      res.json(act);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  static async supprimer(req, res) {
    try {
      await ActiviteService.supprimer(Number(req.params.id));
      res.json({ message: "Activité supprimée ✅" });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }
}

module.exports = ActiviteControleur;
