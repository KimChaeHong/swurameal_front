function renderProductPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);

    let itemHtml = "";
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

function setupPagination(data, container) {
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
        renderProductPage(data, currentPage, container);
    });
}

function uploadPickPage() {
    const products = JSON.parse(localStorage.getItem("pickList"));
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

    const pickCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/pick.css",
    });
    $("head").append(pickCss);
    $(".page-upload").html(pickPageHtml);

    renderProductPage(products, currentPage, ".pick-products");
    setupPagination(products, ".pick-products");

    $(".choice-all i, .all-select").on("click", function () {
        console.log($(".choice-all i").data("flag"));
        if ($(".choice-all i").data("flag") == 1) {
            $(".pick-product > i").attr({
                class: "bi bi-check-circle-fill",
                "data-select": 2,
            });
            $(".choice-all i").data("flag", 2);
        } else {
            $(".pick-product > i").attr({
                class: "bi bi-check-circle",
                "data-select": 1,
            });
            $(".choice-all i").data("flag", 1);
        }
    });
    $(".pick-product > i").on("click", function () {
        $(this).toggleClass("bi-check-circle bi-check-circle-fill");
        console.log($(".pick-product > i").data("select"));
        $(this).data("select") == 1 ? $(this).data("select", "2") : $(this).data("select", "1");
    });
}
