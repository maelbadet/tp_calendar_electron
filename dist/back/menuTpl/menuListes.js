"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuListeTpl = void 0;
const createWindow_1 = require("../utils/createWindow");
exports.menuListeTpl = [
    {
        label: "Accueil",
        click: () => (0, createWindow_1.createWindow)(undefined, 'index.html') // redirection vers la page d'accueil
    },
    {
        label: "Evenement",
        submenu: [
            {
                label: "Ajouter",
                click: () => (0, createWindow_1.createWindow)(undefined, 'addEvent.html')
            },
            {
                label: "Modifier",
                click: () => (0, createWindow_1.createWindow)(undefined, 'editEvent.html')
            },
            {
                label: "Supprimer",
                click: () => (0, createWindow_1.createWindow)(undefined, 'deleteEvent.html')
            }
        ]
    },
    {
        label: "Quitter",
        role: "quit"
    }
];
