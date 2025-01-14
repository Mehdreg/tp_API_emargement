const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models/Utilisateur');
const router = express.Router();
const pool = require('../config/db');

// Gestion des utilisateurs

router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await pool.query(
            'INSERT INTO Utilisateur (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        res.status(201).json({ message: 'Utilisateur inscrit avec succès', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l inscription', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
});

module.exports = router;