import { createWindow } from "../utils/createWindow";
export const menuListeTpl = [
    {
        label: "Accueil",
        click: () => createWindow(undefined, 'index.html') // redirection vers la page d'accueil
    },
    {
        label: "Evenement",
        submenu: [
            {
                label: "Ajouter",
                click: () => createWindow(undefined, 'addEvent.html')
            },
            {
                label: "Modifier",
                click: () => createWindow(undefined, 'editEvent.html')
            },
            {
                label: "Supprimer",
                click: () => createWindow(undefined, 'deleteEvent.html')
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
            },
        ]
    },
    {
        label: "Quitter",
        role: "quit"
    }
];
