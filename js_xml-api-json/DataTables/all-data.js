const get_data = async () => {
    const baseUrl = "https://acikerisim.erbakan.edu.tr/oai/request?verb=ListRecords";
    let resumptionToken = "oai_dc////100";
    let completeListSize = 0;
    let data = [];

    while (resumptionToken) {
        const url = `${baseUrl}&resumptionToken=${encodeURIComponent(resumptionToken)}`;
        const response = await fetch(url);
        const xmlData = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            removeNSPrefix: true,
            trimValues: true,
            parseTagValue: true
        });
        const jsonObj = parser.parse(xmlData);

        const resumptionTokenInfo = jsonObj['OAI-PMH']?.ListRecords?.resumptionToken;
        if (!resumptionTokenInfo) {
            break; // Exit the loop if resumptionTokenInfo is undefined
        }

        completeListSize = parseInt(resumptionTokenInfo['@_completeListSize'], 10);
        resumptionToken = resumptionTokenInfo['#text'];

        const records = jsonObj['OAI-PMH']['ListRecords']['record'];
        if (!Array.isArray(records)) {
            data.push(records.metadata);
        } else {
            data = data.concat(records.map(record => record.metadata));
        }
    }
    return data;

};

const initializeDataTable = (data) => {
    console.log(data);
    $(document).ready(function () {
        $('#example').DataTable({
            data: data,
            columns: [
                { data: 'dc.type' },
                { data: 'dc.title' },
                { data: 'dc.creator' },
                { data: 'dc.subject' },
                { data: 'dc.contributor' },
                { data: 'dc.relation' }
            ]
        });
    });
};

(async () => {
    const data = await get_data();
    initializeDataTable(data);
})();