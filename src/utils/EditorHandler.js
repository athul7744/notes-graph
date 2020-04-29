class EditorHandler {

    /**
     * @constructor 
     */
    constructor(){
        this.editor = null;
        this.note = null;
    }

    /**
     * Function that returns initial block data
     * @returns {Object} Block Data
     */
    static getInitData(time) {
        return {
            "time": time,
                "blocks": [
                    {
                        "type": "title",
                        "data": {
                            "value": ""
                        }
                    }
                ],
                "version": "2.8.1"
        }
    }
    
    /**
     * Function to create editor
     * @param {Object} data editor data 
     */
    create() {
        if (this.note == undefined) {
            this.note = new Note();
            this.note.data = EditorHandler.getInitData(this.note.created_time);
        }
        if(this.editor != null){
            this.editor.render(this.note.data);
        }
        else{
            this.editor = new EditorJS({
                holder: 'editor',
                tools: {
                    line: Line,
                    title: Title
                },
                placeholder: "Title",
                onChange: this.onChangeFunction,
                onReady: function () {
                    autosize(document.querySelectorAll('textarea'));
                    editorInstance.onReady();
                },
                initialBlock: "line",
                data: this.note.data
            });
        }
    }

    /**
     * Function called on change of editor
     * @param {Object} data 
     * @returns null
     */
    onChangeFunction(data) {

        if (data.blocks.getBlocksCount() == 1){
            var block = data.blocks.getBlockByIndex(0);
            if(!block.children[0].children[0].classList.contains("title-style")){
                editor.render(editorUtils.getInitData());
            }
        }
    }

    onReady() {

        this.editor.listeners.on(document.getElementById("add-new-note"), 'click', (e) => {
            editorInstance.create();
        });
        logger.log("EditorInstance onReady")
    }

    /**
     * Function to attach events to block elements 
     * @param {Line} block Block object
     * @returns null
     */
    attachBlockEvents(block){
        
        block.api.listeners.on(block.input, 'blur', (e) => {
            block.input.classList.add('hidden');
            block.markdown.classList.remove('hidden');
        });

        block.api.listeners.on(block.input, 'focus', (e) => {
            block.input.classList.remove('hidden');
            block.markdown.classList.add('hidden');
        });

        block.api.listeners.on(block.markdown, 'click', (e) => {
            block.input.classList.remove('hidden');
            block.input.focus();
            block.markdown.classList.add('hidden');
        });
    }

    /**
     * Function to remove attached events
     * @param {Line} block Block object
     * @returns null 
     */
    removeEvents(block){
        block.input.removeEventListener('blur', () => {});
        block.input.removeEventListener('focus', () => {});
        block.markdown.removeEventListener('click', () => {});
    }

    /**
     * Function for rendering HTML from markdown
     * @param {String} data
     * @returns {HTMLElement} HTML 
     */
    getMarkDown(data) {
        var html = converter.makeHtml(data);
        if (html) {
            return html;
        } else {
            return data;
        }
    }

    /**
     * Function to generate unique ID
     * @returns {String} ID
     */
    getID() {
        return 'block_' + Math.random().toString(36).substr(2, 9);
    }

    async save() {
        var data = await this.editor.save();
        this.note.data = data;
        dbInstance.store(this.note).then((e) => {
            logger.log("Stored successfully");
        });   
    }

    async set(id) {
        dbInstance.getByID(id).then( (notes) => {
            this.note = notes[0];
            this.create();
        }).catch(err => {
            logger.log('error',err.stack);
        });
    }
}
