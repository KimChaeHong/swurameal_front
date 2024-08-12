async function loadJSON() {
    try {
        // .getJSON를 사용하여 JSON 파일을 가져옵니다.
        let response = await $.getJSON("../src/json/goods.json");
        return response[0];
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}
let goodsCurrentPage = 1;
const goodsPerPage = 10;

function renderGoodsPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * goodsPerPage;
    let end = start + goodsPerPage;
    let paginatedItems = data.slice(start, end);

    let goodsListHtml = "";
    for (const item of paginatedItems) {
        console.log(item.mainImg);
        goodsListHtml =
            /*html*/
            `
            <div class="goods-info d-flex align-items-center">
                <i class="bi bi-check-square"></i>
                <p>${item.goodsId}</p>
                <img src="${item.mainImg}"/>
                <p>${item.goodsName}</p>
                <p>${item.category}</p>
                <p>${item.price}</p>
                <p>${item.stockStatus}</p>
                <p>${item.status}</p>
                <div class="d-flex flex-column">
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>
            `;
        $(container).append(goodsListHtml);
    }
}
function setupPagination(data, container) {
    $(".pagination").html("");
    let pageCount = Math.ceil(data.length / goodsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        $(".pagination").append(`<button class="page-num">${i}</button>`);
    }

    $(".page-num").eq(0).addClass("active");

    $(".page-num").on("click", function () {
        $(".page-num").removeClass("active");
        $(this).addClass("active");
        goodsCurrentPage = parseInt($(this).text());
        renderGoodsPage(data, goodsCurrentPage, container);
    });
}

async function uploadGoodsPage() {
    //기본 틀이 되는 html
    const GoodsContent =
        /*html*/
        `
            <div class="d-flex flex-column">
                <div class="row-header">
                    <i class="bi bi-check-square"></i>
                    <div>ID</div>
                    <div>이미지</div>
                    <div>상품명</div>
                    <div>카테고리</div>
                    <div>가격</div>
                    <div>재고</div>
                    <div>상태</div>
                    <div>선택</div>
                </div>
                <div class="product-list"></div>
                <div class="pagination"></div> 
            </div>
        `;
    //page-upload할 공간에 집어 넣는 코드(임시로 마이페이지에 구현)
    $(".page-upload").html(GoodsContent);

    //페이지에 css 적용시키기
    const goodsCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/goods.css",
    });
    $("head").append(goodsCss);
    // JSON 데이터를 가져오는 함수를 호출합니다.
    // await를 사용하여 Promise가 처리될 때까지 기다린 후, 접근합니다.
    const goods = await loadJSON();
    renderGoodsPage(goods, currentPage, $(".product-list"));
    setupPagination(goods, $(".product-list"));
}
