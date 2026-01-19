const ParticipationService = require("../services/ParticipationService");

class ParticipationControleur {
  static async inscrire(req, res) {
    try {
      const activiteId = Number(req.params.activiteId);
      const participation = await ParticipationService.inscrire(activiteId, req.body);
      res.status(201).json(participation);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async lister(req, res) {
    try {
      const activiteId = Number(req.params.activiteId);
      const participants = await ParticipationService.lister(activiteId);
      res.json(participants);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  static async changerStatut(req, res) {
    try {
      const activiteId = Number(req.params.activiteId);
      const membreId = Number(req.params.membreId);
      const { statut } = req.body;

      const participation = await ParticipationService.changerStatut(activiteId, membreId, statut);
      res.json(participation);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async retirer(req, res) {
    try {
      const activiteId = Number(req.params.activiteId);
      const membreId = Number(req.params.membreId);

      await ParticipationService.retirer(activiteId, membreId);
      res.json({ message: "Participation retirée ✅" });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }
}

module.exports = ParticipationControleur;
