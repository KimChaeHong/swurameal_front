/* prettier-ignore */
let noticeList= [{
    title : "[안내] 제주지역 주문 조기 마감 양해 안내",
    author : "관리자",
    registrationDate : "2024.08.14"
},{
    title : "[안내] 소비자 분쟁해결 기준 안내",
    author : "관리자",
    registrationDate : "2024.08.06"
},{
    title : "[안내] 오픈 이벤트 안내",
    author : "관리자",
    registrationDate : "2024.08.06"
},{
    title : "[안내] 제주지역 주문 조기 마감 양해 안내",
    author : "관리자",
    registrationDate : "2024.08.06"
}
]
noticePerPage = 10;
noticeCurPage = 1;

function renderNoticePage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * noticePerPage;
    let end = start + noticePerPage;
    let paginatedItems = data.slice(start, end);

    let itemHtml = "";
    for (const item of paginatedItems) {
        itemHtml =
            /*html*/
            `
            <div class="notice-info d-flex align-items-center">
                <div>${item.title}</div>
                <div>${item.author}</div>
                <div>${item.registrationDate}</div>
            </div>
            `;
        $(container).append(itemHtml);
    }
}

function setupPagination(data, container) {
    $(".pagination").html("");
    let pageCount = Math.ceil(data.length / noticePerPage);
    for (let i = 1; i <= pageCount; i++) {
        $(".pagination").append(`<button class="page-num">${i}</button>`);
    }

    $(".page-num").eq(0).addClass("active");

    $(".page-num").on("click", function () {
        $(".page-num").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        rendernoticePage(data, noticeCurPage, container);
    });
}

function uploadNoticePage() {
    uploadNoticeHtml =
        /*html*/
        `
        <div class="notice-box d-flex flex-column">
            <div class="row-header d-flex">
                <div>제목</div>
                <div>작성자</div>
                <div>등록일</div>
            </div>
            <div class="notice-list"></div>
            <div class="pagination"></div> 
        </div>  
        `;
    $("#board-container").empty();
    $("#board-container").append(uploadNoticeHtml);

    //페이지에 css 적용시키기
    const noticeCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/notice.css",
    });
    $("head").append(noticeCss);
    renderNoticePage(noticeList, noticeCurPage, ".notice-list");
    setupPagination(noticeList, ".notice-list");

    $(".notcie-info").on("click", function () {
        $.ajax({
            url: "../js/notice-detail.js",
            method: "GET",
            success: function (data) {
                uploadNoticeDetailPage();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: ", textStatus, errorThrown);
                alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
            },
        });
    });
}
