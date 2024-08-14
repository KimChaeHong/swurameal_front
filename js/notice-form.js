function uploadNoticeFormPage(noticeInfo) {
    $(".addButton button").remove();
    /*prettier-ignore*/
    const noticeFormHtml =
        /*html*/
        `
        <div class="notice-form d-flex flex-column">
            <div class="notice-title-box">
                <p>제목<span>*</span></p>
                <input type="text" value="${isDataCheck(noticeInfo?.title)}" class="notice-form-title" placeholder="제목을 입력해주세요.">
            </div>
            <div class="notice-content-box">
                <p>내용<span>*</span></p>
                <textarea class="notice-form-content" placeholder="내용을 입력해주세요.">${isDataCheck(noticeInfo?.description)}</textarea>
            </div>
            <div class="notice-form-buttons">
                <button >삭제</button>
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
    $("head").append(noticeFormCss);

    if (noticeInfo != undefined) {
        console.log($(".notice-form-buttons :nth-child(2)").text());
        $(".notice-form-buttons :nth-child(1)").css("display", "block");
        $(".notice-form-buttons :nth-child(2)").text("수정");
    } else {
        $(".notice-form-buttons :nth-child(2)").text("등록");
    }
}

function isDataCheck(infoData) {
    console.log(infoData);
    return infoData || "";
}
