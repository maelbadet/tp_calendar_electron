"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose API methods to the renderer process
electron_1.contextBridge.exposeInMainWorld('api', {
    fetchEvents: (month, year) => electron_1.ipcRenderer.invoke('fetch-events', month, year),
    addEvent: (title, description, date) => electron_1.ipcRenderer.invoke('add-event', title, description, date),
    updateEvent: (id, title, description, date) => electron_1.ipcRenderer.invoke('update-event', id, title, description, date),
    deleteEvent: (id) => electron_1.ipcRenderer.invoke('delete-event', id)
});
