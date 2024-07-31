import { BrowserWindow, ipcMain } from "electron";
import { addEvent, deleteEvent, getAllEvent } from "../model/events";
import { iEvent } from "../../front/interfaces/ievent";

ipcMain.handle('ajout-user', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await addEvent(params)
    if (win) win.close()
    return "ajout ok"
})

ipcMain.handle('get-all-user', async () => {
    const users = await getAllEvent()
    if (Array.isArray(users)) return users
    return []
})

ipcMain.handle('delete-user', async (evt, params: iEvent) => {
    await deleteEvent(params)
    return ""
})