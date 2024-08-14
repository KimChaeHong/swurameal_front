const admin =
    /*html*/
    `<div class="title-box">
        <div class="addButton">
            <p>상품 관리</p>
        </div>
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

let goodsCurrentPage = 1;
const goodsPerPage = 10;

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
            $(".addButton button").remove();
            currentPage = 1;
            if (text === "상품 관리") uploadGoodsPage();
            else if (text === "1:1 문의 관리") uploadQnaPage();
            else if (text === "공지사항 관리") uploadNoticePage(true);
            else if (text == "FAQ 관리") console.log("미구현");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
            alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
        },
    });
}

$(document).ready(function () {
    $("#logged-in-links").html(
        /*html*/
        `
        <a class="nav-link" href="#" id="logout-link">로그아웃</a>
        &nbsp;|&nbsp;
        <a class="nav-link" href="#" id="admin-link">관리자페이지</a>
        `
    );
    $("#nav-container").load("../html/nav.html");
    $(".sns-link > a:nth-of-type(1) img").attr("src", "../src/images/ico_instagram.png");
    $(".sns-link > a:nth-of-type(2) img").attr("src", "../src/images/ico_fb.png");
    $(".sns-link > a:nth-of-type(3) img").attr("src", "../src/images/ico_blog.png");
    $(".sns-link > a:nth-of-type(4) img").attr("src", "../src/images/ico_naverpost.png");
    $(".sns-link > a:nth-of-type(5) img").attr("src", "../src/images/ico_youtube.png");

    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    pageUpload($(".category-box p ").first(), themeColor, darkgrayColor);

    $(".admin-box").append(admin);

    $(".category-box p").on("click", function (e) {
        e.preventDefault();
        pageUpload($(this), themeColor, darkgrayColor);
    });
});
