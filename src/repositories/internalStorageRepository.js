class InternalStorageRepository {
    saveDataToLocalStorage(data, key) {
        const storage = window.localStorage;

        storage.setItem(key, data);
    }   

    restoreDataFromLocalStorage(key) {
        const storage = window.localStorage;
        return storage.getItem(key);
    }
}

export default new InternalStorageRepository();