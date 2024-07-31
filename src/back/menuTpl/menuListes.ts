import { BrowserWindow, Menu } from "electron"
import { join } from 'node:path'
import { createWindow } from "../utils/createWindow"
import { windows } from "../utils/windows"

export const menuListeTpl: any = [
    {
        label: "Fichier",
        submenu: [
            {
                label: "Ajout",
                click: () => createWindow(windows[0], false)

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
]