// Middleware d'authentification

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token.split(' ')[1], 'secretKey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Accès réservé aux ${role}s` });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };