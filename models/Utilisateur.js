// Modèle pour l'utilisateur
class Utilisateur {
    constructor(id, name, email, password, role) {
        this.id = id; // Identifiant unique
        this.name = name; // Nom de l'utilisateur
        this.email = email; // Adresse email unique
        this.password = password; // Mot de passe haché
        this.role = role; // Rôle : formateur ou etudiant
    }
}

module.exports = { Utilisateur };