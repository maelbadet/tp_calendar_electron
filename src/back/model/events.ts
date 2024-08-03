import { QueryError, RowDataPacket } from 'mysql2';
import { iEvent } from '../../front/interfaces/ievent';
import { conn } from './conn';

const castToIEventArray = (result: RowDataPacket[]): iEvent[] => {
    return result as iEvent[];
}

export function getAllEvent(): Promise<iEvent[] | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM evenement', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(castToIEventArray(results as RowDataPacket[]));
            }
        });
    });
}

export function getEventById(id: number): Promise<iEvent[] | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM evenement WHERE id=?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(castToIEventArray(results as RowDataPacket[]));
            }
        });
    });
}

export function addEvent(event: iEvent): Promise<void | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO evenement (title, description, all_day, start_at, finish_at, created_at) VALUES (?, ?, ?, ?, ?, ?)',
            [event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

export function updateEvent(event: iEvent): Promise<void | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE evenement SET title=?, description=?, start_at=?, finish_at=?, updated_at=? WHERE id=?',
            [event.title, event.description, event.start_at, event.finish_at, event.updated_at, event.id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

export function deleteEvent(event: iEvent): Promise<void | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE evenement SET deleted_at=? WHERE id=?',
            [event.deleted_at, event.id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

export function deleteAll(): Promise<void | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM evenement', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function getEventsForDate(date: string): Promise<iEvent[] | QueryError> {
    return new Promise((resolve, reject) => {
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);
        conn.query(
            'SELECT * FROM evenement WHERE start_at BETWEEN ? AND ?',
            [new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString()],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(castToIEventArray(results as RowDataPacket[]));
                }
            }
        );
    });
}
