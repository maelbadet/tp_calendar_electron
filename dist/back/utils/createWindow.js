"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = createWindow;
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const menuListes_1 = require("../menuTpl/menuListes");
function createWindow(parent, princ = true) {
    // Create the browser window.
    const modal = !princ;
    const mainWindow = new electron_1.BrowserWindow({
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
            preload: (0, node_path_1.join)(__dirname, '../preload.js')
        }
    });
    mainWindow.webContents.openDevTools();
    if (princ) {
        const mainMenu = electron_1.Menu.buildFromTemplate(menuListes_1.menuListeTpl);
        mainWindow.setMenu(mainMenu);
        // and load the index.html of the app.
        mainWindow.loadFile('./pages/index.html');
    }
    else {
        mainWindow.loadFile('./pages/addEvent.html');
        mainWindow.removeMenu();
    }
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    return mainWindow;
}
