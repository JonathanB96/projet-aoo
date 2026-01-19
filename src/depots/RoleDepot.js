const pool = require("../configuration/baseDeDonnees");

class RoleDepot {
  static async trouverTous() {
    const [rows] = await pool.query("SELECT * FROM roles ORDER BY id ASC");
    return rows;
  }

  static async trouverParId(id) {
    const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
    return rows[0] || null;
  }
}

module.exports = RoleDepot;
