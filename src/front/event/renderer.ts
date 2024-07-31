/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
import { iEvent } from '../interfaces/ievent.js'
import { afficheListe } from "../utils/index.js";

const trRes = document.getElementById('res')
function renewAff() {
    //envoyer un message pour récupérer la liste des utilisateurs
    window.electron.getAll().then((event: iEvent[]) => {
        if (trRes) afficheListe(trRes, event, (id) => {
            return () => {
                //envoyer un message pour supp
                window.electron.deleteUser(id)
                renewAff()
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renewAff()
})

//gère un evt pour rafraichir