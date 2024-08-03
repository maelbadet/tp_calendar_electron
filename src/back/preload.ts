import { contextBridge, ipcRenderer } from "electron";
import { iEvent } from "../front/interfaces/ievent";

// Définir les types pour les fonctions exposées
interface ElectronAPI {
    ajout: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>;
    ajout_ics: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>;
    getAll: () => Promise<iEvent[]>;
    deleteEvent: (id: number, deleted_at: Date) => Promise<string>;
    openEventsForDate: (date: string) => void;
    receiveEvents: (callback: (data: iEvent[]) => void) => void;
    receiveDateSelected: (callback: (date: string) => void) => void;
    getEventsForDate: (date: string) => Promise<iEvent[]>;
    sendEvents: (events: iEvent[]) => void;
    updateEvent: (event: iEvent) => Promise<string>;
    getEventById: (id: number) => Promise<iEvent>;
}

const electronAPI: ElectronAPI = {
    ajout: (title, description, allDay, start_at, finish_at, created_at) =>
        ipcRenderer.invoke('ajout-event', { title, description, allDay, start_at, finish_at, created_at }),

    ajout_ics: (title, description, allDay, start_at, finish_at, created_at) =>
        ipcRenderer.invoke('ajout-ics', { title, description, allDay, start_at, finish_at, created_at }),

    getAll: () => ipcRenderer.invoke('get-all-event'),

    deleteEvent: (id, deleted_at) =>
        ipcRenderer.invoke('delete-event', { id, deleted_at }),

    openEventsForDate: (date) => ipcRenderer.send('open-events-for-date', date),

    receiveEvents: (callback) =>
        ipcRenderer.on('send-events', (event, data) => callback(data)),

    receiveDateSelected: (callback) =>
        ipcRenderer.on('date-selected', (event, date) => callback(date)),

    getEventsForDate: (date) =>
        ipcRenderer.invoke('get-events-for-date', date),

    sendEvents: (events) =>
        ipcRenderer.send('send-events', events),

    updateEvent: (event) =>
        ipcRenderer.invoke('update-event', event),

    getEventById: (id) =>
        ipcRenderer.invoke('get-event-by-id', id)
};

// Exposer les API Electron dans le monde principal
contextBridge.exposeInMainWorld('electron', electronAPI);
