"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const events_1 = require("../model/events");
electron_1.ipcMain.handle('ajout-event', async (evt, params) => {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    await (0, events_1.addEvent)(params);
    if (win)
        win.close();
    return "ajout ok";
});
electron_1.ipcMain.handle('ajout-ics', async (evt, params) => {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    await (0, events_1.addEvent)(params);
    if (win)
        win.close();
    return "ajout ok";
});
electron_1.ipcMain.handle('get-all-event', async () => {
    const events = await (0, events_1.getAllEvent)();
    if (Array.isArray(events))
        return events;
    return [];
});
electron_1.ipcMain.handle('delete-event', async (evt, params) => {
    await (0, events_1.deleteEvent)(params);
    return "";
});
electron_1.ipcMain.on('open-events-for-date', (event, date) => {
    const eventsWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    eventsWindow.loadFile('pages/showEvent.html');
    eventsWindow.webContents.on('did-finish-load', () => {
        eventsWindow.webContents.send('date-selected', date);
    });
});
