var _a;
let eventCreatedAt = '';
function fillForm(eventId) {
    if (window.electron) {
        window.electron.getEventById(eventId)
            .then((event) => {
            console.log('Event details:', event);
            if (event) {
                eventCreatedAt = event.created_at || '';
                document.getElementById('event_id').value = event.id.toString();
                document.getElementById('title').value = event.title;
                document.getElementById('description').value = event.description;
                document.getElementById('allDay').checked = event.all_day;
                document.getElementById('start_at').value = formatDateToInput(event.start_at);
                document.getElementById('finish_at').value = formatDateToInput(event.finish_at);
            }
            else {
                console.error('Event not found');
            }
        })
            .catch((error) => {
            console.error('Erreur lors du chargement de l\'événement : ', error);
        });
    }
    else {
        console.error('Electron API not found');
    }
}
(_a = document.getElementById('update')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const id = parseInt(document.getElementById('event_id').value, 10);
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const allDay = document.getElementById('allDay').checked;
    const start_at = document.getElementById('start_at').value
        ? formatDateToYYYYMMDD(new Date(document.getElementById('start_at').value))
        : null;
    const finish_at = document.getElementById('finish_at').value
        ? formatDateToYYYYMMDD(new Date(document.getElementById('finish_at').value))
        : null;
    const updated_at = formatDateToYYYYMMDD(new Date()); // Format YYYY-MM-DD hh:mm:ss
    console.log(title);
    if (window.electron) {
        window.electron.updateEvent({
            id,
            title,
            description,
            all_day: allDay,
            start_at,
            finish_at,
            created_at: eventCreatedAt, // Utiliser la date de création stockée
            updated_at
        })
            .then(() => {
            alert('Événement mis à jour avec succès !');
            window.location.href = 'index.html';
        })
            .catch((error) => {
            console.error('Erreur lors de la mise à jour de l\'événement : ', error);
            alert('Erreur lors de la mise à jour de l\'événement.');
        });
    }
    else {
        console.error('Electron API not found');
    }
});
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id') || '0', 10);
console.log('Event ID from URL:', eventId);
if (eventId) {
    fillForm(eventId);
}
else {
    console.error('ID de l\'événement manquant');
}
function formatDateToYYYYMMDD(date) {
    if (date === null || date === undefined) {
        return '';
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function formatDateToInput(value) {
    return typeof value === 'string' ? value.replace(/-/g, '') + 'T00:00' : '';
}
