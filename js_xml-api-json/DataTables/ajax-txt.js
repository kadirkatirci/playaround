$(document).ready(function () {
    $('#example').DataTable({
        ajax: 'all-data.txt',
        columns: [
            {
                data: 'dc.type'
            }, {
                data: 'dc.title'
            }, {
                data: 'dc.creator'
            }, {
                data: 'dc.subject'
            }, {
                data: 'dc.contributor'
            }, {
                data: 'dc.date'
            }
        ],
        columnDefs: [{
            "defaultContent": "bilgi yok",
            "targets": "_all"
          }],
        processing: true,
        paging: true, // Enable pagination
        pageLength: 10, // Number of records per page
        lengthMenu: [10, 25, 50, 100], // Display options for records per page
        deferRender: true, // Improve performance by only rendering visible data
        scrollY:        400,
        scroller: true

    });
});