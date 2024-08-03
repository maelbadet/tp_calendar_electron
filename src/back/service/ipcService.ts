import { BrowserWindow, ipcMain } from 'electron';
import path = require('path');
import {
    addEvent,
    deleteAll,
    deleteEvent,
    getAllEvent,
    getEventById,
    getEventsForDate,
    updateEvent
} from '../model/events';
import { iEvent } from '../../front/interfaces/ievent';

ipcMain.handle('ajout-event', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    try {
        await addEvent(params);
        if (win) win.close();
        return 'ajout ok';
    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
});

ipcMain.handle('ajout-ics', async (evt, params: iEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender);
    try {
        await addEvent(params);
        if (win) win.close();
        return 'ajout ok';
    } catch (error) {
        console.error('Error adding ICS event:', error);
        throw error;
    }
});

ipcMain.handle('get-all-event', async () => {
    try {
        const events = await getAllEvent();
        return Array.isArray(events) ? events : [];
    } catch (error) {
        console.error('Error getting all events:', error);
        throw error;
    }
});

ipcMain.handle('delete-event', async (evt, params: iEvent) => {
    try {
        await deleteEvent(params);
        return '';
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
});

ipcMain.handle('update-event', async (evt, params: iEvent) => {
    try {
        await updateEvent(params);
        return 'Event updated';
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
});

ipcMain.handle('get-event-by-id', async (event, id: number) => {
    try {
        const results = await getEventById(id);
        if (Array.isArray(results) && results.length > 0) {
            return results[0];
        } else {
            throw new Error('Event not found');
        }
    } catch (error) {
        console.error('Error retrieving event by ID:', error);
        throw error;
    }
});

ipcMain.handle('delete-all', async () => {
    try {
        await deleteAll();
        return '';
    } catch (error) {
        console.error('Error deleting all events:', error);
        throw error;
    }
});

ipcMain.handle('get-events-for-date', async (event, date: string) => {
    try {
        const events = await getEventsForDate(date);
        event.sender.send('send-events', events);
    } catch (error) {
        console.error('Error getting events for date:', error);
        throw error;
    }
});

ipcMain.on('open-events-for-date', (event, date: string) => {
    const parentWindow = BrowserWindow.fromWebContents(event.sender);
    if (!parentWindow) {
        console.error('Parent window not found. Cannot create a modal window.');
        return;
    }

    const eventsWindow = new BrowserWindow({
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
