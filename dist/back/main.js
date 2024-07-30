"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const typeorm_1 = require("typeorm");
const Event_1 = require("../entity/Event");
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)({
            type: 'sqlite',
            database: './database.sqlite',
            synchronize: true,
            logging: true,
            entities: [Event_1.Event],
        });
        const mainWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preload.js'),
                contextIsolation: true,
                nodeIntegration: false,
            },
        });
        mainWindow.loadFile(path.join(__dirname, '../index.html'));
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.ipcMain.handle('fetch-events', (event, month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
    const startDate = `${year}-${('0' + (month + 1)).slice(-2)}-01`;
    const endDate = `${year}-${('0' + (month + 1)).slice(-2)}-31`;
    const events = yield eventRepository.find({
        where: {
            date: (0, typeorm_1.Between)(startDate, endDate)
        }
    });
    return events;
}));
electron_1.ipcMain.handle('add-event', (event, title, description, date) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
    const newEvent = new Event_1.Event(title, description, date);
    newEvent.title = title;
    newEvent.description = description;
    newEvent.date = date;
    yield eventRepository.save(newEvent);
}));
electron_1.ipcMain.handle('update-event', (event, id, title, description, date) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
    const existingEvent = yield eventRepository.findOne(id);
    if (existingEvent) {
        existingEvent.title = title;
        existingEvent.description = description;
        existingEvent.date = date;
        yield eventRepository.save(existingEvent);
    }
}));
electron_1.ipcMain.handle('delete-event', (event, id) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
    yield eventRepository.delete(id);
}));
