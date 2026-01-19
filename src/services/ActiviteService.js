const Activite = require("../modeles/Activite");
const ActiviteDepot = require("../depots/ActiviteDepot");
const GroupeDepot = require("../depots/GroupeDepot");

class ActiviteService {
  static async creer(groupeId, data) {
    const groupe = await GroupeDepot.trouverParId(groupeId);
    if (!groupe) throw new Error("Groupe introuvable");

    const activite = new Activite({ ...data, groupe_id: groupeId });
    activite.valider();

    return ActiviteDepot.creer(activite);
  }

  static async lister(groupeId) {
    return ActiviteDepot.parGroupe(groupeId);
  }

  static async lire(id) {
    const act = await ActiviteDepot.parId(id);
    if (!act) throw new Error("Activité introuvable");
    return act;
  }

  static async supprimer(id) {
    const ok = await ActiviteDepot.supprimer(id);
    if (!ok) throw new Error("Activité introuvable");
    return true;
  }
}

module.exports = ActiviteService;
