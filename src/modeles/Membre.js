class Membre {
  constructor({
    id = null,
    groupe_id,
    role_id,
    nom_complet,
    email = null,
    telephone = null,
    date_adhesion = null,
  }) {
    this.id = id;
    this.groupe_id = groupe_id;
    this.role_id = role_id;
    this.nom_complet = nom_complet;
    this.email = email;
    this.telephone = telephone;
    this.date_adhesion = date_adhesion;
  }

  valider() {
    if (!this.groupe_id) throw new Error("groupe_id est obligatoire.");
    if (!this.role_id) throw new Error("role_id est obligatoire.");
    if (!this.nom_complet || this.nom_complet.trim().length < 2) {
      throw new Error("nom_complet est obligatoire (min 2 caractères).");
    }
    if (this.email && !this.email.includes("@")) {
      throw new Error("email invalide.");
    }
  }
}

module.exports = Membre;
