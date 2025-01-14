// Modèle pour la session
class Session {
    constructor(id, title, date, formateur_id) {
        this.id = id; // Identifiant unique
        this.title = title; // Titre de la session
        this.date = date; // Date de la session
        this.formateur_id = formateur_id; // ID du formateur responsable
    }
}

module.exports = { Session };