"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = createWindow;
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const menuListes_1 = require("../menuTpl/menuListes");
function createWindow(parent, page = 'index.html') {
    // Create the browser window.
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
            preload: (0, node_path_1.join)(__dirname, '../preload.js')
        }
    });
    mainWindow.webContents.openDevTools();
    // Load the appropriate page
    mainWindow.loadFile(`./pages/${page}`);
    // Set the menu if the page is index.html
    if (page === 'index.html') {
        const mainMenu = electron_1.Menu.buildFromTemplate(menuListes_1.menuListeTpl);
        mainWindow.setMenu(mainMenu);
    }
    else {
        mainWindow.removeMenu();
    }
    return mainWindow;
}
