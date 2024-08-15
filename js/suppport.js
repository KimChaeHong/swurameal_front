$(document).ready(function () {
    uploadNoticePage(); //페이지가 로드될 때 초기화면 공지사항 페이지

    // side-category 클릭 시 발생하는 페이지 이동 이벤트
    $("h5").on("click", function () {
        var target = $(this).text();
        $("#title").text(target);

        $("h5").removeClass("active");
        $(this).addClass("active");

        var jsFile = $(this).data("js");

        //해당 js 파일을 로드
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

    // "문의하기" 버튼이나 "등록" 버튼을 클릭했을 때 발생하는 이벤트
    $(document).on("click", ".ajax-btn", function () {
        var jsFile = $(this).data("js");
        var target = $(this).text();

         // 해당 JavaScript 파일을 로드
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
