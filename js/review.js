// let product = [
//     { img: "../src/images/111.png", title: "떡볶이", orderNumber: "123123123", orderDay: "2024년 08월 06일", price: "12,300 원" },
//     { img: "../src/images/111.png", title: "파스타", orderNumber: "222222222", orderDay: "2024년 08월 05일", price: "7,300 원" },
// ];
// /*prettier-ignore*/
// let review = [
//     {title: "떡볶이", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
//     {title: "파스타", wirttenDay: "24.08.06", auther:"OOO",
//         description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"}
// ]

function uploadRocalStorage() {
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("review", JSON.stringify(review));
}

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
                    <p><strong>주문 번호</strong>: ${item.orderNumber}</p>
                    <p><strong>주문 날짜</strong>: ${item.orderDay}</p>
                    <p><strong>상품명</strong>: ${item.title}</p>
                    <p><strong>가격</strong>: ${item.price}</p>
                    </div>
                </div>
                <button>작성하기</button>
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
                    <button>수정하기</button>
                </div>
                <div class="review-description">
                    <p class="description">${r.description}</p>
                </div>
            </div>`;
        $(".review-written-page").append(reviewHtml);
    }
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

const itemsPerPage = 5;
let currentPage = 1;

$(document).ready(function () {
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
    </div>`;

    const reviewCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/review.css",
    });
    $("head").append(reviewCss);
    $(".page-upload").html(reviewContent);

    // uploadRocalStorage();

    changeColor(".review-written-box", ".review-writeable-box");
    const productdata = JSON.parse(localStorage.getItem("product"));
    const reviewdata = JSON.parse(localStorage.getItem("review"));
    renderProductPage(productdata, currentPage, ".review-writeable-page");
    setupPagination(productdata, ".review-writeable-page", true);

    $(".review-writeable-box").on("click", function (e) {
        changeColor(".review-written-box", ".review-writeable-box");
        $(".review-writeable-page").html("");
        $(".review-written-page").css("display", "none");
        $(".review-writeable-page").css("display", "block");
        renderProductPage(productdata, currentPage, ".review-writeable-page");
        setupPagination(productdata, ".review-writeable-page", true);
    });

    $(".review-written-box").on("click", function (e) {
        changeColor(".review-writeable-box", ".review-written-box");
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
        renderReviewPage(reviewdata, currentPage, ".review-written-page");
        setupPagination(reviewdata, ".review-written-page", false);
    });
});
