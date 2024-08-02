import { iEvent } from "./interfaces/ievent.js";

export { }
declare global {
    interface Window {
        "electron": {
            ajout: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>,
            ajout_ics: (title: string, description: string, allDay: boolean, start_at: string | null, finish_at: string | null, created_at: string) => Promise<string>,
            getAll: () => Promise<iEvent[]>,
            deleteEvent: (id: number, deleted_at: Date) => Promise<string>
        }
    }
}
