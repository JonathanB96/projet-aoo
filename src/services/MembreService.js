const Membre = require("../modeles/Membre");
const MembreDepot = require("../depots/MembreDepot");
const GroupeDepot = require("../depots/GroupeDepot");
const RoleDepot = require("../depots/RoleDepot");

class MembreService {
  static async creerPourGroupe(groupeId, data) {
    const groupe = await GroupeDepot.trouverParId(groupeId);
    if (!groupe) throw new Error("Groupe introuvable.");

    const role = await RoleDepot.trouverParId(data.role_id);
    if (!role) throw new Error("Rôle introuvable.");

    const membre = new Membre({ ...data, groupe_id: groupeId });
    membre.valider();

    return MembreDepot.creer(membre);
  }

  static async listerParGroupe(groupeId) {
    const groupe = await GroupeDepot.trouverParId(groupeId);
    if (!groupe) throw new Error("Groupe introuvable.");
    return MembreDepot.trouverParGroupe(groupeId);
  }

  static async lire(id) {
    const membre = await MembreDepot.trouverParId(id);
    if (!membre) throw new Error("Membre introuvable.");
    return membre;
  }

  static async modifier(id, data) {
    const existe = await MembreDepot.trouverParId(id);
    if (!existe) throw new Error("Membre introuvable.");

    const role = await RoleDepot.trouverParId(data.role_id ?? existe.role_id);
    if (!role) throw new Error("Rôle introuvable.");

    const membre = new Membre({
      ...existe,
      ...data,
      role_id: data.role_id ?? existe.role_id,
      id,
    });
    membre.valider();

    return MembreDepot.modifier(id, membre);
  }

  static async changerRole(id, roleId) {
    const existe = await MembreDepot.trouverParId(id);
    if (!existe) throw new Error("Membre introuvable.");

    const role = await RoleDepot.trouverParId(roleId);
    if (!role) throw new Error("Rôle introuvable.");

    return MembreDepot.changerRole(id, roleId);
  }

  static async supprimer(id) {
    const ok = await MembreDepot.supprimer(id);
    if (!ok) throw new Error("Membre introuvable.");
    return true;
  }
}

module.exports = MembreService;
