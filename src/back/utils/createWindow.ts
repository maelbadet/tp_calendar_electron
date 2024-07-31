import { BrowserWindow, Menu } from "electron"
import { join } from 'node:path'
import { menuListeTpl } from "../menuTpl/menuListes"

export function createWindow(parent?: BrowserWindow, princ: boolean = true): BrowserWindow {
    // Create the browser window.
    const modal = !princ

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 600,
        maxHeight: 768,
        maxWidth: 1024,
        minimizable: false,
        parent: parent,
        // modal: modal,
        webPreferences: {
            preload: join(__dirname, '../preload.js')
        }
    })
    mainWindow.webContents.openDevTools()
    if (princ) {
        const mainMenu = Menu.buildFromTemplate(menuListeTpl)
        mainWindow.setMenu(mainMenu)
        // and load the index.html of the app.
        mainWindow.loadFile('./pages/index.html')
    }
    else {
        mainWindow.loadFile('./pages/addEvent.html')
        mainWindow.removeMenu()
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    return mainWindow
}