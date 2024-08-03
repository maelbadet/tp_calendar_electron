"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electronAPI = {
    ajout: (title, description, allDay, start_at, finish_at, created_at) => electron_1.ipcRenderer.invoke('ajout-event', { title, description, allDay, start_at, finish_at, created_at }),
    ajout_ics: (title, description, allDay, start_at, finish_at, created_at) => electron_1.ipcRenderer.invoke('ajout-ics', { title, description, allDay, start_at, finish_at, created_at }),
    getAll: () => electron_1.ipcRenderer.invoke('get-all-event'),
    deleteEvent: (id, deleted_at) => electron_1.ipcRenderer.invoke('delete-event', { id, deleted_at }),
    openEventsForDate: (date) => electron_1.ipcRenderer.send('open-events-for-date', date),
    receiveEvents: (callback) => electron_1.ipcRenderer.on('send-events', (event, data) => callback(data)),
    receiveDateSelected: (callback) => electron_1.ipcRenderer.on('date-selected', (event, date) => callback(date)),
    getEventsForDate: (date) => electron_1.ipcRenderer.invoke('get-events-for-date', date),
    sendEvents: (events) => electron_1.ipcRenderer.send('send-events', events),
    updateEvent: (event) => electron_1.ipcRenderer.invoke('update-event', event),
    getEventById: (id) => electron_1.ipcRenderer.invoke('get-event-by-id', id)
};
// Exposer les API Electron dans le monde principal
electron_1.contextBridge.exposeInMainWorld('electron', electronAPI);
