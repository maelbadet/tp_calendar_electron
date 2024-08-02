const btnAjout = document.getElementById('ajout');
const inpTitle = document.getElementById('title');
const inpDescription = document.getElementById('description');
const inpAllDay = document.getElementById('allDay');
const inpStart = document.getElementById('start_at');
const inpFinish = document.getElementById('finish_at');
if (btnAjout) {
    btnAjout.addEventListener('click', () => {
        if (inpTitle && inpDescription && inpStart && inpFinish) {
            const title = inpTitle.value.trim();
            const description = inpDescription.value.trim();
            const allDay = (inpAllDay === null || inpAllDay === void 0 ? void 0 : inpAllDay.checked) || false;
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            if (allDay) {
                if (inpStart.value) {
                    const start = new Date(inpStart.value).toISOString().slice(0, 19).replace('T', ' ');
                    const finish = new Date(inpStart.value);
                    finish.setHours(23, 59, 59);
                    const finishStr = finish.toISOString().slice(0, 19).replace('T', ' ');
                    window.electron.ajout(title, description, true, start, finishStr, createdAt);
                }
                else {
                    alert("Veuillez entrer la date de début pour un événement de toute la journée.");
                }
            }
            else {
                if (inpStart.value && inpFinish.value) {
                    const start = new Date(inpStart.value).toISOString().slice(0, 19).replace('T', ' ');
                    const finish = new Date(inpFinish.value).toISOString().slice(0, 19).replace('T', ' ');
                    if (new Date(start) > new Date(finish)) {
                        alert("La date de fin doit être postérieure à la date de début.");
                        return;
                    }
                    window.electron.ajout(title, description, false, start, finish, createdAt);
                }
                else {
                    alert("Veuillez remplir les heures de début et de fin.");
                }
            }
        }
        else {
            alert("Les champs titre, description, et date de début sont obligatoires.");
        }
    });
}
else {
    alert("Bouton ajout inexistant");
}
