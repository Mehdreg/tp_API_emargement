const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Session } = require('../models/Session');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const router = express.Router();
const pool = require('../config/db');

// Gestion des sessions

router.post('/', authenticateToken, authorizeRole('formateur'), async (req, res) => {
    const { title, date, formateur_id } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO Session (title, date, formateur_id) VALUES (?, ?, ?)',
            [title, date, formateur_id]
        );
        res.status(201).json({ message: 'Session créée avec succès', sessionId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la session', error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Session');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des sessions', error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Session WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Session non trouvée' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la session', error });
    }
});

router.put('/:id', authenticateToken, authorizeRole('formateur'), async (req, res) => {
    const { title, date, formateur_id } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE Session SET title = ?, date = ?, formateur_id = ? WHERE id = ?',
            [title, date, formateur_id, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Session non trouvée' });
        res.json({ message: 'Session mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la session', error });
    }
});

router.delete('/:id', authenticateToken, authorizeRole('formateur'), async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Session WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Session non trouvée' });
        res.json({ message: 'Session supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la session', error });
    }
});

module.exports = router;