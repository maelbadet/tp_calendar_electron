export function afficheListe(trRes, listePers, cbDel) {
    if (trRes)
        trRes.innerHTML = "";
    for (const p of listePers) {
        afficheLigne(p, trRes, cbDel);
    }
}
export function afficheLigne(p, trRes, cbDel) {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdDescription = document.createElement('td');
    const tdDuration = document.createElement('td');
    const tdOutil = document.createElement('td');
    const btnSupp = document.createElement('button');
    if (p.id)
        tdId.innerHTML = p.id.toString();
    tdTitle.innerHTML = p.title;
    tdDescription.innerHTML = p.description;
    tdDuration.innerHTML = p.start_at ? new Date(p.start_at).toLocaleDateString() : 'N/A'; // Vérifie et convertit la date
    btnSupp.innerHTML = "Supprimer";
    btnSupp.addEventListener('click', cbDel(p.id || 0));
    tdOutil.appendChild(btnSupp);
    tr.append(tdId, tdTitle, tdDescription, tdDuration, tdOutil);
    trRes === null || trRes === void 0 ? void 0 : trRes.appendChild(tr);
}
