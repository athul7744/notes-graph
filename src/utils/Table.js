class SimpleTable {

    constructor(config) {
        this.holder = document.getElementById(config.holder);
        this.columns = (config.columns != undefined) ? config.columns : [];
        this.data = (config.data != undefined ) ? config.data : [];
    }

    generateTable() {
        this.table = document.querySelector("table");
        this.renderRows();
        this.renderTableHead();        
    }

    renderRows() {
        for (var obj of this.data) {
            var row = this.table.insertRow();
            for (var key of this.columns) {
                var cell = row.insertCell();
                var text = document.createTextNode(obj[key]);
                cell.appendChild(text);
            };
        }
    }

    renderTableHead() {
        var thead = this.table.createTHead();
        var th_row = thead.insertRow();
        for (var key of this.columns) {
            var th = document.createElement("th");
            var text = document.createTextNode(key);
            th.appendChild(text);
            th_row.appendChild(th);
        };
    }
}