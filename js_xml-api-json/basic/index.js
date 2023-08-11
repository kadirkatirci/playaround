//   using async and await to fetch xml data.
let get_data = async () => {
    let url = "https://acikerisim.erbakan.edu.tr/oai/request?verb=ListRecords&resumptionToken=oai_dc////400"; // the XML file.

    let response = await fetch(url);
    const xmlData = await response
        .text()
        .then((str) => {
            return new DOMParser().parseFromString(str, 'application/xml');
        });

    createTable(xmlData); // convert data to table.
}

let createTable = (xml) => {
    
    // the xml tag name
    let ucBooks = xml.getElementsByTagName("oai_dc:dc");

    let arr = [];

    for (let i = 0; i < ucBooks.length; i++) {
        // Push XML attributes into the array.
        arr.push(
            {Code: ucBooks[i].getElementsByTagName("dc:title"), Name: ucBooks[i].getElementsByTagName("dc:creator"), Category: ucBooks[i].getElementsByTagName("dc:type"), Price: ucBooks[i].getElementsByTagName("dc:language")}
        );
    }

    let col = [];
    for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    
    // Create a table.
    const table = document.createElement("table");

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1); // table row.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement('th'); // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // add data to the table as rows.
    setTimeout(function () {

        for (let i = 0; i < arr.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = arr[i][col[j]][0]
                    .childNodes[0]
                    .nodeValue;
            }
        }
    }, 0);

    // Now, add the newly created table to a container.
    const result = document.getElementById('showData');
    result.innerHTML = "";
    result.appendChild(table);
    console.log(arr);

}

get_data();