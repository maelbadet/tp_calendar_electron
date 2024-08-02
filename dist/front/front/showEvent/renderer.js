var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function afficherEvenementsDuJour(date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield window.electron.getAll();
            const eventsForDate = events.filter(event => {
                if (event.start_at && event.deleted_at === null) {
                    const eventDate = new Date(event.start_at);
                    return eventDate.toDateString() === date.toDateString();
                }
                return false;
            });
            console.log("Événements pour la date : ", eventsForDate);
            const eventList = document.getElementById('event-list');
            if (eventList) {
                eventList.innerHTML = '';
                if (eventsForDate.length > 0) {
                    eventsForDate.forEach(event => {
                        const li = document.createElement('li');
                        li.textContent = `${event.title} - ${event.description}`;
                        const editBtn = document.createElement('button');
                        editBtn.textContent = 'Modifier';
                        editBtn.onclick = () => {
                            window.location.href = `editEvent.html?id=${event.id}`;
                        };
                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Supprimer';
                        deleteBtn.onclick = () => {
                            if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
                                window.electron.deleteEvent(event.id, new Date()).then(() => {
                                    // Refresh events or redirect
                                }).catch(error => {
                                    console.error('Erreur lors de la suppression de l\'événement : ', error);
                                });
                            }
                        };
                        const btnContainer = document.createElement('div');
                        btnContainer.appendChild(editBtn);
                        btnContainer.appendChild(deleteBtn);
                        li.appendChild(btnContainer);
                        eventList.appendChild(li);
                    });
                }
                else {
                    eventList.innerHTML = '<li>Aucun événement trouvé pour cette date.</li>';
                }
            }
        }
        catch (error) {
            console.error("Erreur lors de la récupération des événements : ", error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    if (dateParam) {
        const date = new Date(dateParam);
        afficherEvenementsDuJour(date);
    }
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            window.history.back();
        };
    }
});
export {};
