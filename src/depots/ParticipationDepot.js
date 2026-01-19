const pool = require("../configuration/baseDeDonnees");

class ParticipationDepot {
  static async creer(participation) {
    await pool.query(
      `INSERT INTO participations (activite_id, membre_id, statut)
       VALUES (?, ?, ?)`,
      [participation.activite_id, participation.membre_id, participation.statut]
    );
    return this.trouver(participation.activite_id, participation.membre_id);
  }

  static async trouver(activiteId, membreId) {
    const [rows] = await pool.query(
      `SELECT p.*, m.nom_complet, m.email, r.nom AS role_nom
       FROM participations p
       JOIN membres m ON m.id = p.membre_id
       JOIN roles r ON r.id = m.role_id
       WHERE p.activite_id = ? AND p.membre_id = ?`,
      [activiteId, membreId]
    );
    return rows[0] || null;
  }

  // ✅ CETTE METHODE DOIT EXISTER
  static async listerParActivite(activiteId) {
    const [rows] = await pool.query(
      `SELECT p.*, m.nom_complet, m.email, r.nom AS role_nom
       FROM participations p
       JOIN membres m ON m.id = p.membre_id
       JOIN roles r ON r.id = m.role_id
       WHERE p.activite_id = ?
       ORDER BY p.date_inscription DESC`,
      [activiteId]
    );
    return rows;
  }

  static async changerStatut(activiteId, membreId, statut) {
    await pool.query(
      `UPDATE participations SET statut = ?
       WHERE activite_id = ? AND membre_id = ?`,
      [statut, activiteId, membreId]
    );
    return this.trouver(activiteId, membreId);
  }

  static async supprimer(activiteId, membreId) {
    const [res] = await pool.query(
      `DELETE FROM participations WHERE activite_id = ? AND membre_id = ?`,
      [activiteId, membreId]
    );
    return res.affectedRows > 0;
  }
}

module.exports = ParticipationDepot;
