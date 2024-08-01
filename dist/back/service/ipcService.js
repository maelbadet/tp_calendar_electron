"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const events_1 = require("../model/events");
electron_1.ipcMain.handle('ajout-event', async (evt, params) => {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    await (0, events_1.addEvent)(params);
    if (win)
        win.close();
    return "ajout ok";
});
electron_1.ipcMain.handle('get-all-event', async () => {
    const event = await (0, events_1.getAllEvent)();
    if (Array.isArray(event))
        return event;
    return [];
});
electron_1.ipcMain.handle('delete-event', async (evt, params) => {
    await (0, events_1.deleteEvent)(params);
    return "";
});
