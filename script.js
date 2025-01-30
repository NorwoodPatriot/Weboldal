function rearrangeTable() {
    const table = document.querySelector("table");
    const originalRows = Array.from(table.querySelectorAll("tr"));

    table.innerHTML = "";

    if (window.innerWidth <= 1300) {

        originalRows.forEach(row => {
            const cells = Array.from(row.querySelectorAll("td"));
            cells.forEach(cell => {
                const newRow = document.createElement("tr");
                newRow.appendChild(cell);
                table.appendChild(newRow);
            });
        });
    } else {
        const newRow = document.createElement("tr");
        originalRows.forEach(row => {
            row.querySelectorAll("td").forEach(cell => {
                newRow.appendChild(cell);
            });
        });
        table.appendChild(newRow);
    }
}

window.addEventListener("resize", rearrangeTable);
window.addEventListener("load", rearrangeTable);