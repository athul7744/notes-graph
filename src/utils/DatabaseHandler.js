class DatabaseHandler {

    #db = null;

    constructor(){
        this.#db = new Dexie("SampleDB");
        this.#db.version(1).stores({notes: `++id`});
        this.#db.notes.mapToClass(Note);
        logger.log("DatabaseHandler.js : Database object initialized");
    }

    store(data) {
        logger.log("DatabaseHandler.js : storing data");
        return this.#db.notes.put(data);
    }

    getDB() {
        logger.log("DatabaseHandler.js : Returning DB");
        return this.#db;
    }

    getByID(id) {
        logger.log("DatabaseHandler.js : Getting by id : "+id);
        return this.#db.notes.where('id').equals(id).toArray();
    }

    async persist() {
    return await navigator.storage && navigator.storage.persist &&
        navigator.storage.persist();
    }

    async isStoragePersisted() {
    return await navigator.storage && navigator.storage.persisted &&
        navigator.storage.persisted();
    }

    async showEstimatedQuota() {
    if (navigator.storage && navigator.storage.estimate) {
        const estimation = await navigator.storage.estimate();
        console.log(`Quota: ${estimation.quota}`);
        console.log(`Usage: ${estimation.usage}`);
    } else {
        console.error("StorageManager not found");
    }
}
}