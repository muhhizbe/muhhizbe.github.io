    let dbPromised = idb.open("football-data", 1, (upgradeDb) => {
        let teamFavoritsObjectStore = upgradeDb.createObjectStore("teamFavorites", {
            keyPath: "id"
        });
        teamFavoritsObjectStore.createIndex("id", "id", {
            unique: false
        });
    });

    function saveForLater(teamFavorite) {
        dbPromised
            .then((db) => {
                let tx = db.transaction("teamFavorites", "readwrite");
                let store = tx.objectStore("teamFavorites");
                console.log(teamFavorite);
                store.put(teamFavorite);
                return tx.complete;
            })
            .then(() => {
                console.log("Team berhasil di simpan.");
            });
    }

    function getAll() {
        return new Promise((resolve, reject) => {
            dbPromised
                .then((db) => {
                    let tx = db.transaction("teamFavorites", "readonly");
                    let store = tx.objectStore("teamFavorites");
                    return store.getAll();
                })
                .then((teamFavorite) => {
                    resolve(teamFavorite);
                });
        });
    }

    function getById(id) {
        return new Promise((resolve, reject) => {
            dbPromised
                .then((db) => {
                    let tx = db.transaction("teamFavorites", "readonly");
                    let store = tx.objectStore("teamFavorites");
                    return store.get(id);
                })
                .then((team) => {
                    resolve(team);
                });
        });
    }

    function deleteById(id) {
        return new Promise((resolve, reject) => {
            dbPromised
                .then((db) => {
                    let tx = db.transaction('teamFavorites', 'readwrite');
                    let store = tx.objectStore('teamFavorites');
                    store.delete(id.id);
                    return tx.complete;
                }).then((team) => {
                    console.log('Item deleted');
                    resolve(team);
                });
        });
    }