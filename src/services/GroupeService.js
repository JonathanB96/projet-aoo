const Groupe = require("../modeles/Groupe");
const GroupeDepot = require("../depots/GroupeDepot");

class GroupeService {
  static async creer(data) {
    const groupe = new Groupe(data);
    groupe.valider();
    return GroupeDepot.creer(groupe);
  }

  static async lister() {
    return GroupeDepot.trouverTous();
  }

  static async lire(id) {
    const groupe = await GroupeDepot.trouverParId(id);
    if (!groupe) throw new Error("Groupe introuvable.");
    return groupe;
  }

  static async modifier(id, data) {
    const existe = await GroupeDepot.trouverParId(id);
    if (!existe) throw new Error("Groupe introuvable.");

    const groupe = new Groupe({ ...existe, ...data, id });
    groupe.valider();
    return GroupeDepot.modifier(id, groupe);
  }

  static async supprimer(id) {
    const ok = await GroupeDepot.supprimer(id);
    if (!ok) throw new Error("Groupe introuvable.");
    return true;
  }
}

module.exports = GroupeService;
