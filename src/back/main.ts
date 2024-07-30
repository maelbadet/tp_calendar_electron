import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { createConnection, getRepository, Between } from 'typeorm';
import { Event } from '../entity/Event';

async function createWindow() {
    await createConnection({
        type: 'sqlite',
        database: './database.sqlite',
        synchronize: true,
        logging: true,
        entities: [Event],
    });

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('fetch-events', async (event, month, year) => {
    const eventRepository = getRepository(Event);
    const startDate = `${year}-${('0' + (month + 1)).slice(-2)}-01`;
    const endDate = `${year}-${('0' + (month + 1)).slice(-2)}-31`;

    const events = await eventRepository.find({
        where: {
            date: Between(startDate, endDate)
        }
    });

    return events;
});
ipcMain.handle('add-event', async (event, title, description, date) => {
    const eventRepository = getRepository(Event);
    const newEvent = new Event(title, description, date);
    newEvent.title = title;
    newEvent.description = description;
    newEvent.date = date;
    await eventRepository.save(newEvent);
});

ipcMain.handle('update-event', async (event, id, title, description, date) => {
    const eventRepository = getRepository(Event);
    const existingEvent = await eventRepository.findOne(id);
    if (existingEvent) {
        existingEvent.title = title;
        existingEvent.description = description;
        existingEvent.date = date;
        await eventRepository.save(existingEvent);
    }
});

ipcMain.handle('delete-event', async (event, id) => {
    const eventRepository = getRepository(Event);
    await eventRepository.delete(id);
});
