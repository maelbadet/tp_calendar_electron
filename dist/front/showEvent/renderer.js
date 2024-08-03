if (window.electron) {
    window.electron.receiveEvents((events) => {
        const tbody = document.getElementById('event-tbody');
        if (!tbody) {
            return;
        }
        tbody.innerHTML = '';
        const filteredEvents = events.filter(event => event.deleted_at === null);
        if (filteredEvents.length === 0) {
            const row = document.createElement('tr');
            const noEventsCell = document.createElement('td');
            noEventsCell.colSpan = 6;
            noEventsCell.textContent = 'Aucun événement pour cette date';
            row.appendChild(noEventsCell);
            tbody.appendChild(row);
            return;
        }
        filteredEvents.forEach(event => {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');
            titleCell.textContent = event.title;
            row.appendChild(titleCell);
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = event.description;
            row.appendChild(descriptionCell);
            const startAtCell = document.createElement('td');
            startAtCell.textContent = event.start_at ? new Date(event.start_at).toLocaleTimeString() : 'N/A';
            row.appendChild(startAtCell);
            const endAtCell = document.createElement('td');
            endAtCell.textContent = event.finish_at ? new Date(event.finish_at).toLocaleTimeString() : 'N/A';
            row.appendChild(endAtCell);
            const allDayCell = document.createElement('td');
            allDayCell.textContent = event.all_day ? 'Oui' : 'Non';
            row.appendChild(allDayCell);
            const actionsCell = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Modifier';
            editBtn.onclick = () => {
                window.location.href = `editEvent.html?id=${event.id}`;
            };
            actionsCell.appendChild(editBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.onclick = () => {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
                    window.electron.deleteEvent(event.id, new Date()).then(() => {
                        window.location.reload();
                    }).catch(error => {
                        console.error('Erreur lors de la suppression de l\'événement : ', error);
                    });
                }
            };
            actionsCell.appendChild(deleteBtn);
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    });
    window.electron.receiveDateSelected((date) => {
        const selectedDate = new Date(date);
        const tomorrow = new Date(selectedDate);
        tomorrow.setDate(selectedDate.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split('T')[0];
        window.electron.getEventsForDate(formattedDate).then(events => {
            window.electron.sendEvents(events);
        }).catch(error => {
            console.error('Erreur lors de la récupération des événements : ', error);
        });
    });
}
else {
    alert('Electron API not found');
}
