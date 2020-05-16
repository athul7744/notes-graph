class EditorHandler {

    /**
     * @constructor 
     */
    constructor(){
        this.editor = null;
        this.note = null;
        this.mode = 'ADD';
        this.dataChanged = false;
        this.saveTimeOut = null;
        this.renderMarkdown = false;
        this.saving = false;
        logger.log("EditorHandler.js : EditorHandler initialized");
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
        if (this.note == null) {
            this.note = new Note();
            this.note.data = EditorHandler.getInitData(this.note.created_time);
        }
        if(this.editor != null){
            logger.log("EditorHandler.js : Rendering note");
            this.editor.render(this.note.data).then(() => {
                editorInstance.renderMarkdown = false;
            });
        }
        else{
            logger.log("EditorHandler.js : Rendering note");
            this.editor = new EditorJS({
                holder: 'editor',
                tools: {
                    line: Line,
                    title: Title
                },
                placeholder: "Title",
                onChange: function(data){
                    editorInstance.onChangeFunction(data);
                },
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
                this.set();
            }
        }
        if(this.dataChanged){
            if(this.saveTimeOut) {
                clearTimeout(this.saveTimeOut);
            }
            this.saveTimeOut = setTimeout(function(){
                if (!editorInstance.saving) {
                    editorInstance.save()
                }
            },1200);
        }
        logger.log("EditorHandler.js : Data changed");
    }

    /**
     * Editor on ready function
     * @returns null
     */
    onReady() {

        this.renderMarkdown = false;
        this.editor.listeners.on(document.getElementById("add-new-note"), 'click', (e) => {
            renderer.goTo('editor');
            editorInstance.set(null);
        });
        this.editor.listeners.on(document.getElementById("all-notes"), 'click', (e) => {
            renderer.goTo('all_notes');
        });
        logger.log("EditorHandler.js : Editor is Ready")
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
        logger.log("EditorHandler.js : Block events attached");
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
        logger.log("EditorHandler.js : Block events removed");
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

    /**
     * Function that saves note to DB
     * @returns null 
     */
    async save() {
        this.saving = true;
        var data = await this.editor.save();
        this.note.data = data;
        this.note.title = data.blocks[0].data.text;
        if(this.mode == 'ADD') {
            this.note.created_time = Date.now();
        }
        else {
            this.note.updated_time = Date.now()
        }
        dbInstance.store(this.note).then((e) => {
            logger.log("EditorHandler.js : Stored successfully");
            if(editorInstance.mode == 'ADD'){
                editorInstance.mode = 'EDIT';
                editorInstance.note.id = e;
            }
            editorInstance.saving = false;
        });   
    }

    /**
     * Retrieves note from DB
     * @param {Number} id ID of note to display 
     */
    set(id) {
        if(id != null){
            dbInstance.getByID(id).then( (notes) => {
                this.note = notes[0];
                this.mode = 'EDIT';
                this.create();
            }).catch(err => {
                logger.log('error',err.stack);
            });
        }
        else{
            this.note = null;
            this.mode = 'ADD';
            this.create();
        }
    }

    /**
     * Displays editor using Note object
     * @param {Note} note object containing note data
     */
    setNote(note) {
        if(note != null){
            this.note = note;
            this.mode = 'EDIT';
            this.renderMarkdown = true;
            this.create();
        }
    }
}
