//define data
//   using async and await to fetch xml data.
let get_data = async () => {
    let url = "http://127.0.0.1:3000/js_xml-api-json/test.xml"; // the XML file.

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
    console.log(arr);
//define table
var table = new Tabulator("#example-table", {
    data:arr,
    autoColumns:true,
});
}


get_data();