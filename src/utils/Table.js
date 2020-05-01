class SimpleTable {

    constructor(config) {
        this.holder = config.holder;
        this.columns = config.columns;
        this.data = config.data;
    }

    generateTable() {
        this.table = document.querySelector("table");
        this.renderRow();
        this.renderTableHead();        
    }

    renderRow() {
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