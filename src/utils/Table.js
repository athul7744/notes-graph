class SimpleTable {

    /**
     * @constructor
     * @param {Object} config Table Config 
     */
    constructor(config) {
        this.holder = document.getElementById(config.holder);
        this.columns = (config.columns != undefined) ? config.columns : [];
        this.data = (config.data != undefined ) ? config.data : [];
    }

    /**
     * Generates table object from config
     * @returns null
     */
    generateTable() {
        this.table = document.createElement("table");
        this.renderRows();
        this.renderTableHead();        
        this.holder.innerHTML = this.table.outerHTML;
    }

    /**
     * Render the table rows
     * @returns null 
     */
    renderRows() {
        for (var obj of this.data) {
            var row = this.table.insertRow();
            for (var key of this.columns) {
                var cell = row.insertCell();
                var text = document.createTextNode(obj[key.id]);
                cell.appendChild(text);
            };
        }
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
    }
}