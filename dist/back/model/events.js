"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvent = getAllEvent;
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.selectLastId = selectLastId;
const conn_js_1 = require("./conn.js");
function getAllEvent() {
    return new Promise((resolve, rej) => {
        conn_js_1.conn.query('SELECT * FROM evenement', (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
function getEventById(id) {
    return new Promise((resolve, rej) => {
        conn_js_1.conn.query('SELECT * FROM evenement WHERE id=?', [id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
function addEvent(event) {
    return new Promise((resolve, reject) => {
        conn_js_1.conn.query('INSERT INTO evenement (title, description, all_day, start_at, finish_at, created_at) VALUES (?, ?, ?, ?, ?, ?)', [event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at], (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}
function updateEvent(event) {
    return new Promise((resolve, rej) => {
        conn_js_1.conn.query('UPDATE evenement SET title=?,description=?,updated_at=? WHERE id=?', [event.title, event.description, event.updated_at, event.id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
function deleteEvent(event) {
    return new Promise((resolve, rej) => {
        conn_js_1.conn.query('UPDATE evenement SET deleted_at=? WHERE id=?', [event.deleted_at, event.id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
function selectLastId() {
    return new Promise((resolve, reject) => {
        conn_js_1.conn.query('SELECT id FROM evenement ORDER BY id DESC LIMIT 1', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                const lastId = results[0]?.id ?? null;
                resolve(lastId);
            }
        });
    });
}
