import { BrowserWindow, ipcMain } from "electron";
import path = require('path');
import { addEvent, deleteEvent, getAllEvent } from "../model/events";
import { iEvent } from "../../front/interfaces/ievent";

ipcMain.handle('ajout-event', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    await addEvent(params);
    if (win) win.close();
    return "ajout ok";
});

ipcMain.handle('ajout-ics', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    await addEvent(params);
    if (win) win.close();
    return "ajout ok";
});

ipcMain.handle('get-all-event', async () => {
    const events = await getAllEvent();
    if (Array.isArray(events)) return events;
    return [];
});

ipcMain.handle('delete-event', async (evt, params: iEvent) => {
    await deleteEvent(params);
    return "";
});

ipcMain.on('open-events-for-date', (event, date) => {
    const eventsWindow = new BrowserWindow({
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
