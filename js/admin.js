const admin =
    /*html*/
    `<div class="title-box">
        <p>상품 관리</p>
        <div class="horizontal-line"></div>
        </div>
        <div class="page-upload"></div>`;

function pageTagUpload(tagName, cssName) {
    const linkCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: `../css/${cssName}.css`,
    });
    $("head").append(linkCss);
    $(`.${tagName}`).load(`../${tagName}.html`);
}

let currentPage = 1;
const itemsPerPage = 10;

function pageUpload(page, themeColor, darkgrayColor) {
    const text = page.text();
    const url = page.attr("data-js");

    $(".title-box p").html(`${page.text()}`);
    $(".category-box p").css({
        color: darkgrayColor,
        "font-weight": "normal",
    });

    page.css({
        color: themeColor,
        "font-weight": "bold",
    });

    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            currentPage = 1;
            if (text === "상품 관리") uploadGoodsPage();
            else if (text === "1:1 문의 관리") console.log("미구현");
            else if (text === "공지사항 관리") console.log("미구현");
            else if (text == "FAQ 관리") console.log("미구현");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
            alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
        },
    });
}
$(document).ready(function () {
    pageTagUpload("header", "index");
    pageTagUpload("footer", "footer");
    pageTagUpload("nav", "nav");

    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    pageUpload($(".category-box p ").first(), themeColor, darkgrayColor);

    $(".admin-box").append(admin);
});
