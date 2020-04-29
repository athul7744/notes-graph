class FieldHandler {

    #fields = null;

    /**
     * @constructor
     */
    constructor(){
        this.#fields = [];
    }

    /**
     * Add field object
     * @param {Field} field field object
     * @returns null
     */
    add(field) {
        this.#fields.push(field);
    }

    /**
     * Get field object
     * @param {Number} index index of block
     * @returns {Field} field object
     */
    get(index) {
        if(index >= this.#fields.length){
            return null;
        }
        return this.#fields[index];
    }

    /**
     * Get all field objects
     * @returns {Array} array of all fields
     */
    getAllFields() {
        return this.#fields;
    }
    
    /**
     * Delete field by index
     * @param {Number} index Index of field to be deleted 
     */
    delete(index) {
        return this.#fields.splice(index,1);
    }

    /**
     * Delete all fields
     * @returns null
     */
    clear(){
        this.#fields = [];
    }
}