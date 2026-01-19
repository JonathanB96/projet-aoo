-- =========================
-- INITIALISATION BDD AOO
-- =========================

DROP DATABASE IF EXISTS aoo_group_db;
CREATE DATABASE aoo_group_db;
USE aoo_group_db;

-- ---------- ROLES ----------
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (nom) VALUES
('Responsable'),
('Secrétaire'),
('Membre actif'),
('Trésorier'),
('Membre');

-- ---------- GROUPES ----------
CREATE TABLE groupes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- MEMBRES ----------
CREATE TABLE membres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  groupe_id INT NOT NULL,
  role_id INT NOT NULL,
  nom_complet VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE,
  telephone VARCHAR(30),
  date_adhesion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_membres_groupes
    FOREIGN KEY (groupe_id) REFERENCES groupes(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_membres_roles
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE RESTRICT
);

CREATE INDEX idx_membres_groupe ON membres(groupe_id);
CREATE INDEX idx_membres_role ON membres(role_id);

-- ---------- ACTIVITES ----------
CREATE TABLE activites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  groupe_id INT NOT NULL,
  titre VARCHAR(150) NOT NULL,
  type VARCHAR(80),
  lieu VARCHAR(120),
  date_debut DATETIME NOT NULL,
  description TEXT,

  CONSTRAINT fk_activites_groupes
    FOREIGN KEY (groupe_id) REFERENCES groupes(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_activites_groupe ON activites(groupe_id);
CREATE INDEX idx_activites_date ON activites(date_debut);

-- ---------- PARTICIPATIONS ----------
CREATE TABLE participations (
  activite_id INT NOT NULL,
  membre_id INT NOT NULL,
  statut ENUM('INSCRIT', 'PRESENT', 'ABSENT') DEFAULT 'INSCRIT',
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (activite_id, membre_id),

  CONSTRAINT fk_participations_activites
    FOREIGN KEY (activite_id) REFERENCES activites(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_participations_membres
    FOREIGN KEY (membre_id) REFERENCES membres(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_participations_statut ON participations(statut);
