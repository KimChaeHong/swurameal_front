$(document).ready(function() {
    $('a').on('click', function(e){
        e.preventDefault();
        let url = $(this).attr('href');

        $.ajax({
            url:url,
            method: 'GET',
            success: function(data){
                $('.page-upload').html(data);
            }
        })
    })
})