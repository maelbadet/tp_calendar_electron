import { iEvent } from '../interfaces/ievent.js';

const toDateString = (date: Date): string => date.toISOString().split('T')[0];

export function renderCalendar(month: number, year: number): void {
    const calendarBody = document.getElementById('calendar-body');
    if (!calendarBody) return;

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
            } else if (date > daysInMonth) {
                break;
            } else {
                const cell = document.createElement('td');
                const cellDate = new Date(year, month, date);
                cell.appendChild(document.createTextNode(date.toString()));
                cell.addEventListener('click', () => window.electron.openEventsForDate(cellDate.toISOString()));

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

    prevMonthBtn?.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn?.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close-btn');

    document.addEventListener('click', (event) => {
        if (event.target === closeBtn || event.target === modal) {
            (modal as HTMLElement).style.display = 'none';
        }
    });
});
