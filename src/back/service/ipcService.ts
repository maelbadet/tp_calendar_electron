import { BrowserWindow, ipcMain } from "electron";
import { addEvent, deleteEvent, getAllEvent } from "../model/events";
import { iEvent } from "../../front/interfaces/ievent";

ipcMain.handle('ajout-event', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await addEvent(params)
    if (win) win.close()
    return "ajout ok"
})

ipcMain.handle('get-all-event', async () => {
    const event = await getAllEvent()
    if (Array.isArray(event)) return event
    return []
})

ipcMain.handle('delete-event', async (evt, params: iEvent) => {
    await deleteEvent(params)
    return ""
})