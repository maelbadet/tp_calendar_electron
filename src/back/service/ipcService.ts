import { BrowserWindow, ipcMain } from "electron";
import { addEvent, deleteEvent, getAllEvent } from "../model/events";
import { iEvent } from "../../front/interfaces/ievent";

ipcMain.handle('ajout', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    await addEvent(params);
    return "ajout ok";
});

ipcMain.handle('ajout-ics', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    await addEvent(params);
    // if (win) win.close();
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
