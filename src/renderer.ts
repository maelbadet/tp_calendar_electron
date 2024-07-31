document.addEventListener('DOMContentLoaded', async () => {
    const prevMonthButton = document.getElementById('prev-month') as HTMLButtonElement | null;
    const nextMonthButton = document.getElementById('next-month') as HTMLButtonElement | null;
    const calendarBody = document.getElementById('calendar-body') as HTMLTableSectionElement | null;
    const eventList = document.getElementById('event-list') as HTMLDivElement | null;
    const eventForm = document.getElementById('event-form') as HTMLDivElement | null;
    const eventTitle = document.getElementById('event-title') as HTMLInputElement | null;
    const eventDescription = document.getElementById('event-description') as HTMLTextAreaElement | null;
    const eventDate = document.getElementById('event-date') as HTMLInputElement | null;
    const saveEventButton = document.getElementById('save-event') as HTMLButtonElement | null;
    const deleteEventButton = document.getElementById('delete-event') as HTMLButtonElement | null;

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedEventId: number | null = null;

    async function fetchEvents(month: number, year: number) {
        try {
            const events = await (window as any).api.fetchEvents(month, year);
            console.log('Events fetched:', events);
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    function displayEventDetails(events: any[]) {
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
                    if (eventTitle) eventTitle.value = event.title;
                    if (eventDescription) eventDescription.value = event.description;
                    if (eventDate) eventDate.value = event.date;
                    selectedEventId = event.id;
                });
                eventList.appendChild(eventItem);
            });
        }
    }

    async function generateCalendar(month: number, year: number) {
        if (!calendarBody) return;
        console.log(`Generating calendar for ${month + 1}/${year}`);
        calendarBody.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log(`First day of the month: ${firstDay}`);
        console.log(`Days in month: ${daysInMonth}`);

        const events = await fetchEvents(month, year);

        let date = 1;
        for (let i = 0; i < 6; i++) { // Maximum 6 rows to accommodate days
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    cell.textContent = '';
                } else {
                    cell.textContent = date.toString();

                    const dayEvents = events.filter((event: any) => new Date(event.date).getDate() === date);
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
    }

    async function saveEvent() {
        const title = eventTitle ? eventTitle.value : '';
        const description = eventDescription ? eventDescription.value : '';
        const date = eventDate ? eventDate.value : '';

        if (!title || !description || !date) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            if (selectedEventId) {
                await (window as any).api.updateEvent(selectedEventId, title, description, date);
                alert('Événement mis à jour avec succès.');
            } else {
                await (window as any).api.addEvent(title, description, date);
                alert('Événement ajouté avec succès.');
            }
            if (eventTitle) eventTitle.value = '';
            if (eventDescription) eventDescription.value = '';
            if (eventDate) eventDate.value = '';
            selectedEventId = null;
            generateCalendar(currentMonth, currentYear);
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Erreur lors de l\'enregistrement de l\'événement.');
        }
    }

    async function deleteEvent() {
        if (!selectedEventId) {
            alert('Aucun événement sélectionné pour suppression.');
            return;
        }

        try {
            await (window as any).api.deleteEvent(selectedEventId);
            alert('Événement supprimé avec succès.');
            if (eventTitle) eventTitle.value = '';
            if (eventDescription) eventDescription.value = '';
            if (eventDate) eventDate.value = '';
            selectedEventId = null;
            generateCalendar(currentMonth, currentYear);
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Erreur lors de la suppression de l\'événement.');
        }
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
});
