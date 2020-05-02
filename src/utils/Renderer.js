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
    }

    /**
     * Function to go to path
     * @param {String} path name of path
     * @returns null
     */
    goTo(path) {
        if(this.#routes[path] != undefined){
            this.#routes[path]();
        }
    }
    /**
     * Function to render main holder
     * @param {String} id ID attribute of holder to be rendered
     */
    renderMainHolder(id) {
        var holder = document.getElementById("center-panel");
        holder.innerHTML = "";
        var div = document.createElement("div");
        div.id = id;
        holder.appendChild(div);        
    }

}