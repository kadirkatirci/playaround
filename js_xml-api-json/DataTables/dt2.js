let get_data = async () => {
    let url = "https://acikerisim.erbakan.edu.tr/oai/request?verb=ListRecords&resumptionToken" +
            "=oai_dc////200"; // the XML file.

    let response = await fetch(url);
    const xmlData = await response
        .text();
  
    createTable(xmlData); // convert data to table.
}

let createTable = (xmlData) => {
    const options = {
        ignoreAttributes: true,
        removeNSPrefix: true,
        trimValues: true,
        parseTagValue: true
    };

    const parser = new XMLParser(options);
    let jsonObj = parser.parse(xmlData);

    let newData = jsonObj['OAI-PMH']['ListRecords']['record'];
    console.log(newData);

$(document).ready(function () {
    $('#example').DataTable({
        data: newData,
        columns: [
            {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.title'
            }, {
                data: 'metadata.dc.creator'
            }, {
                data: 'metadata.dc.subject'
            }, {
                data: 'metadata.dc.contributor'
            }, {
                data: 'metadata.dc.relation'
            }
        ]
    });
});
}

get_data();
