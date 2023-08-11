//   using async and await to fetch xml data.
let get_data = async () => {
    let url = "https://acikerisim.erbakan.edu.tr/oai/request?verb=ListRecords&resumptionToken" +
            "=oai_dc////100"; // the XML file.

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
    const items = xmlData.getElementsByTagName('oai_dc:dc');

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
    titleCell.textContent = item.querySelector("title").textContent;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = item.querySelector("type").textContent;
    row.appendChild(descriptionCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = item.querySelector("identifier").textContent;
    row.appendChild(dateCell);

    table.appendChild(row);
}

    const tableContainer = document.getElementById('table-container'); // Replace with your container's ID
    tableContainer.appendChild(table);

    console.log(items);

}

get_data(); // Call the function

// let createTable = (xml) => {      the xml tag name     let ucBooks =
// xml.getElementsByTagName('List');     let arr = [];     for (let i = 0; i <
// ucBooks.length; i++) {          Push XML attributes into the array. arr.push(
// {Code: ucBooks[i].getElementsByTagName('code'), Name:
// ucBooks[i].getElementsByTagName('BookName'), Category:
// ucBooks[i].getElementsByTagName('Category'), Price:
// ucBooks[i].getElementsByTagName('Price')}         );     }     let col = [];
// for (let i = 0; i < arr.length; i++) {         for (let key in arr[i]) { if
// (col.indexOf(key) === -1) {                 col.push(key);             } }
// }      Create a table.     const table = document.createElement("table");
// Create table header row using the extracted headers above.     let tr =
// table.insertRow(-1);  table row. for (let i = 0; i < col.length; i++) {
// let th = document.createElement('th');  table header.         th.innerHTML =
// col[i]; tr.appendChild(th);     }      add data to the table as rows.     for
// (let i
// = 0; i < arr.length; i++) {         tr = table.insertRow(-1);         for
// (let j = 0; j < col.length; j++) {             let tabCell =
// tr.insertCell(-1);             tabCell.innerHTML = arr[i][col[j]][0]
// .childNodes[0]                 .nodeValue;         }     }      Now, add the
// newly created table to a container.     const result =
// document.getElementById('showData');     result.innerHTML = "";
// result.appendChild(table); }