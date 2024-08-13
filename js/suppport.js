$(document).ready(function () {
    $("h5").on("click", function () {
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

    $(document).on("click", ".ajax-btn", function () {
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
