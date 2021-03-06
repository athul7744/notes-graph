class Line {

    /**
     * @constructor
     * @param {Object} params config-data and api  
     */
    constructor({data,api}){
        
        this.data = data;
        this.api = api;
        this.id = editorInstance.getID();
        this.b_id = api.blocks.getCurrentBlockIndex() + 1;
        this.wrapper = document.createElement('div');
        this.input = document.createElement('div');
        this.markdown = document.createElement('div');
        this.title = false;
        this.prev_data = "";
    }

    /**
     * Function to construct Line block
     * @returns {HTMLElement}
     */
    render() {
        
        this.input.contentEditable = true;
        this.input.classList.add('markdown-input');
        var text = this.data && this.data.text ? this.data.text : '';
        this.input.innerHTML = this.api.sanitizer.clean(text, {});
        
        this.markdown.id = this.id + "-markdown";
        this.markdown.classList.add('markdown');
        if(editorInstance.renderMarkdown){
            this.input.classList.add('hidden');    
        }
        else {
            this.markdown.classList.add('hidden');
        }
        this.markdown.innerHTML = editorInstance.getMarkDown(this.input.innerHTML);
        
        this.wrapper.classList.add("line-style");
        this.wrapper.appendChild(this.input);
        this.wrapper.appendChild(this.markdown);
        this.wrapper.id = this.id + '-main';

        editorInstance.attachBlockEvents(this);
        fieldsInstance.add(this);
        
        return this.wrapper;
    }

    /**
     * Function called when block is updated 
     * @returns null
     */
    updated() {
        
        var data = this.save();
        if( data && data.text){
            if(this.prev_data != data.text){
                this.prev_data = data.text;
                editorInstance.dataChanged = true;
                this.markdown.innerHTML = editorInstance.getMarkDown(data.text);
            }
        }
    }

    /**
     * Function to merge two blocks
     * @param {Object} data Data from block to be merged
     * @returns null
     */
    merge(data){
        
        this.input.innerHTML += data.text;
        this.markdown.innerHTML = editorInstance.getMarkDown(this.input.innerHTML);
        this.markdown.click();
    }

    /**
     * Function to validate block data
     * @param {Object} savedData Data from block
     * @returns {Boolean} true if valid
     */
    validate(savedData) {

        if (savedData.text.trim() === "") {
            return false;
        }
        return true;
    }

    /**
     * Function to save block data
     * @returns {Object} Block data
     */
    save() {
        
        var value = this.input.innerHTML; 
        return {
            text: value ? value : ""
        }
    }

    /**
     * Function called when block is removed
     * @returns null
     */
    removed() {
        fieldsInstance.delete(this.b_id);
    }

    /**
     * Function called when editor instance is destroyed
     * @returns null 
     */
    destroy() {
        editorInstance.removeEvents(this);
        this.input = null;
        this.wrapper = null;
        this.markdown = null;
    }
}

class Title {

    /**
     * @constructor
     * @param {Object} params config-data and api
     */
    constructor({ data, api }) {
        this.data = data;
        this.api = api;
        this.b_id = api.blocks.getCurrentBlockIndex() + 1;
        this.id = editorInstance.getID();
        this.wrapper = document.createElement('div');
        this.input = document.createElement('textarea');
        this.title = true;
    }

    /**
     * Function to construct Line block
     * @returns {HTMLElement}
     */
    render() {
        
        this.wrapper.classList.add("title-style");
        this.input.value = this.data && this.data.text ? this.data.text : '';
        this.input.placeholder = 'Title';
        this.wrapper.appendChild(this.input);
        this.wrapper.id = this.id + '-main';
        fieldsInstance.add(this);
        return this.wrapper;
    }

    /**
     * Function to save block data
     * @returns {Object} Block data
     */
    save() {
        
        var value = this.input.value;
        return {
            text: value ? value : ""
        }
    }

    /**
    * Function called when block is removed
    * @returns null
    */
    removed() {
        
        fieldsInstance.delete(this.b_id);
    }

    /**
     * Function called when editor instance is destroyed
     * @returns null
     */
    destroy() {
        
        this.input = null;
        this.wrapper = null;
        fieldsInstance.delete(this.b_id);
    }

}