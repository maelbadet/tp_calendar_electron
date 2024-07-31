"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuListeTpl = void 0;
const createWindow_1 = require("../utils/createWindow");
const windows_1 = require("../utils/windows");
exports.menuListeTpl = [
    {
        label: "Fichier",
        submenu: [
            {
                label: "Ajout",
                click: () => (0, createWindow_1.createWindow)(windows_1.windows[0], false)
            },
            {
                type: "separator"
            },
            {
                label: "Quitter",
                role: "quit"
            }
        ]
    }
];
