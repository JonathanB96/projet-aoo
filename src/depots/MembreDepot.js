const pool = require("../configuration/baseDeDonnees");

class MembreDepot {
  static async creer(membre) {
    const [result] = await pool.query(
      `INSERT INTO membres (groupe_id, role_id, nom_complet, email, telephone)
       VALUES (?, ?, ?, ?, ?)`,
      [membre.groupe_id, membre.role_id, membre.nom_complet, membre.email, membre.telephone]
    );
    return { ...membre, id: result.insertId };
  }

  static async trouverParId(id) {
    const [rows] = await pool.query(
      `SELECT m.*, r.nom AS role_nom, g.nom AS groupe_nom
       FROM membres m
       JOIN roles r ON r.id = m.role_id
       JOIN groupes g ON g.id = m.groupe_id
       WHERE m.id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async trouverParGroupe(groupeId) {
    const [rows] = await pool.query(
      `SELECT m.*, r.nom AS role_nom
       FROM membres m
       JOIN roles r ON r.id = m.role_id
       WHERE m.groupe_id = ?
       ORDER BY m.id DESC`,
      [groupeId]
    );
    return rows;
  }

  static async modifier(id, membre) {
    await pool.query(
      `UPDATE membres
       SET nom_complet = ?, email = ?, telephone = ?, role_id = ?
       WHERE id = ?`,
      [membre.nom_complet, membre.email, membre.telephone, membre.role_id, id]
    );
    return this.trouverParId(id);
  }

  static async changerRole(id, roleId) {
    await pool.query("UPDATE membres SET role_id = ? WHERE id = ?", [roleId, id]);
    return this.trouverParId(id);
  }

  static async supprimer(id) {
    const [result] = await pool.query("DELETE FROM membres WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = MembreDepot;
