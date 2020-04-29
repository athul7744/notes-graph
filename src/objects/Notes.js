class Note {

    constructor() {
        this.data = null;
        this.created_time = new Date().getTime();
        this.updated_time = null;
        this.linked_notes = [];
    }

    load(obj) {
        this.data = obj.data;
        this.created_time = obj.created_time;
        this.updated_time = obj.updated_time;
        this.id = obj.id;
        this.linked_notes = obj.linked_notes;
    }
}