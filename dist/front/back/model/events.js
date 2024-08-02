import { conn } from './conn.js';
export function getAllEvent() {
    return new Promise((resolve, rej) => {
        conn.query('SELECT * FROM evenement', (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
export function getEventById(id) {
    return new Promise((resolve, rej) => {
        conn.query('SELECT * FROM evenement WHERE id=?', [id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
export function addEvent(event) {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO evenement (title, description, all_day, start_at, finish_at, created_at) VALUES (?, ?, ?, ?, ?, ?)', [event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at], (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}
export function updateEvent(event) {
    return new Promise((resolve, rej) => {
        conn.query('UPDATE evenement SET title=?,description=?,updated_at=? WHERE id=?', [event.title, event.description, event.updated_at, event.id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
export function deleteEvent(event) {
    return new Promise((resolve, rej) => {
        conn.query('UPDATE evenement SET deleted_at=? WHERE id=?', [event.deleted_at, event.id], (err, res) => {
            if (err)
                rej(err);
            else
                resolve(res);
        });
    });
}
export function selectLastId() {
    return new Promise((resolve, reject) => {
        conn.query('SELECT id FROM evenement ORDER BY id DESC LIMIT 1', (err, results) => {
            var _a, _b;
            if (err) {
                reject(err);
            }
            else {
                const lastId = (_b = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
                resolve(lastId);
            }
        });
    });
}
