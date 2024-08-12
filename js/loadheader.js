$(document).ready(function() {
    // header.html을 로드
    $("#header").load("header.html", function() {
        // header.html 로드 후 index.js를 실행
        $.getScript("./js/index.js")
        .done(function() {
            console.log("index.js successfully loaded.");
        })
        .fail(function() {
            console.log("An error occurred while loading index.js.");
        });
    });
});
