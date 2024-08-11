user = {
    id: "test1234",
    pw: "test1234",
    name: "테스트",
    email: "test@test.com",
    phone: "010-0000-0000",
    address: "서울특별시 테스트동",
    birth: "2024-08-11",
};

let currentPage = 1;
const itemsPerPage = 5;

function userUpload() {
    localStorage.setItem("user", JSON.stringify(user));
}

const mypage =
    /*html*/
    `<div class="title-box"">
        <p>찜한 상품</p>
        <div class="horizontal-line"></div>
        </div>
        <div class="page-upload"></div>`;

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
            if (text === "찜한 상품") uploadPickPage();
            else if (text === "주문 내역") uploadOrderPage();
            else if (text === "상품 후기") uploadReviewPage();
            else if (text == "개인정보 수정") uploadInfoPage();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
            alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
        },
    });
}

$(document).ready(function () {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    userUpload();
    const userdata = JSON.parse(localStorage.getItem("user"));
    console.log($(".category-box p ").first().attr("data-js"));
    pageUpload($(".category-box p ").first(), themeColor, darkgrayColor);

    $(".mypage-box").append(mypage);
    $(".member-name").html(/*html*/ `${userdata.username}님`);

    $(".category-box p").on("click", function (e) {
        // let url = $(this).attr("data-js");
        e.preventDefault();
        pageUpload($(this), themeColor, darkgrayColor);
    });
});
