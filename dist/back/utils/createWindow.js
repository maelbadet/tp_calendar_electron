"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = createWindow;
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const menuListes_1 = require("../menuTpl/menuListes");
function createWindow(parent, page = 'index.html', args) {
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 600,
        maxHeight: 768,
        maxWidth: 1024,
        minimizable: false,
        parent: parent,
        webPreferences: {
            preload: (0, node_path_1.join)(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(`./pages/${page}`);
    if (page !== 'index.html') {
        mainWindow.removeMenu();
    }
    else {
        const mainMenu = electron_1.Menu.buildFromTemplate(menuListes_1.menuListeTpl);
        mainWindow.setMenu(mainMenu);
    }
    if (args) {
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('page-args', args);
        });
    }
    return mainWindow;
}
