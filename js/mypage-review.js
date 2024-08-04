$(document).ready(function () {
    console.log("ddd");
    $(".review-writeable").on("click", function (e) {
        console.log("aaaaaa");
        $(".review-written-page").css("display", "none");
        $(".review-writeable-page").css("display", "block");
    });

    $(".review-written").on("click", function (e) {
        console.log("sfasdf");
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
    });
});
