const RoleDepot = require("../depots/RoleDepot");

class RoleControleur {
  static async lister(req, res) {
    try {
      const roles = await RoleDepot.trouverTous();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RoleControleur;
