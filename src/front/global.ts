import { iEvent } from "./interfaces/ievent.js"

export { }
declare global {
    interface Window {
        "electron": {
            ajout: (nom: string, prenom: string) => Promise<string>
            getAll: () => Promise<iEvent[]>
            deleteUser: (id: number) => Promise<string>
        }
    }
}

