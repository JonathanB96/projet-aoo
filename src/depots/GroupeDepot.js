const pool = require("../configuration/baseDeDonnees");

class GroupeDepot {
  static async creer(groupe) {
    const [result] = await pool.query(
      "INSERT INTO groupes (nom, description) VALUES (?, ?)",
      [groupe.nom, groupe.description]
    );
    return { ...groupe, id: result.insertId };
  }

  static async trouverTous() {
    const [rows] = await pool.query("SELECT * FROM groupes ORDER BY id DESC");
    return rows;
  }

  static async trouverParId(id) {
    const [rows] = await pool.query("SELECT * FROM groupes WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async modifier(id, groupe) {
    await pool.query(
      "UPDATE groupes SET nom = ?, description = ? WHERE id = ?",
      [groupe.nom, groupe.description, id]
    );
    return this.trouverParId(id);
  }

  static async supprimer(id) {
    const [result] = await pool.query("DELETE FROM groupes WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = GroupeDepot;
