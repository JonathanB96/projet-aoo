class Groupe {
  constructor({ id = null, nom, description = null, date_creation = null }) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.date_creation = date_creation;
  }

  valider() {
    if (!this.nom || this.nom.trim().length < 2) {
      throw new Error("Le nom du groupe est obligatoire (min 2 caractères).");
    }
  }
}

module.exports = Groupe;
