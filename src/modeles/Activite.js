class Activite {
  constructor({
    id = null,
    groupe_id,
    titre,
    type = null,
    lieu = null,
    date_debut,
    description = null
  }) {
    this.id = id;
    this.groupe_id = groupe_id;
    this.titre = titre;
    this.type = type;
    this.lieu = lieu;
    this.date_debut = date_debut;
    this.description = description;
  }

  valider() {
    if (!this.groupe_id) throw new Error("groupe_id requis");
    if (!this.titre || this.titre.length < 3)
      throw new Error("titre invalide");
    if (!this.date_debut)
      throw new Error("date_debut obligatoire");
  }
}

module.exports = Activite;
