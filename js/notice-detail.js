function uploadNoticeDetailPage(noticeInfo, isAdmin) {
    $(".addButton button").remove();
    const updateButton =
        /*html*/
        `
        <div class="update-button d-flex flex-grow-1 justify-content-end">
            <button>수정</button> <span>|</span>
            <button>삭제</button>
        </div>
        `;

    noticeDetailPage =
        /*html*/
        `
        <div class="detail-box d-flex flex-column">
            <div class="detail-title d-flex align-items-center">
                <div>제목</div>
                <div class="flex-grow-1 ">${noticeInfo.title}</div>
            </div>
            <div class="detail-author d-flex">
                <div>작성자</div>
                <div class="flex-grow-1">${noticeInfo.author}</div>
            </div>
            <div class="detail-date d-flex">
                <div>등록일</div>
                <div class="flex-grow-1">${noticeInfo.registrationDate}</div>
            </div>
            <div class="detail-description">${noticeInfo.description}</div>
        </div>
        `;

    $("#board-container").html(noticeDetailPage);
    $(".page-upload").html(noticeDetailPage);

    if (isAdmin) {
        $(".detail-box").append(updateButton);
    }
    //페이지에 css 적용시키기
    const noticedetailCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/notice-detail.css",
    });
    $("head").append(noticedetailCss);
}
