$(document).ready(function() {
    $('.clickable').click(function() {
        var contentId = $(this).data('content');
        $('.dropdown-box').not('#' + contentId).slideUp();
        $('#' + contentId).slideToggle();
    });
});