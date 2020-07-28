// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(() => {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

// PEMANGGILAN DETAIL ARTIKEL
document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    let btnDelete = document.getElementById("delete");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        var item = getSavedTeamById();
        btnSave.style.display = 'none';
        // ambil artikel lalu tampilkan
        getSavedTeamById();
    } else {               
        var item = getTeamById();
        btnDelete.style.display = 'none';
    }

    btnSave.onclick = () => {
        console.log("Tombol FAB save di klik.");
        M.toast({html: 'Berhasil disimpan', classes: 'rounded blue darken-3'});
        item.then((team) => {
            saveForLater(team);
        });
    };

    btnDelete.onclick = () => {
        console.log("Tombol FAB delete di klik.");
        M.toast({html: 'Berhasil dihapus', classes: 'rounded blue darken-3'});
        item.then((team) => {
            deleteById(team);
        });
    };
});