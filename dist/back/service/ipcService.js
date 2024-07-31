"use strict";
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
const events_1 = require("../model/events");
electron_1.ipcMain.handle('ajout-user', (evt, params) => __awaiter(void 0, void 0, void 0, function* () {
    const win = electron_1.BrowserWindow.fromWebContents(evt.sender);
    yield (0, events_1.addEvent)(params);
    if (win)
        win.close();
    return "ajout ok";
}));
electron_1.ipcMain.handle('get-all-user', () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, events_1.getAllEvent)();
    if (Array.isArray(users))
        return users;
    return [];
}));
electron_1.ipcMain.handle('delete-user', (evt, params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, events_1.deleteEvent)(params);
    return "";
}));
