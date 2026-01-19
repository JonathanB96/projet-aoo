const pool = require("../configuration/baseDeDonnees");

class ActiviteDepot {
  static async creer(activite) {
    const [res] = await pool.query(
      `INSERT INTO activites 
      (groupe_id, titre, type, lieu, date_debut, description)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        activite.groupe_id,
        activite.titre,
        activite.type,
        activite.lieu,
        activite.date_debut,
        activite.description
      ]
    );
    return { ...activite, id: res.insertId };
  }

  static async parGroupe(groupeId) {
    const [rows] = await pool.query(
      "SELECT * FROM activites WHERE groupe_id = ? ORDER BY date_debut DESC",
      [groupeId]
    );
    return rows;
  }

  static async parId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM activites WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  static async supprimer(id) {
    const [res] = await pool.query(
      "DELETE FROM activites WHERE id = ?",
      [id]
    );
    return res.affectedRows > 0;
  }
}

module.exports = ActiviteDepot;
