import { createWindow } from "../../back/utils/createWindow.js";
const toDateString = (date) => date.toISOString().split('T')[0];
function afficherEvenementsDuJour(date) {
    window.electron.getAll().then((events) => {
        const eventsForDate = events.filter(event => {
            if (event.start_at && event.deleted_at === null) {
                const eventDate = new Date(event.start_at);
                return eventDate.toDateString() === date.toDateString();
            }
            return false;
        });
        console.log("Événements pour la date : ", eventsForDate);
        const eventList = document.getElementById('event-list');
        const noEventsMessage = document.getElementById('no-events-message');
        const modal = document.getElementById('event-modal');
        const createEventBtn = document.getElementById('create-event-btn');
        const eventActions = document.getElementById('event-actions');
        if (eventList && modal && noEventsMessage && eventActions) {
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
                noEventsMessage.style.display = 'none';
                eventActions.style.display = 'none';
            }
            else {
                noEventsMessage.style.display = 'block';
                eventActions.style.display = 'none';
            }
            createEventBtn.onclick = () => {
                window.location.href = 'addEvent.html';
            };
            modal.style.display = 'block';
        }
    }).catch(error => {
        console.error("Erreur lors de la récupération des événements : ", error);
    });
}
export function renderCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    if (!calendarBody)
        return;
    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                const cell = document.createElement('td');
                cell.appendChild(document.createTextNode(''));
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                const cell = document.createElement('td');
                const cellDate = new Date(year, month, date);
                cell.appendChild(document.createTextNode(date.toString()));
                cell.addEventListener('click', () => createWindow(undefined, 'showEvent.html'));
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    renderCalendar(currentMonth, currentYear);
    prevMonthBtn === null || prevMonthBtn === void 0 ? void 0 : prevMonthBtn.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });
    nextMonthBtn === null || nextMonthBtn === void 0 ? void 0 : nextMonthBtn.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close-btn');
    document.addEventListener('click', (event) => {
        if (event.target === closeBtn || event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
