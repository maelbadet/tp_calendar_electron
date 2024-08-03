"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const events_1 = require("../model/events");
electron_1.ipcMain.handle('ajout-event', async (evt, params) => {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    try {
        await (0, events_1.addEvent)(params);
        if (win)
            win.close();
        return 'ajout ok';
    }
    catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('ajout-ics', async (evt, params) => {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    try {
        await (0, events_1.addEvent)(params);
        if (win)
            win.close();
        return 'ajout ok';
    }
    catch (error) {
        console.error('Error adding ICS event:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('get-all-event', async () => {
    try {
        const events = await (0, events_1.getAllEvent)();
        return Array.isArray(events) ? events : [];
    }
    catch (error) {
        console.error('Error getting all events:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('delete-event', async (evt, params) => {
    try {
        await (0, events_1.deleteEvent)(params);
        return '';
    }
    catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('update-event', async (evt, params) => {
    try {
        await (0, events_1.updateEvent)(params);
        return 'Event updated';
    }
    catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('get-event-by-id', async (event, id) => {
    try {
        const results = await (0, events_1.getEventById)(id);
        if (Array.isArray(results) && results.length > 0) {
            return results[0];
        }
        else {
            throw new Error('Event not found');
        }
    }
    catch (error) {
        console.error('Error retrieving event by ID:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('delete-all', async () => {
    try {
        await (0, events_1.deleteAll)();
        return '';
    }
    catch (error) {
        console.error('Error deleting all events:', error);
        throw error;
    }
});
electron_1.ipcMain.handle('get-events-for-date', async (event, date) => {
    try {
        const events = await (0, events_1.getEventsForDate)(date);
        event.sender.send('send-events', events);
    }
    catch (error) {
        console.error('Error getting events for date:', error);
        throw error;
    }
});
electron_1.ipcMain.on('open-events-for-date', (event, date) => {
    const parentWindow = electron_1.BrowserWindow.fromWebContents(event.sender);
    if (!parentWindow) {
        console.error('Parent window not found. Cannot create a modal window.');
        return;
    }
    const eventsWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        parent: parentWindow,
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    eventsWindow.webContents.openDevTools();
    eventsWindow.loadFile('pages/showEvent.html');
    eventsWindow.webContents.on('did-finish-load', () => {
        eventsWindow.webContents.send('date-selected', date);
    });
});
