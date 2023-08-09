//   using async and await to fetch xml data.
let get_data = async () => {
    let url = "test.xml"; // the XML file.

    let response = await fetch(url);
    const xmlData = await response
        .text()
        .then((str) => {
            return new DOMParser().parseFromString(str, 'application/xml');
        });

    createTable(xmlData); // convert data to table.
}

function createTable(xmlData) {
    // Access specific elements in the DOM representation
    const items = xmlData.getElementsByTagName('item');

    // Create an HTML table element
    const table = document.createElement('table');

    // Create table header row
    const headerRow = document.createElement('tr');
    const headers = ['Title', 'Description', 'Date']; // Example headers
    for (const headerText of headers) {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    // Loop through items in the DOM and create table rows
    for (const item of items) {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = item.querySelector('title').textContent;
        row.appendChild(titleCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = item.querySelector('description').textContent;
        row.appendChild(descriptionCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = item.querySelector('date').textContent;
        row.appendChild(dateCell);

        table.appendChild(row);
    }

    // Append the table to a container element in the HTML document
    const tableContainer = document.getElementById('table-container'); // Replace with your container's ID
    tableContainer.appendChild(table);
}
