import { iEvent } from '../interfaces/ievent.js';

const importInput = document.getElementById('import-input') as HTMLInputElement | null;

let currentId = 0;

function generateUniqueId(): number {
    return currentId++;
}

function formatICSDate(icsDate: string): string | null {
    if (icsDate.length < 15) return null;

    const year = icsDate.slice(0, 4);
    const month = icsDate.slice(4, 6);
    const day = icsDate.slice(6, 8);
    const hour = icsDate.slice(9, 11);
    const minute = icsDate.slice(11, 13);
    const second = icsDate.slice(13, 15);

    if (year && month && day && hour && minute && second) {
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    return null;
}

function parseICSContent(icsContent: string): iEvent[] {
    const events: iEvent[] = [];
    const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
    const matches = icsContent.matchAll(eventRegex);

    for (const match of matches) {
        const eventString = match[1];
        const title = eventString.match(/SUMMARY:(.*)/)?.[1] || '';
        const description = eventString.match(/DESCRIPTION:(.*)/)?.[1] || '';
        const start_at = eventString.match(/DTSTART:(.*)/)?.[1] || '';
        const finish_at = eventString.match(/DTEND:(.*)/)?.[1] || '';
        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const formattedStart = start_at ? formatICSDate(start_at) : null;
        const formattedFinish = finish_at ? formatICSDate(finish_at) : null;

        events.push({
            title,
            description,
            start_at: formattedStart,
            finish_at: formattedFinish,
            id: generateUniqueId(),
            all_day: false,
            created_at
        });
    }

    return events;
}

if (importInput) {
    importInput.addEventListener('change', (event) => {
        const file = importInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const icsContent = reader.result as string;
                const events = parseICSContent(icsContent);
                console.log('Processing events...');

                if (window.electron && typeof window.electron.ajout_ics === 'function') {
                    events.forEach(event => {
                        window.electron.ajout_ics(event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at)
                            .then(response => console.log(response))
                            .catch(err => console.error(err));
                    });
                } else {
                    console.error('window.electron.ajout_ics is not available');
                }

                alert('Events imported successfully');
            };
            reader.readAsText(file);
        }
    });
}
