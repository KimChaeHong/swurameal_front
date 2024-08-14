let isAdmin = { isAdmin: true };

/* prettier-ignore */
let noticeList= [{
    title : "[안내] 제주지역 주문 조기 마감 양해 안내",
    author : "관리자",
    description : `
    고객님 안녕하세요 수라밀 입니다
    
    서비스 오픈 이후에 최초 예상한 주문건수보다 매일 주문량이 초과하고 있습니다.
    배송 차량을 지속 늘리고 있음에도 불구하고 주문이 급증함에 따라,
    부득이 주문 조기 마감이 이어지고 있습니다.
    
    주문을 고대하셨을 고객님들께 너그러운 양해를 부탁드리며,
    원활한 쇼핑 경험을 위해 배성 차량 확보에 최선을 다해 준비하겠습니다.
    
    감사합니다.
    수라밀 드림.`,
    registrationDate : "2024.08.14"
},{
    title : "[안내] 소비자 분쟁해결 기준 안내",
    author : "관리자",
    description : "알아하쇼",
    registrationDate : "2024.08.06"
},{
    title : "[안내] 오픈 이벤트 안내",
    author : "관리자",
    description: "감사합니다. 이벤트는 구라입니다.",
    registrationDate : "2024.08.06"
},{
    title : "[안내] 8월 하루배송 휴무 일정 안내(2024.08.14 ~ 08.15)",
    author : "관리자",
    description : "힘듭니다 좀 쉴게요.",
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

function uploadNoticePage(flag) {
    // flag== true이면 관리자 페이지
    if (flag) {
        $(".addButton").append("<button>작성하기</button>");
        $(".addButton button").attr("data-flag", "notice");
    }

    uploadNoticeHtml =
        /*html*/
        `
        <div class="notice-box d-flex flex-column">
            <div class="notice-header d-flex">
                <div>제목</div>
                <div>작성자</div>
                <div>등록일</div>
            </div>
            <div class="notice-list"></div>
            <div class="pagination"></div> 
        </div>  
        `;
    $("#board-container").html(uploadNoticeHtml);

    $(".page-upload").html(uploadNoticeHtml);

    //페이지에 css 적용시키기
    const noticeCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/notice.css",
    });
    $("head").append(noticeCss);
    renderNoticePage(noticeList, noticeCurPage, ".notice-list");
    setupPagination(noticeList, ".notice-list");

    $(".notice-info").on("click", function () {
        /*prettier-ignore*/
        noticeTitle = $(this).text().trim().match(/^[^\n]+/)[0];
        const noticeInfo = noticeList.filter((item) => item.title == noticeTitle);

        $.ajax({
            url: "../js/notice-detail.js",
            method: "GET",
            success: function (data) {
                // isAdmin이 true면 관리자 페이지 false면 고객센터
                if (flag) {
                    uploadNoticeDetailPage(noticeInfo[0], true);
                } else {
                    uploadNoticeDetailPage(noticeInfo[0], false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: ", textStatus, errorThrown);
                alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
            },
        });
    });

    $(".addButton button").on("click", function () {
        $.ajax({
            url: "../js/notice-form.js",
            method: "GET",
            success: function (data) {
                uploadNoticeFormPage();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: ", textStatus, errorThrown);
                alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
            },
        });
    });
}
