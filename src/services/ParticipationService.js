const Participation = require("../modeles/Participation");
const ParticipationDepot = require("../depots/ParticipationDepot");

const ActiviteDepot = require("../depots/ActiviteDepot");
const MembreDepot = require("../depots/MembreDepot");

class ParticipationService {
  static async inscrire(activiteId, data) {
    const activite = await ActiviteDepot.parId(activiteId);
    if (!activite) throw new Error("Activité introuvable.");

    const membre = await MembreDepot.trouverParId(data.membre_id);
    if (!membre) throw new Error("Membre introuvable.");

    // Règle métier: membre doit appartenir au même groupe que l'activité
    const membreGroupeId = membre.groupe_id ?? membre.groupe_id; // compat (si retour brut)
    const activiteGroupeId = activite.groupe_id;
    if (Number(membreGroupeId) !== Number(activiteGroupeId)) {
      throw new Error("Le membre n'appartient pas au groupe de cette activité.");
    }

    const participation = new Participation({
      activite_id: activiteId,
      membre_id: data.membre_id,
      statut: data.statut || "INSCRIT",
    });
    participation.valider();

    // Si déjà inscrit, on peut renvoyer erreur claire
    const existe = await ParticipationDepot.trouver(activiteId, data.membre_id);
    if (existe) throw new Error("Ce membre est déjà inscrit à cette activité.");

    return ParticipationDepot.creer(participation);
  }

  static async lister(activiteId) {
    const activite = await ActiviteDepot.parId(activiteId);
    if (!activite) throw new Error("Activité introuvable.");
    return ParticipationDepot.listerParActivite(activiteId);
  }

  static async changerStatut(activiteId, membreId, statut) {
    const existe = await ParticipationDepot.trouver(activiteId, membreId);
    if (!existe) throw new Error("Participation introuvable.");

    const p = new Participation({ activite_id: activiteId, membre_id: membreId, statut });
    p.valider();

    return ParticipationDepot.changerStatut(activiteId, membreId, statut);
  }

  static async retirer(activiteId, membreId) {
    const ok = await ParticipationDepot.supprimer(activiteId, membreId);
    if (!ok) throw new Error("Participation introuvable.");
    return true;
  }
}

module.exports = ParticipationService;
