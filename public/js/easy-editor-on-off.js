(function( $ ) {

    $("#wp-admin-bar-enable-todos .ab-item, .on-off-light").click(function(e){
        e.preventDefault();
        $('body').toggleClass('easy-editor-on')

        //if body has class easy-editor-on
        if($('body').hasClass('easy-editor-on')){
            //change the text of the button
            $("#wp-admin-bar-enable-todos .ab-item").text('Disable Todos');
        }else{
            $("#wp-admin-bar-enable-todos .ab-item").text('Enable Todos');
        }
        console.log(e);
     });

     console.log($("#wp-admin-bar-enable-todos .ab-item"));

})( jQuery );
