function getMonthDiff(startDate, endDate) {
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
}

function stringToDate(orderdate) {
    const parts = orderdate.split(/[\s년월일]+/);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
}
function changeColor(nonClickDiv, clickedDiv) {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const mediumgray = getComputedStyle(document.documentElement).getPropertyValue("--mediumgray");

    $(nonClickDiv).css({
        color: mediumgray,
        "font-weight": "normal",
        "border-color": mediumgray,
    });
    $(clickedDiv).css({
        color: themeColor,
        "font-weight": "bold",
        "border-color": "black",
    });
}
function choicePeriod(threeMonth, sixMonth, oneYear, threeYear) {
    $(".three-month").on("click", function () {
        renderOrderPage(threeMonth, currentPage, ".order-list");
        setupPagination(threeMonth, ".order-list");
        changeColor(".six-month, .one-year, .three-year", ".three-month");
    });
    $(".six-month").on("click", function () {
        renderOrderPage(sixMonth, currentPage, ".order-list");
        setupPagination(sixMonth, ".order-list");
        changeColor(".three-month, .one-year, .three-year", ".six-month");
    });
    $(".one-year").on("click", function () {
        renderOrderPage(oneYear, currentPage, ".order-list");
        setupPagination(oneYear, ".order-list");
        changeColor(".six-month, .three-month, .three-year", ".one-year");
    });
    $(".three-year").on("click", function () {
        renderOrderPage(threeYear, currentPage, ".order-list");
        setupPagination(threeYear, ".order-list");
        changeColor(".six-month, .one-year, .three-month", ".three-year");
    });
}

function renderOrderPage(data, page, container) {
    $(container).html("");
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);
    let itemHtml = "";
    for (const item of paginatedItems) {
        itemHtml =
            /*html*/
            `
            <div class="order-product d-flex">
                <img src="${item.img}">
                <div class="order-info">
                    <p><strong>상품명</strong> ${item.title}</span></p>
                    <p><strong>주문 날짜</strong> ${item.orderDate}</p>
                    <p><strong>결제 금액</strong> ${item.price}</p>
                    <p><strong>주문 상태</strong> ${item.orderStatus}</p>
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
        renderOrderPage(data, currentPage, container);
    });
}

function uploadPage() {
    const products = JSON.parse(localStorage.getItem("orderList"));
    const orderPageHtml =
        /*html*/
        `
        <div class="order-container d-flex flex-column">
            <div class="row text-center period-choice" >
                <div class="col-3 three-month">3개월</div>
                <div class="col-3 six-month">6개월</div>
                <div class="col-3 one-year">1년</div>
                <div class="col-3 three-year">3년</div>
            </div>
            <div class="d-flex flex-column order-list"></div>
            <div class="pagination"></div> 
        </div>
        `;
    const orderCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/order.css",
    });
    $("head").append(orderCss);
    $(".page-upload").html(orderPageHtml);

    let threeMonth = [];
    let sixMonth = [];
    let oneYear = [];
    let threeYear = [];

    let odrD, monthDiff;
    const today = new Date();
    for (let data of products) {
        odrD = stringToDate(data.orderDate);
        monthDiff = getMonthDiff(odrD, today);
        if (monthDiff <= 3) threeMonth.push(data);
        if (monthDiff <= 6) sixMonth.push(data);
        if (monthDiff <= 12) oneYear.push(data);
        if (monthDiff <= 36) threeYear.push(data);
    }
    renderOrderPage(threeMonth, currentPage, ".order-list");
    setupPagination(threeMonth, ".order-list");
    changeColor(".six-month, .one-year, .three-year", ".three-month");
    choicePeriod(threeMonth, sixMonth, oneYear, threeYear);
}
