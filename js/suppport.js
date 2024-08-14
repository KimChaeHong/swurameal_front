$(document).ready(function () {
    $("#nav-container").load("../html/nav.html");
    $(".sns-link > a:nth-of-type(1) img").attr("src", "../src/images/ico_instagram.png");
    $(".sns-link > a:nth-of-type(2) img").attr("src", "../src/images/ico_fb.png");
    $(".sns-link > a:nth-of-type(3) img").attr("src", "../src/images/ico_blog.png");
    $(".sns-link > a:nth-of-type(4) img").attr("src", "../src/images/ico_naverpost.png");
    $(".sns-link > a:nth-of-type(5) img").attr("src", "../src/images/ico_youtube.png");

    $("h5").on("click", function () { // side-category 클릭 시 발생하는 페이지 이동
        var target = $(this).text();
        $("#title").text(target);

        $("h5").removeClass("active");
        $(this).addClass("active");

        var jsFile = $(this).data("js");

        $.ajax({
            url: jsFile,
            dataType: "script",
            method: "GET",
            success: function (data) {
                if (target === "공지사항") uploadNoticePage();
                else if (target === "자주묻는질문") uploadFaqPage();
                else if (target === "문의") uploadMyQnaPage();
            },
        });
    });

    $(document).on("click", ".ajax-btn", function () { // 문의하기 버튼, 등록버튼 클릭시 발생하는 페이지 이동
        var jsFile = $(this).data("js");
        var target = $(this).text();

        $.ajax({
            url: jsFile,
            dataType: "script",
            method: "GET",
            success: function (data) {
                if(target=="문의하기") myqnaFormPage();
                if(target=="등록") uploadMyQnaPage();
            },
        });
    });
});
