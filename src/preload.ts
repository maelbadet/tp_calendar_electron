import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    fetchEvents: (month: number, year: number) => ipcRenderer.invoke('fetch-events', month, year),
    addEvent: (title: string, description: string, date: string) => ipcRenderer.invoke('add-event', title, description, date),
    updateEvent: (id: number, title: string, description: string, date: string) => ipcRenderer.invoke('update-event', id, title, description, date),
    deleteEvent: (id: number) => ipcRenderer.invoke('delete-event', id)
});
