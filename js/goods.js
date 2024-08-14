async function loadJSON() {
    try {
        // .getJSON를 사용하여 JSON 파일을 가져옵니다.
        let response = await $.getJSON("../src/json/goods.json");
        return response[0];
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function renderGoodsPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * goodsPerPage;
    let end = start + goodsPerPage;
    let paginatedItems = data.slice(start, end);

    let goodsListHtml = "";
    for (const item of paginatedItems) {
        goodsListHtml =
            /*html*/
            `
        <div class="goods-info d-flex align-items-center">
            <i class="bi bi-check-square" data-select="1"></i>
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
    if ($(".addButton > button").length == 0) {
        $(".addButton").append("<button>상품등록</button>");
        $(".addButton button").attr("data-flag", "goods");
    }
    //기본 틀이 되는 html
    const goodsContent =
        /*html*/
        `
            <div class="goods-box d-flex flex-column">
                <div class="row-header">
                    <i class="bi bi-check-square" data-flag="1"></i>
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
                <button class="select-delete">선택상품삭제</button>
                <div class="pagination"></div> 
            </div>
        `;
    //page-upload할 공간에 집어 넣는 코드(임시로 마이페이지에 구현)
    $(".page-upload").html(goodsContent);

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

    // 선택버튼 이벤트 발생
    $(".goods-box").on("click", ".row-header > i", function () {
        if ($(".row-header i ").attr("data-flag") == 1) {
            $(".row-header > i").attr("data-flag", 2);
            $(".goods-info > i").attr({
                "data-select": 2,
                class: "bi bi-check-square-fill",
            });
        } else {
            $(".row-header i").attr("data-flag", 1);
            $(".goods-info i").attr({
                "data-select": 1,
                class: "bi bi-check-square",
            });
        }
    });

    $(".page-upload").on("click", ".goods-info > i", function () {
        if ($(this).attr("data-select") == 1)
            $(this).attr({
                class: "bi bi-check-square-fill",
                "data-select": 2,
            });
        else if ($(this).attr("data-select") == 2) {
            $(this).attr({
                class: "bi bi-check-square",
                "data-select": 1,
            });
        }
    });

    $(".title-box").on("click", ".addButton button", function () {
        if ($(".addButton button").attr("data-flag") == "goods") {
            $.ajax({
                url: "../js/goods-form.js",
                method: "GET",
                success: function (data) {
                    uploadGoodsFormPage();
                    $(".goods-update").text("등록");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Request failed: ", textStatus, errorThrown);
                    alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
                },
            });
        }
    });

    $(".product-list").on("click", ".goods-info div :nth-of-type(1)", function () {
        const goodsId = $(this).closest(".goods-info").children().eq(1).text();
        const goodsInfo = goods.filter((data) => data.goodsId == goodsId);

        $.ajax({
            url: "../js/goods-form.js",
            method: "GET",
            success: function (data) {
                uploadGoodsFormPage(goodsInfo[0]);

                $(".goods-update").text("수정");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: ", textStatus, errorThrown);
                alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
            },
        });
    });
}
