// data를 페이징 처리를 하기위한 함수
function renderProductPage(data, page, container) {
    //컨테이너 안에 있는 내용을 초기화 시키낟.
    $(container).html("");

    // start 처음으로 가져올 상품
    let start = (page - 1) * itemsPerPage;
    // 마지막으로 가져올 상품
    let end = start + itemsPerPage;
    // start ~ end 바로 전까지 가지고 올 상품을 paginatedItems에 저장한다.
    let paginatedItems = data.slice(start, end);

    let itemHtml = "";
    // 반복문을 돌려 상품 목록을 출력한다.
    for (const item of paginatedItems) {
        itemHtml =
            /*html*/
            `
            <div class="pick-product d-flex">
                <i class="bi bi-check-circle" data-select="1"></i>
                <div class="img-product d-flex">
                    <img src="${item.img}">
                    <div class="product-info">
                        <p><strong>카테고리</strong> ${item.category}</p>
                        <p><strong>상품명</strong> ${item.title}</p>
                        <p><strong>가격</strong> ${item.price}</p>
                    </div>    
                </div>
                <div class="button-list">
                    <i class="bi bi-cart2"></i>
                    <i class="bi bi-x-lg"></i>
                </div>
            </div>
            `;
        $(container).append(itemHtml);
    }
}

// 페이지 번호를 출력한다.
function setupPagination(data, container) {
    // 페이지 번호를 초기화한다.
    $(".pagination").html("");

    // 마지막 페이지의 번호를 가져온다. Math.ceil은 올림
    let pageCount = Math.ceil(data.length / itemsPerPage);

    // 페이지 번호들을 출력한다.
    for (let i = 1; i <= pageCount; i++) {
        $(".pagination").append(`<button class="page-num">${i}</button>`);
    }

    // 1 page에 active 속성을 추가해 표시해 준다.
    $(".page-num").eq(0).addClass("active");

    // page를 클릭하면 발생하는 이벤트
    $(".page-num").on("click", function () {
        // active 속성을 제거한다.
        $(".page-num").removeClass("active");
        // 클릭한 page에 active 속성을 준다.
        $(this).addClass("active");

        // currentPage에 클릭한 페이지의 숫자를 넣는다.
        currentPage = parseInt($(this).text());

        // currentPage의 상품목록을 출력한다.
        renderProductPage(data, currentPage, container);
    });
}

// 상품 삭제하는 함수
function pickProductDelete(selected) {
    // 삭제할 상품을 저장할 배열을 만든다.
    const deleteList = [];

    // 만약 선택된 상품이 있다면 if안의 코드를 실행한다.
    if ($(selected).length !== 0) {
        // 선택된 상품들을 반복문 돌린다.
        $(selected).each(function () {
            // closest : 선택된 상품의 부모 css 중 .pick-product를 찾는다.
            // find : 요소의 하위에 속한 요소들을 가져온다.
            // 그 가져온 값의 1번째 값의 text를 가지고 온다. (상품명파스타 등으로 가지고 온다.)
            // 상품명을 없애고 공백을 없앤다.
            deleteList.push($(this).closest(".pick-product").find(".product-info p").eq(1).text().replace("상품명", "").trim());
        });
        // pickList에 불러온 상품들중 deleteList에 가지고 있지 않은 함수들을 가지고 가지고 온다.
        const updateList = pickList.filter((item) => !deleteList.includes(item.title));

        // updateList를 localStorage에 저장하고 다시 가지고 온다.
        localStorage.setItem("pickList", JSON.stringify(updateList));
        pickList = JSON.parse(localStorage.getItem("pickList"));

        // 페이지를 출력한다.(삭제한 상품은 사라진다.)
        renderProductPage(pickList, currentPage, ".pick-products");
        setupPagination(pickList, ".pick-products");
    }
}

function uploadPage() {
    // 로컬스토리지에 있는 key가 pickList인 값을 가지고 온다.
    const pickList = JSON.parse(localStorage.getItem("pickList"));
    const pickPageHtml =
        /*html*/
        `<div class = "pick-container d-flex flex-column">
            <div class = "choice-box">
                <div class='choice-all d-flex'>
                <i class="bi bi-check-circle" data-flag="1"></i>
                <p class="all-select" >전체선택</p>
                </div>
                <div class='choice-deselect'>
                <p><span class="all-del">전체 삭제</span> | <span class="choice-del">선택 삭제</span></p>
                </div>
            </div>
            <div class= "pick-products d-flex flex-column"></div>
            <div class="pagination"></div> 
        </div>`;

    // css와 page 업로드
    const pickCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/pick.css",
    });
    $("head").append(pickCss);
    $(".page-upload").html(pickPageHtml);

    // 상품들 업로드
    renderProductPage(pickList, currentPage, ".pick-products");
    setupPagination(pickList, ".pick-products");

    // 전체선태과 그 아이콘을 flag가 1일때 flag를 2로 바꾸면서 전체 선택한다.
    // flag가 2일 때 클릭하면 flag를 1로 바꾸면서 선택을 해제한다.
    $(".choice-all i, .all-select").on("click", function () {
        // .choice-all i의 data-flag 속성의 값이 1인지 2인지 확인한다.
        // 그리고 색을 바꾸고 data-flag와 속성을 바꾼다.
        if ($(".choice-all i").attr("data-flag") == 1) {
            $(".pick-product > i").attr({
                class: "bi bi-check-circle-fill",
                "data-select": 2,
            });
            $(".choice-all i").attr("data-flag", 2);
        } else {
            $(".pick-product > i").attr({
                class: "bi bi-check-circle",
                "data-select": 1,
            });
            $(".choice-all i").attr("data-flag", 1);
        }
    });

    // 선택 창을 클리하면 이벤트가 발생한다.
    $(".page-upload").on("click", ".pick-product > i", function () {
        //만약 선택한 아이콘의 data-select가 1이면 속성을 변경시킨다.
        if ($(this).attr("data-select") == 1)
            $(this).attr({
                class: "bi bi-check-circle-fill",
                "data-select": 2,
            });
        else {
            $(this).attr({
                class: "bi bi-check-circle",
                "data-select": 1,
            });
        }
    });

    // 삭제를 누르면 전체삭제/ 선택삭제를 진행시킨다.
    $("page-upload").on("click", ".all-del", function () {
        pickProductDelete(".pick-product i");
    });
    $(".page-upload").on("click", ".choice-del", function () {
        pickProductDelete('.pick-product i[data-select="2"]');
    });
    $(".page-upload").on("click", ".bi-x-lg", function () {
        pickProductDelete($(this));
    });
}
