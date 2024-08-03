import { iEvent } from "./interfaces/ievent.js";

declare global {
    interface Window {
        electron: {
            ajout: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>,
            ajout_ics: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>,
            getAll: () => Promise<iEvent[]>,
            deleteEvent: (id: number, deleted_at: Date) => Promise<string>,
            openEventsForDate: (date: string) => void,
            receiveEvents: (callback: (data: iEvent[]) => void) => void,
            receiveDateSelected: (callback: (date: string) => void) => void,
            getEventsForDate: (date: string) => Promise<iEvent[]>,
            sendEvents: (events: iEvent[]) => void,
            updateEvent: (event: iEvent) => Promise<string>,
            getEventById: (id: number) => Promise<iEvent>
        }
    }
}
