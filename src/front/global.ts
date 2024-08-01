import { iEvent } from "./interfaces/ievent.js"

export { }
declare global {
    interface Window {
        "electron": {
            ajout: (title: string, description: string, allDay: boolean, start_at: String | null, finish_at: String | null, created_at: String) => Promise<string>
            getAll: () => Promise<iEvent[]>
            deleteUser: (id: number, deleted_at: Date) => Promise<string>
        }
    }
}

