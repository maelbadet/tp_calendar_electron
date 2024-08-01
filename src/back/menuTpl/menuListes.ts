import { createWindow } from "../utils/createWindow";
import { windows } from "../utils/windows";

export const menuListeTpl: any = [
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
        label: "Quitter",
        role: "quit"
    }
];
