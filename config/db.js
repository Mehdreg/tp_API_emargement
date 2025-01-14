// Configuration de la base de données
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 32768,
    user: 'root',
    password: '',
    database: 'tp_webservices_1',
});

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données: ', err.stack);
      return;
    }
    console.log('Connecté à la base de données MySQL.');
});

module.exports = connection;