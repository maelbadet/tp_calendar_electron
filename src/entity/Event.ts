import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: string;

    constructor(title: string, description: string, date: string) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}
