"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// testConnection.ts
const conn_1 = require("./model/conn");
function testConnection() {
    conn_1.conn.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données:', err);
            return;
        }
        console.log('Connexion réussie à la base de données.');
        // Exécuter une requête simple
        conn_1.conn.query('SELECT 1 + 1 AS solution', (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête:', err);
                return;
            }
            console.log('Résultats de la requête:', results);
            // Fermer la connexion après avoir testé la requête
            conn_1.conn.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion:', err);
                    return;
                }
                console.log('Connexion fermée avec succès.');
            });
        });
    });
}
testConnection();
