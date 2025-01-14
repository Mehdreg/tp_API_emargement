const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Emargement } = require('../models/Emargement');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const router = express.Router();
const pool = require('../config/db');

// Gestion des emargements

router.post('/:id/emargement', authenticateToken, authorizeRole('etudiant'), async (req, res) => {
    const { etudiant_id, status } = req.body;

    try {
        const [session] = await pool.query('SELECT * FROM Session WHERE id = ?', [req.params.id]);
        if (session.length === 0) return res.status(404).json({ message: 'Session non trouvée' });

        const [result] = await pool.query(
            'INSERT INTO Emargement (session_id, etudiant_id, status) VALUES (?, ?, ?)',
            [req.params.id, etudiant_id, status]
        );
        res.status(201).json({ message: 'Emargement ajouté avec succès', emargementId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l ajout de l émargement', error });
    }
});

router.get('/:id/emargement', authenticateToken, authorizeRole('formateur'), async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Emargement WHERE session_id = ?', [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des émargements', error });
    }
});

module.exports = router;