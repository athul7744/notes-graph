class SimpleTable {

    /**
     * @constructor
     * @param {Object} config Table Config 
     */
    constructor(config) {
        this.holder = document.getElementById(config.holder);
        this.columns = (config.columns != undefined) ? config.columns : [];
        this.data = (config.data != undefined ) ? config.data : [];
        this.headerText = (config.header != undefined) ? config.header : "SimpleTable";
        this.onclick = (config.onclick != undefined) ? config.onclick : () => {};
        logger.log("Table.js : Table object initialized");
    }

    /**
     * Generates table object from config
     * @returns null
     */
    generateTable() {
        this.header = document.createElement("div");
        this.header.classList.add('table-header');
        this.header.innerHTML = "<span>"+this.headerText+"</span>";
        this.table = document.createElement("table");
        this.table.classList.add('table-style');
        this.renderRows();
        this.renderTableHead();
        this.holder.classList.add('notes-table');        
        this.holder.appendChild(this.header);
        this.holder.appendChild(this.table);
        this.attachEvents();
        logger.log("Table.js : Table generated");
    }

    /**
     * Render the table rows
     * @returns null 
     */
    renderRows() {
        for (var obj of this.data) {
            var row = this.table.insertRow();
            row.classList.add('table-row');
            for (var key of this.columns) {
                var cell = row.insertCell();
                var text = document.createTextNode(obj[key.id]);
                cell.appendChild(text);
            };
        }
        logger.log("Table.js : Table rows rendered");
    }

    /**
     * Render the table head
     * @returns null
     */
    renderTableHead() {
        var thead = this.table.createTHead();
        var th_row = thead.insertRow();
        for (var key of this.columns) {
            var th = document.createElement("th");
            var text = document.createTextNode(key.name);
            th.appendChild(text);
            th_row.appendChild(th);
        };
        logger.log("Table.js : Table head rendered");
    }

    /**
     * Function to attach row click events
     * @returns null
     */
    attachEvents() {
        for(var i=1; i<this.table.rows.length; i++){
            var title = this.table.rows[i].cells[0];
            title.onclick = this.createCallback(this.data[i-1],this.onclick);
        }
        logger.log("Table.js : Table events attached");
    }

    /**
     * Function to create scoped callback for every row
     * @param {Note} data 
     * @param {Function} callback 
     */
    createCallback(data,callback) {
        return function(e) {
            callback(e,data)
        };
    }
}