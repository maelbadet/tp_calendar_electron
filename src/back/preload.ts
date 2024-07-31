/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electron', {
    ajout: (title: string, description: string, created_at: Date) => ipcRenderer.invoke('ajout-event', { title, description, created_at }),
    getAll: () => ipcRenderer.invoke('get-all-event'),
    deleteEvent: (id: number, deleted_at: Date) => ipcRenderer.invoke('delete-event', { id, deleted_at })
})