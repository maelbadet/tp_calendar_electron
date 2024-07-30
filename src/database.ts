import { createConnection } from 'typeorm';
import { Event } from './entity/Event';

export const initializeDatabase = async () => {
    await createConnection({
        type: 'sqlite',
        database: './database.sqlite',
        synchronize: true,
        logging: true,
        entities: [Event],
    });
};
