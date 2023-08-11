$(document).ready(function () {
    $('#example').DataTable({
        ajax: 'all-data.json',
        columns: [
            {
                data: 'dc.type'
            }, {
                data: 'dc.type'
            }, {
                data: 'dc.type'
            }, {
                data: 'dc.type'
            }, {
                data: 'dc.type'
            }, {
                data: 'dc.type'
            }
        ],
        processing: true
    });
});