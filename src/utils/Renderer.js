class RenderUtil {

    /**
     * Variable to hold routes
     */
    #routes = {};

    /**
     * @constructor
     */
    constructor(){
        this.#routes = {};
        this.currentView = '';
        logger.log("Renderer.js : Renderer object initialized");
    }

    /**
     * Function to register path handler
     * @param {String} path name of path
     * @param {Function} handler handler to be executed
     * @returns null
     */
    register(path,handler){
        if(typeof handler == 'function'){
            this.#routes[path] = handler;
        }
        else{
            logger.log('Argument not a function')
        }
        logger.log("Renderer.js : path registered for : "+path );
    }

    /**
     * Function to go to path
     * @param {String} path name of path
     * @returns null
     */
    goTo(path) {
        if(this.#routes[path] != undefined){
            logger.log("Renderer.js : rendering path : "+path);
            this.#routes[path]();
        }
    }
    /**
     * Function to render main holder
     * @param {String} id ID attribute of holder to be rendered
     * @param {Boolean} destroy remove elements inside ID 
     * @returns {Boolean} true, if state changed
     */
    renderMainHolder(id, destroy=true) {
        if (this.currentView == id){
            logger.log("Renderer.js : Same view!");
            return false;
        }
        var holder = document.getElementById("center-panel");
        for(var i=0;i<holder.childNodes.length;i++){
            if (holder.childNodes[i].id != id){
                holder.childNodes[i].classList.add('hide');
            }
        }
        var div = document.getElementById(id);
        if(div == null){
            div = document.createElement("div");
            div.id = id;
            holder.appendChild(div);        
        }
        else{
            div.classList.remove('hide');
        }
        if(destroy){
            div.innerHTML = "";
        }
        this.currentView = id;
        logger.log("Renderer.js : Main holder id : "+id+" rendered");
        return true;
    }

}