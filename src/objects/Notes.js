class Note {

    /**
     * @constructor
     */
    constructor() {
        this.data = null;
        this.created_time = new Date().getTime();
        this.updated_time = null;
        this.linked_notes = [];
        this.title = '';
    }

    /**
     * Load note data
     * @param {Object} obj Data to be loaded 
     */
    load(obj) {
        this.data = obj.data;
        this.created_time = obj.created_time;
        this.updated_time = obj.updated_time;
        this.id = obj.id;
        this.linked_notes = obj.linked_notes;
        this.title = obj.data.blocks[0].data.text;
    }
}