const importInput = document.getElementById('import-input');
let currentId = 0;
function generateUniqueId() {
    return currentId++;
}
function formatICSDate(icsDate) {
    if (icsDate.length < 15)
        return null;
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
function parseICSContent(icsContent) {
    var _a, _b, _c, _d;
    const events = [];
    const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
    const matches = icsContent.matchAll(eventRegex);
    for (const match of matches) {
        const eventString = match[1];
        const title = ((_a = eventString.match(/SUMMARY:(.*)/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
        const description = ((_b = eventString.match(/DESCRIPTION:(.*)/)) === null || _b === void 0 ? void 0 : _b[1]) || '';
        const start_at = ((_c = eventString.match(/DTSTART:(.*)/)) === null || _c === void 0 ? void 0 : _c[1]) || '';
        const finish_at = ((_d = eventString.match(/DTEND:(.*)/)) === null || _d === void 0 ? void 0 : _d[1]) || '';
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
        var _a;
        const file = (_a = importInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const icsContent = reader.result;
                const events = parseICSContent(icsContent);
                console.log('Processing events...');
                if (window.electron && typeof window.electron.ajout_ics === 'function') {
                    events.forEach(event => {
                        window.electron.ajout_ics(event.title, event.description, event.all_day, event.start_at, event.finish_at, event.created_at)
                            .then(response => console.log(response))
                            .catch(err => console.error(err));
                    });
                }
                else {
                    console.error('window.electron.ajout_ics is not available');
                }
                alert('Events imported successfully');
            };
            reader.readAsText(file);
        }
    });
}
export {};
