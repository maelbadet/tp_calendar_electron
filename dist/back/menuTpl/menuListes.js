"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuListeTpl = void 0;
const electron_1 = require("electron");
const createWindow_1 = require("../utils/createWindow");
const events_1 = require("../model/events");
exports.menuListeTpl = [
    {
        label: "Accueil",
        click: () => (0, createWindow_1.createWindow)(undefined, 'index.html')
    },
    {
        label: "Evenement",
        submenu: [
            {
                label: "Ajouter",
                click: () => (0, createWindow_1.createWindow)(undefined, 'addEvent.html')
            },
            {
                label: "Supprimer",
                click: async () => {
                    const result = await electron_1.dialog.showMessageBox({
                        type: 'warning',
                        title: 'Confirmation',
                        message: 'Êtes-vous sûr de vouloir supprimer tous les événements ? Cette action est irréversible.',
                        buttons: ['Oui', 'Annuler'],
                        defaultId: 1,
                        cancelId: 1
                    });
                    if (result.response === 0) {
                        try {
                            await (0, events_1.deleteAll)();
                            console.log('All events deleted successfully');
                            electron_1.dialog.showMessageBox({
                                type: 'info',
                                title: 'Succès',
                                message: 'Tous les événements ont été supprimés avec succès.'
                            });
                        }
                        catch (error) {
                            console.error('Error deleting all events:', error);
                            electron_1.dialog.showErrorBox('Erreur', 'Erreur lors de la suppression de tous les événements.');
                        }
                    }
                    else {
                        console.log('Deletion canceled by user');
                    }
                }
            }
        ]
    },
    {
        label: "ics",
        submenu: [
            {
                label: "exporter",
                click: () => (0, createWindow_1.createWindow)(undefined, 'exportIcs.html')
            },
            {
                label: "importer",
                click: () => (0, createWindow_1.createWindow)(undefined, 'importIcs.html')
            }
        ]
    },
    {
        label: "Développeur",
        submenu: [
            {
                label: "Ouvrir les outils de développement",
                click: () => {
                    const focusedWindow = electron_1.BrowserWindow.getFocusedWindow();
                    if (focusedWindow) {
                        focusedWindow.webContents.openDevTools();
                    }
                    else {
                        console.log('No focused window found to open DevTools.');
                    }
                }
            }
        ]
    },
    {
        label: "Quitter",
        click: async () => {
            const result = await electron_1.dialog.showMessageBox({
                type: 'warning',
                title: 'Confirmation',
                message: 'Êtes-vous sûr de vouloir quitter l\'application ?',
                buttons: ['Oui', 'Annuler'],
                defaultId: 1,
                cancelId: 1
            });
            if (result.response === 0) {
                electron_1.app.quit();
            }
            else {
                console.log('Quit canceled by user');
            }
        }
    }
];
const menu = electron_1.Menu.buildFromTemplate(exports.menuListeTpl);
electron_1.Menu.setApplicationMenu(menu);
electron_1.app.on('ready', () => {
    (0, createWindow_1.createWindow)();
});
