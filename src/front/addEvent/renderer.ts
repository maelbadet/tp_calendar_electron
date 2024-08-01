const btnAjout = document.getElementById('ajout');
const inpTitle = document.getElementById('title') as HTMLInputElement | null;
const inpDescription = document.getElementById('description') as HTMLInputElement | null;
const inpAllDay = document.getElementById('allDay') as HTMLInputElement | null;
const inpStart = document.getElementById('start_at') as HTMLInputElement | null;
const inpFinish = document.getElementById('finish_at') as HTMLInputElement | null;

if (btnAjout) {
    btnAjout.addEventListener('click', () => {
        if (inpTitle && inpDescription && inpStart && inpFinish) {
            const title = inpTitle.value.trim();
            const description = inpDescription.value.trim();
            const allDay = inpAllDay?.checked || false;
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

            if (allDay) {
                if (inpStart.value) {
                    // Définir l'heure de fin à 23h59:59 si "Toute la journée" est sélectionné
                    const start = new Date(inpStart.value).toISOString().slice(0, 19).replace('T', ' ');
                    const finish = new Date(inpStart.value);
                    finish.setHours(23, 59, 59);
                    const finishStr = finish.toISOString().slice(0, 19).replace('T', ' ');

                    window.electron.ajout(title, description, true, start, finishStr, createdAt);
                } else {
                    alert("Veuillez entrer la date de début pour un événement de toute la journée.");
                }
            } else {
                // Vérifier que les champs de début et de fin sont remplis
                if (inpStart.value && inpFinish.value) {
                    const start = new Date(inpStart.value).toISOString().slice(0, 19).replace('T', ' ');
                    const finish = new Date(inpFinish.value).toISOString().slice(0, 19).replace('T', ' ');

                    if (new Date(start) > new Date(finish)) {
                        alert("La date de fin doit être postérieure à la date de début.");
                        return;
                    }

                    console.log('Titre : ' + title);
                    console.log('Description : ' + description);
                    console.log('Toute la journée : ' + allDay);
                    console.log('Commence le : ' + start);
                    console.log('Fini le : ' + finish);
                    console.log('Créé le : ' + createdAt);

                    window.electron.ajout(title, description, false, start, finish, createdAt);
                } else {
                    alert("Veuillez remplir les heures de début et de fin.");
                }
            }
        } else {
            alert("Les champs titre, description, et date de début sont obligatoires.");
        }
    });
} else {
    alert("Bouton ajout inexistant");
}
