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

    // Now, add the newly created table to a container.

    console.log(arr);
    new DataTable('#example', {
        ajax: 'b.txt',
        columns: [
            { data: 'name' },
            { data: 'hr.position' },
            { data: 'contact.0' },
            { data: 'contact.1' },
            { data: 'hr.start_date' },
            { data: 'hr.salary' }
        ],
        processing: true
    });
}

get_data();
