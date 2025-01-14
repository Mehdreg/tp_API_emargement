// Modèle pour l'émargement
class Emargement {
    constructor(id, session_id, etudiant_id, status) {
        this.id = id; // Identifiant unique
        this.session_id = session_id; // ID de la session
        this.etudiant_id = etudiant_id; // ID de l'étudiant
        this.status = status; // Statut de présence (true ou false)
    }
}

module.exports = { Emargement };