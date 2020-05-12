class FieldHandler {

    #fields = null;

    /**
     * @constructor
     */
    constructor(){
        this.#fields = [];
        logger.log("FieldHandler.js : FieldHandler initialized");
    }

    /**
     * Add field object
     * @param {Field} field field object
     * @returns null
     */
    add(field) {
        this.#fields.push(field);
        logger.log("FieldHandler.js : Field added");
        
    }

    /**
     * Get field object
     * @param {Number} index index of block
     * @returns {Field} field object
     */
    get(index) {
        if(index >= this.#fields.length){
            logger.log("FieldHandler.js : Field does not exist");
            return null;
        }
        logger.log("FieldHandler.js : Getting field with index : "+index);
        return this.#fields[index];
    }

    /**
     * Get all field objects
     * @returns {Array} array of all fields
     */
    getAllFields() {
        logger.log("FieldHandler.js : Get all fields");
        return this.#fields;
    }
    
    /**
     * Delete field by index
     * @param {Number} index Index of field to be deleted 
     */
    delete(index) {
        logger.log("FieldHandler.js : Deleting field with index : "+index);
        return this.#fields.splice(index,1);
    }

    /**
     * Delete all fields
     * @returns null
     */
    clear(){
        logger.log("FieldHandler.js : Deleting all fields");
        this.#fields = [];
    }
}