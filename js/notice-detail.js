function uploadNoticeDetailPage(noticeInfo) {
    console.log(noticeInfo.description);
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

    $("#board-container").empty();
    $("#board-container").append(noticeDetailPage);

    //페이지에 css 적용시키기
    const noticedetailCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/notice-detail.css",
    });
    $("head").append(noticedetailCss);
}
