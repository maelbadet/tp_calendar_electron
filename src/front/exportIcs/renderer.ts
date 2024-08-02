import { iEvent } from '../interfaces/ievent.js';

function formatDateToICS(date: string): string {
    return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function convertEventsToICS(events: iEvent[]): string {
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\n';

    events.forEach(event => {
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `SUMMARY:${event.title}\n`;
        icsContent += `DESCRIPTION:${event.description}\n`;
        if (event.start_at) {
            icsContent += `DTSTART:${formatDateToICS(event.start_at)}\n`;
        }
        if (event.finish_at) {
            icsContent += `DTEND:${formatDateToICS(event.finish_at)}\n`;
        }
        icsContent += 'END:VEVENT\n';
    });

    icsContent += 'END:VCALENDAR';

    return icsContent;
}

const exportButton = document.getElementById('export-button') as HTMLButtonElement;

if (exportButton) {
    exportButton.addEventListener('click', () => {
        window.electron.getAll().then((events: iEvent[]) => {
            const icsContent = convertEventsToICS(events);
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'events.ics';
            a.click();

            URL.revokeObjectURL(url);
        }).catch(error => {
            console.error("Erreur lors de l'exportation des événements : ", error);
        });
    });
}
