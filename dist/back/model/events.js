"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvent = getAllEvent;
exports.getEventById = getEventById;
exports.addEvent = addEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.deleteAll = deleteAll;
exports.getEventsForDate = getEventsForDate;
const conn_1 = require("./conn");
const castToIEventArray = (result) => {
    return result;
};
function getAllEvent() {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('SELECT * FROM evenement', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(castToIEventArray(results));
            }
        });
    });
}
function getEventById(id) {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('SELECT * FROM evenement WHERE id=?', [id], (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(castToIEventArray(results));
            }
        });
    });
}
function addEvent(event) {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('INSERT INTO evenement (title, description, all_day, start_at, finish_at, created_at) VALUES (?, ?, ?, ?, ?, ?)', [event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
function updateEvent(event) {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('UPDATE evenement SET title=?, description=?, start_at=?, finish_at=?, updated_at=? WHERE id=?', [event.title, event.description, event.start_at, event.finish_at, event.updated_at, event.id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
function deleteEvent(event) {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('UPDATE evenement SET deleted_at=? WHERE id=?', [event.deleted_at, event.id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
function deleteAll() {
    return new Promise((resolve, reject) => {
        conn_1.conn.query('DELETE FROM evenement', (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
function getEventsForDate(date) {
    return new Promise((resolve, reject) => {
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);
        conn_1.conn.query('SELECT * FROM evenement WHERE start_at BETWEEN ? AND ?', [new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString()], (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(castToIEventArray(results));
            }
        });
    });
}
