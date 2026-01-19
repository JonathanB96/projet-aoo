class Participation {
  constructor({
    activite_id,
    membre_id,
    statut = "INSCRIT",
    date_inscription = null,
  }) {
    this.activite_id = activite_id;
    this.membre_id = membre_id;
    this.statut = statut;
    this.date_inscription = date_inscription;
  }

  valider() {
    if (!this.activite_id) throw new Error("activite_id requis");
    if (!this.membre_id) throw new Error("membre_id requis");

    const valides = ["INSCRIT", "PRESENT", "ABSENT"];
    if (!valides.includes(this.statut)) {
      throw new Error("statut invalide (INSCRIT, PRESENT, ABSENT)");
    }
  }
}

module.exports = Participation;
