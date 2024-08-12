function changeColor(nonClickDiv, clickedDiv) {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    $(nonClickDiv).css({
        color: darkgrayColor,
        "font-weight": "normal",
    });
    $(clickedDiv).css({
        color: themeColor,
        "font-weight": "bold",
    });
}

function renderProductPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);

    for (const item of paginatedItems) {
        const itemHtml =
            /*html*/
            `<div class="product-box" >
                <div class="product-details d-flex" >
                    <img src="${item.img}" class="product-image" />
                    <div class = "d-flex flex-column product-info">
                        <p><strong>주문 번호</strong> ${item.orderNumber}</p>
                        <p><strong>주문 날짜</strong> ${item.orderDay}</p>
                        <p><strong>상품명</strong> <span>${item.title}</span></p>
                        <p><strong>가격</strong> ${item.price}</p>
                    </div>
                </div>
                <button class="insert-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >작성하기</button>
            </div>`;
        $(container).append(itemHtml);
    }
}

function renderReviewPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);

    for (const r of paginatedItems) {
        const reviewHtml =
            /*html*/
            `<div class="review-box d-flex flex-column" >
                <div class="review-top" >
                    <div>
                        <p class="title">${r.title}</p>
                        <p class="sub-title">${r.auther} | ${r.wirttenDay}</p>
                    </div>
                    <button class="update-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">수정하기</button>
                </div>
                <div class="review-description">
                    <p class="description">${r.description}</p>
                </div>
            </div>
            `;
        $(".review-written-page").append(reviewHtml);
    }
}

function clickModalButton(reviewData, buttonText, container) {
    let reviewInfo = "";
    let title = "";
    if (buttonText == "수정하기") {
        title = container.closest(".review-top").find("div > p").eq(0).text();
        reviewInfo = reviewData.filter((data) => title == data.title);
        $(".modal-review textarea").val(reviewInfo[0].description);
        $(".modal-product-detail :nth-of-type(2) > span").text(reviewInfo[0].wirttenDay);
    } else {
        title = container.closest(".product-box").find("div > div > :nth-of-type(3) > span").text();
        reviewInfo = reviewData.filter((data) => title == data.title);
        $(".modal-review textarea").val("");
        const today = new Date();
        const todayFormat = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
        $(".modal-product-detail :nth-of-type(2) > span").text(todayFormat);
    }
    $(".modal-product-img img").attr("src", reviewInfo[0].img);
    $(".review-update").text(buttonText);
    $(".modal-product-detail :nth-of-type(1) > span").text(title);
}

function setupPagination(data, container, isProduct) {
    $(".pagination").html("");
    let pageCount = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        $(".pagination").append(`<button class="page-num">${i}</button>`);
    }

    $(".page-num").eq(0).addClass("active");

    $(".page-num").on("click", function () {
        $(".page-num").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        isProduct && renderProductPage(data, currentPage, container);
        isProduct || renderReviewPage(data, currentPage, container);
    });
}
function modalPage() {
    /*prettier-ignore*/
    let html = /*html*/
    `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title text-center w-100" >상품후기 수정</p>
                </div>
                <div class="modal-body">
                    <div class="d-flex">
                        <div class="modal-product-img d-flex" >
                            <p>구매<br/>상품</p>
                            <img src=""/>
                        </div>
                        <div class="modal-product-detail d-flex flex-column flex-grow-1">
                            <p><strong>상품명</strong> <span></span></p>
                            <p><strong>작성일</strong> <span></span></p>
                        </div>
                    </div>
                    <div class="modal-review d-flex" style="border : 1px ridge red">
                        <p>내용</p>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="review-close" data-bs-dismiss="modal">취소</button>
                    <button class="review-update">수정하기</button>
                </div>
            </div>
        </div>
    </div>`;
    return html;
}

function uploadReviewPage() {
    const modalHtml = modalPage();
    const reviewContent =
        /*html*/
        `<div class="review-container" >
            <div class="review-choice-box">
                <div class="review-writeable-box">
                    <p class="review-writeable">작성 가능한 리뷰</p>
                </div>
                <div class="review-written-box">
                    <p class="review-written">작성한 리뷰</p>
                </div>
            </div>
            <div class="review-writeable-page"></div>
            <div class="review-written-page"></div>
            <div class="pagination"></div> 
        </div>
        `;

    const reviewCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/review.css",
    });
    $("head").append(reviewCss);
    $(".page-upload").html(reviewContent);
    $(".container").append(modalHtml);

    changeColor(".review-written-box", ".review-writeable-box");
    const productdata = JSON.parse(localStorage.getItem("writeableList"));
    const reviewdata = JSON.parse(localStorage.getItem("writtenList"));
    renderProductPage(productdata, currentPage, ".review-writeable-page");
    setupPagination(productdata, ".review-writeable-page", true);

    $(".review-writeable-box").on("click", function (e) {
        currentPage = 1;
        changeColor(".review-written-box", ".review-writeable-box");
        $(".review-writeable-page").html("");
        $(".review-written-page").css("display", "none");
        $(".review-writeable-page").css("display", "block");
        renderProductPage(productdata, currentPage, ".review-writeable-page");
        setupPagination(productdata, ".review-writeable-page", true);
    });

    $(".review-written-box").on("click", function (e) {
        currentPage = 1;
        changeColor(".review-writeable-box", ".review-written-box");
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
        renderReviewPage(reviewdata, currentPage, ".review-written-page");
        setupPagination(reviewdata, ".review-written-page", false);
    });

    $(document).on("click", ".update-button", function () {
        clickModalButton(reviewdata, "수정하기", $(this));
    });

    $(document).on("click", ".insert-button", function () {
        clickModalButton(productdata, "작성하기", $(this));
    });
}
