$(document).ready(function () {
    $('#example').DataTable({
        ajax: 'b.txt',
        columns: [
            {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.type'
            }, {
                data: 'metadata.dc.type'
            }
        ],
        processing: true
    });
});