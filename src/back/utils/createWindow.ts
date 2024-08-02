import { BrowserWindow, Menu, ipcMain } from 'electron';
import { join } from 'node:path';
import { menuListeTpl } from '../menuTpl/menuListes';

export function createWindow(parent?: BrowserWindow, page: string = 'index.html', args?: any): BrowserWindow {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 600,
        maxHeight: 768,
        maxWidth: 1024,
        minimizable: false,
        parent: parent,
        webPreferences: {
            preload: join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(`./pages/${page}`);

    if (page !== 'index.html') {
        mainWindow.removeMenu();
    } else {
        const mainMenu = Menu.buildFromTemplate(menuListeTpl);
        mainWindow.setMenu(mainMenu);
    }

    if (args) {
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('page-args', args);
        });
    }

    return mainWindow;
}