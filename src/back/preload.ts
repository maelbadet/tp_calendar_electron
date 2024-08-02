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
    ajout: (title: string, description: string, allDay: boolean, start_at: String, finish_at: String, created_at: String) => ipcRenderer.invoke('ajout-event',
        {
            title, description, allDay, start_at, finish_at, created_at
        }),

    ajout_ics: (title: string, description: string, allDay: boolean, start_at: String, finish_at: String, created_at: String) =>
        ipcRenderer.invoke('ajout-ics', { title, description, allDay, start_at, finish_at, created_at }),
    getAll: () => ipcRenderer.invoke('get-all-event'),

    deleteEvent: (id: number, deleted_at: Date) => ipcRenderer.invoke('delete-event',
        {
            id, deleted_at
        })
})