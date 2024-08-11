$(document).ready(function() {
    $('h5').on('click', function() {
        var target = $(this).text();
        $('#title').text(target);

        $('h5').removeClass('active');
        $(this).addClass('active');
         
    });
});