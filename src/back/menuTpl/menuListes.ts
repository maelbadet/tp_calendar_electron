import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import { createWindow } from '../utils/createWindow';
import { deleteAll } from '../model/events';

export const menuListeTpl: any = [
    {
        label: "Accueil",
        click: () => createWindow(undefined, 'index.html')
    },
    {
        label: "Evenement",
        submenu: [
            {
                label: "Ajouter",
                click: () => createWindow(undefined, 'addEvent.html')
            },
            {
                label: "Supprimer",
                click: async () => {
                    const result = await dialog.showMessageBox({
                        type: 'warning',
                        title: 'Confirmation',
                        message: 'Êtes-vous sûr de vouloir supprimer tous les événements ? Cette action est irréversible.',
                        buttons: ['Oui', 'Annuler'],
                        defaultId: 1,
                        cancelId: 1
                    });
                    if (result.response === 0) {
                        try {
                            await deleteAll();
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Succès',
                                message: 'Tous les événements ont été supprimés avec succès.'
                            });
                        } catch (error) {
                            console.error('Error deleting all events:', error);
                            dialog.showErrorBox('Erreur', 'Erreur lors de la suppression de tous les événements.');
                        }
                    } else {
                        alert("vous venez d'annuler la suppression des evenements");
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
                click: () => createWindow(undefined, 'exportIcs.html')
            },
            {
                label: "importer",
                click: () => createWindow(undefined, 'importIcs.html')
            }
        ]
    },
    {
        label: "Développeur",
        submenu: [
            {
                label: "Ouvrir les outils de développement",
                click: () => {
                    const focusedWindow = BrowserWindow.getFocusedWindow();
                    if (focusedWindow) {
                        focusedWindow.webContents.openDevTools();
                    } else {
                        alert('Aucune fenetre pour dev n a ete trouver.');
                    }
                }
            }
        ]
    },
    {
        label: "Quitter",
        click: async () => {
            const result = await dialog.showMessageBox({
                type: 'warning',
                title: 'Confirmation',
                message: 'Êtes-vous sûr de vouloir quitter l\'application ?',
                buttons: ['Oui', 'Annuler'],
                defaultId: 1,
                cancelId: 1
            });
            if (result.response === 0) {
                app.quit();
            } else {
                alert('Vous avez decider de rester sur le calendrier');
            }
        }
    }
];

const menu = Menu.buildFromTemplate(menuListeTpl);
Menu.setApplicationMenu(menu);

app.on('ready', () => {
    createWindow();
});
