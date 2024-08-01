import { BrowserWindow, Menu } from 'electron';
import { join } from 'node:path';
import { menuListeTpl } from '../menuTpl/menuListes';

export function createWindow(parent?: BrowserWindow, page: string = 'index.html'): BrowserWindow {
    // Create the browser window.
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
            preload: join(__dirname, '../preload.js')
        }
    });

    mainWindow.webContents.openDevTools()
    // Load the appropriate page
    mainWindow.loadFile(`./pages/${page}`);

    // Set the menu if the page is index.html
    if (page === 'index.html') {
        const mainMenu = Menu.buildFromTemplate(menuListeTpl);
        mainWindow.setMenu(mainMenu);
    } else {
        mainWindow.removeMenu();
    }

    return mainWindow;
}
