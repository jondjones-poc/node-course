(function(){
    const endpoint = 'https://hidden-spire-53357.herokuapp.com/events';
    const debug = true;
    var responseData = [];

    //Utilities
    function logger(message,object) {
        if(debug) {
            console.log(message,object);
        }
    }    

    $(function(){

        /*$('body').on('click', '.viewInfo', function(e) {
            console.log($(this));

            _.find(responseData, function (o) { return o.key == ; });
        });*/
        
        fetchData(function(data) {                   
            logger('Fetch Data',data);            

            var table = $('#table').DataTable( {
                data: data,
                columns: getColumns()
            });

            // Apply the search
            table.columns().every( function () {
                var that = this;
        
                $( 'input', this.footer() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that
                            .search( this.value )
                            .draw();
                    }
                } );
            } );

            $('#table tbody').on('click', 'tr', function () {
                var data = table.row( this ).data();
                console.log(data);      
                
                var tr = $(this).closest('tr');
                var row = table.row( tr );
         
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );

            /*$('#example tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );
         
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );*/
        });
    });

    function getColumns() {
        return [
            { data: 'customTimestamp', defaultContent: 'N/A' },
            { data: 'cart_Id', defaultContent: 'N/A' },
            { data: 'user_type', defaultContent: 'N/A' },          
            { data: 'user_email', defaultContent: 'N/A' },
            { data: 'user_Id', defaultContent: 'N/A' },
            { data: 'user_Id', defaultContent: 'N/A' },            
        ];
    }

    function showCartData() {

    }

    function format ( d ) {
        // `d` is the original data object for the row

        var cartItemData = '';
       logger('testing output',d);

        if(typeof d['cart_items'] !== 'undefined'  && d.cart_items.length > 0) {
            for(var i=0; i<d.cart_items.length; i++) {
                var cartItem = d.cart_items[i];
                logger('cart item data',cartItem);
                cartItemData += cartItem.cart_item_brand+' '+(cartItem.cart_item_colour ? cartItem.cart_item_colour : '')+ ' '+cartItem.cart_item_name+' '+ d.nav_currency+cartItem.cart_item_discount_ati+'<br />';
            }            
        }

        if(cartItemData == '') {
            cartItemData = 'No Cart Data Available';
        }
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
                '<td>Cart Data:</td>'+
                '<td>'+cartItemData+'</td>'+
            '</tr>'+
        '</table>';
    }

    function fetchData(callback) {
        $.get(endpoint, function(data){        
            responseData = data;
            return callback(data);
        }).fail(function() {
            alert( "Error fetching remote resources, please try again" );            
        });
    }
})();