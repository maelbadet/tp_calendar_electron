"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const calendarBody = document.getElementById('calendar-body');
    const eventList = document.getElementById('event-list');
    const eventForm = document.getElementById('event-form');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const eventDate = document.getElementById('event-date');
    const saveEventButton = document.getElementById('save-event');
    const deleteEventButton = document.getElementById('delete-event');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedEventId = null;
    function fetchEvents(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield window.api.fetchEvents(month, year);
                console.log('Events fetched:', events);
                return events;
            }
            catch (error) {
                console.error('Error fetching events:', error);
                return [];
            }
        });
    }
    function displayEventDetails(events) {
        if (eventList) {
            eventList.innerHTML = '';
            if (events.length === 0) {
                eventList.innerHTML = '<p>Aucun événement pour ce jour.</p>';
                return;
            }
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.textContent = `${event.title}: ${event.description}`;
                eventItem.addEventListener('click', () => {
                    if (eventTitle)
                        eventTitle.value = event.title;
                    if (eventDescription)
                        eventDescription.value = event.description;
                    if (eventDate)
                        eventDate.value = event.date;
                    selectedEventId = event.id;
                });
                eventList.appendChild(eventItem);
            });
        }
    }
    function generateCalendar(month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!calendarBody)
                return;
            console.log(`Generating calendar for ${month + 1}/${year}`);
            calendarBody.innerHTML = '';
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            console.log(`First day of the month: ${firstDay}`);
            console.log(`Days in month: ${daysInMonth}`);
            const events = yield fetchEvents(month, year);
            let date = 1;
            for (let i = 0; i < 6; i++) { // Maximum 6 rows to accommodate days
                let row = document.createElement('tr');
                for (let j = 0; j < 7; j++) {
                    let cell = document.createElement('td');
                    if (i === 0 && j < firstDay) {
                        cell.textContent = '';
                    }
                    else if (date > daysInMonth) {
                        cell.textContent = '';
                    }
                    else {
                        cell.textContent = date.toString();
                        const dayEvents = events.filter((event) => new Date(event.date).getDate() === date);
                        if (dayEvents.length > 0) {
                            let eventText = document.createElement('div');
                            eventText.textContent = `${dayEvents.length} événement(s)`;
                            cell.appendChild(eventText);
                            cell.style.cursor = 'pointer';
                            cell.addEventListener('click', () => displayEventDetails(dayEvents));
                        }
                        date++;
                    }
                    row.appendChild(cell);
                }
                calendarBody.appendChild(row);
            }
        });
    }
    function saveEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const title = eventTitle ? eventTitle.value : '';
            const description = eventDescription ? eventDescription.value : '';
            const date = eventDate ? eventDate.value : '';
            if (!title || !description || !date) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            try {
                if (selectedEventId) {
                    yield window.api.updateEvent(selectedEventId, title, description, date);
                    alert('Événement mis à jour avec succès.');
                }
                else {
                    yield window.api.addEvent(title, description, date);
                    alert('Événement ajouté avec succès.');
                }
                if (eventTitle)
                    eventTitle.value = '';
                if (eventDescription)
                    eventDescription.value = '';
                if (eventDate)
                    eventDate.value = '';
                selectedEventId = null;
                generateCalendar(currentMonth, currentYear);
            }
            catch (error) {
                console.error('Error saving event:', error);
                alert('Erreur lors de l\'enregistrement de l\'événement.');
            }
        });
    }
    function deleteEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!selectedEventId) {
                alert('Aucun événement sélectionné pour suppression.');
                return;
            }
            try {
                yield window.api.deleteEvent(selectedEventId);
                alert('Événement supprimé avec succès.');
                if (eventTitle)
                    eventTitle.value = '';
                if (eventDescription)
                    eventDescription.value = '';
                if (eventDate)
                    eventDate.value = '';
                selectedEventId = null;
                generateCalendar(currentMonth, currentYear);
            }
            catch (error) {
                console.error('Error deleting event:', error);
                alert('Erreur lors de la suppression de l\'événement.');
            }
        });
    }
    // function openModal(day: number, month: number, year: number) {
    //     const modal = document.getElementById('modal');
    //     const modalEventDate = document.getElementById('modal-event-date') as HTMLInputElement | null;
    //     const modalEventTitle = document.getElementById('modal-event-title') as HTMLInputElement | null;
    //     const modalEventDescription = document.getElementById('modal-event-description') as HTMLTextAreaElement | null;
    //     const closeButton = document.getElementById('close-button');
    //     const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    //     if (modalEventDate) modalEventDate.value = formattedDate;
    //     if (modalEventTitle) modalEventTitle.value = '';
    //     if (modalEventDescription) modalEventDescription.value = '';
    //     if (modal) modal.style.display = 'block';
    //     if (closeButton) {
    //         closeButton.addEventListener('click', () => {
    //             if (modal) modal.style.display = 'none';
    //         });
    //     }
    //     window.addEventListener('click', (event) => {
    //         if (event.target === modal) {
    //             if (modal) modal.style.display = 'none';
    //         }
    //     });
    //     const modalSaveEventButton = document.getElementById('modal-save-event') as HTMLButtonElement | null;
    //     if (modalSaveEventButton) {
    //         modalSaveEventButton.addEventListener('click', async () => {
    //             const title = modalEventTitle ? modalEventTitle.value : '';
    //             const description = modalEventDescription ? modalEventDescription.value : '';
    //             const date = modalEventDate ? modalEventDate.value : '';
    //             if (!title || !description || !date) {
    //                 alert('Veuillez remplir tous les champs.');
    //                 return;
    //             }
    //             try {
    //                 await (window as any).api.addEvent(title, description, date);
    //                 alert('Événement ajouté avec succès.');
    //                 if (modal) modal.style.display = 'none';
    //                 generateCalendar(currentMonth, currentYear);
    //             } catch (error) {
    //                 console.error('Error saving event:', error);
    //                 alert('Erreur lors de l\'enregistrement de l\'événement.');
    //             }
    //         });
    //     }
    // }
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', () => {
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
            generateCalendar(currentMonth, currentYear);
        });
    }
    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', () => {
            currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
            currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
            generateCalendar(currentMonth, currentYear);
        });
    }
    if (saveEventButton) {
        saveEventButton.addEventListener('click', saveEvent);
    }
    if (deleteEventButton) {
        deleteEventButton.addEventListener('click', deleteEvent);
    }
    generateCalendar(currentMonth, currentYear);
}));
