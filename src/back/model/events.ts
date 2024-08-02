import { QueryError, RowDataPacket } from 'mysql2'
import { iEvent } from '../../front/interfaces/ievent.js'
import { conn } from './conn.js'

export function getAllEvent(): Promise<iEvent[] | QueryError> {
    return new Promise((resolve, rej) => {
        conn.query('SELECT * FROM evenement', (err, res) => {
            if (err) rej(err)
            else resolve(res as iEvent[])

        })
    })
}

export function getEventById(id: number) {
    return new Promise((resolve, rej) => {
        conn.query('SELECT * FROM evenement WHERE id=?',
            [id],
            (err, res) => {
                if (err) rej(err)
                else resolve(res)

            })
    })
}

export function addEvent(event: iEvent) {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO evenement (title, description, all_day, start_at, finish_at, created_at) VALUES (?, ?, ?, ?, ?, ?)',
            [event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at],
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
            }
        );
    });
}


export function updateEvent(event: iEvent) {
    return new Promise((resolve, rej) => {
        conn.query('UPDATE evenement SET title=?,description=?,updated_at=? WHERE id=?',
            [event.title, event.description, event.updated_at, event.id],
            (err, res) => {
                if (err) rej(err)
                else resolve(res)

            })
    })
}

export function deleteEvent(event: iEvent) {
    return new Promise((resolve, rej) => {
        conn.query('UPDATE evenement SET deleted_at=? WHERE id=?',
            [event.deleted_at, event.id],
            (err, res) => {
                if (err) rej(err)
                else resolve(res)
            })
    })
}

export function selectLastId(): Promise<number | null | QueryError> {
    return new Promise((resolve, reject) => {
        conn.query('SELECT id FROM evenement ORDER BY id DESC LIMIT 1', (err, results) => {
            if (err) {
                reject(err);
            } else {
                const lastId = (results as RowDataPacket[])[0]?.id ?? null;
                resolve(lastId);
            }
        });
    });
}
