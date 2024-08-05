$(document).ready(function () {
    
    $(".review-writeable-box").on("click", function (e) {
        $(".review-written-page").css("display", "none");
        $(".review-writeable-page").css("display", "block");
    });

    $(".review-written-box").on("click", function (e) {
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
    });
});
