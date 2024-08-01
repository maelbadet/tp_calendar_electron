"use strict";
/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    ajout: (title, description, allDay, start_at, finish_at, created_at) => electron_1.ipcRenderer.invoke('ajout-event', {
        title, description, allDay, start_at, finish_at, created_at
    }),
    getAll: () => electron_1.ipcRenderer.invoke('get-all-event'),
    deleteEvent: (id, deleted_at) => electron_1.ipcRenderer.invoke('delete-event', {
        id, deleted_at
    })
});
