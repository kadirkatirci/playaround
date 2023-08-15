$(document).ready(function () {
$('#example').dataTable( {
    ajax: {
      url: 'http://127.0.0.1:3000/js_xml-api-json/DataTables/test.xml',
      dataSrc: function ( json ) {
        for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
          json.data[i][0] = '<a href="/message/'+json.data[i][0]+'>View message</a>';
        }
        return json.data;
      }
    },
    columns: [
        // {
        //     data: 'dc.type'
        // }, {
        //     data: 'dc.title'
        // }, {
        //     data: 'dc.creator'
        // }, {
        //     data: 'dc.subject'
        // }, {
        //     data: 'dc.contributor'
       // }, 
        {
            data: 'dc.date'
        }
    ]
  }
  );

});