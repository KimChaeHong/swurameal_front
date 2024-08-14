function uploadNoticeFormPage(noticeInfo) {
    const noticeFormHtml =
        /*html*/
        `
    <div class="notice-form d-flex flex-column">
        <div>
            <p>제목<span>*</span></p>
            <div class="notice-form-title"></div>
        </div>
        <div>
            <p>내용<span>*</span></p>
            <div class="notice-form-content"></div>
        </div>
        <div class="notice-form-buttons">
            <button>삭제</button>
            <button>등록</button>
        </div>
    </div>
    `;
    $(".page-upload").html(noticeFormHtml);

    const noticeFormCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/notice-form.css",
    });
    $(head).append(noticeFormCss);
}
