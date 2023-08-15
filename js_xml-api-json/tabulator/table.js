function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml
                    .attributes
                    .item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml
                .childNodes
                .item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;

};
function abc(newData) {
let url = "http://127.0.0.1:3000/js_xml-api-json/basic/test.xml";
fetch(url)
    .then(response => response.text())
    .then(xmlStr => {
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(xmlStr, 'application/xml');
        const jsonData = xmlToJson(xmlData);
        newData = jsonData['OAI-PMH']['ListRecords'];
        console.log(newData);
    })
    .catch(error => console.error('Error:', error));
//define table
var table = new Tabulator("#example-table", {
    data: newData.record,
    autoColumns: true
});
}
abc();