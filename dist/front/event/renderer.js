"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../utils/index.js");
const trRes = document.getElementById('res');
function renewAff() {
    //envoyer un message pour récupérer la liste des utilisateurs
    window.electron.getAll().then((event) => {
        if (trRes)
            (0, index_js_1.afficheListe)(trRes, event, (id) => {
                return () => {
                    //envoyer un message pour supp
                    window.electron.deleteUser(id);
                    renewAff();
                };
            });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renewAff();
});
//gère un evt pour rafraichir
