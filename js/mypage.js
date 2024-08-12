let user = {
    id: "test1234",
    pw: "test1234",
    name: "테스트",
    email: "test@test.com",
    phone: "010-0000-0000",
    address: "서울특별시 테스트동",
    birth: "2024-08-11",
};
let pickList = [
    { img: "../src/images/111.png", category: "전통주", title: "원소주", price: "12,200원" },
    { img: "../src/images/111.png", category: "전통주", title: "양주", price: "12,200원" },
    { img: "../src/images/111.png", category: "전통주", title: "소주", price: "12,200원" },
    { img: "../src/images/111.png", category: "전통주", title: "맥주", price: "12,200원" },
];

let orderList = [
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2024년08월06일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2024년08월06일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2024년04월01일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2022년01월06일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "12,200원" },
    { img: "../src/images/111.png", title: "매운돼지갈비", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "12,200원" },
];

let writeableList = [
    { img: "../src/images/111.png", title: "떡볶이", orderNumber: "123123123", orderDay: "2024년 08월 06일", price: "12,300 원" },
    { img: "../src/images/111.png", title: "파스타", orderNumber: "222222222", orderDay: "2024년 08월 05일", price: "7,300 원" },
];
/*prettier-ignore*/
let writtenList = [
    {img: "../src/images/111.png", title: "떡볶이", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"},
    {img: "../src/images/111.png",title: "파스타", wirttenDay: "24/08/06", auther:"OOO",
        description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으"}
]

let currentPage = 1;
const itemsPerPage = 5;

function localStorageUpload() {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("pickList", JSON.stringify(pickList));
    localStorage.setItem("orderList", JSON.stringify(orderList));
    localStorage.setItem("writeableList", JSON.stringify(writeableList));
    localStorage.setItem("writtenList", JSON.stringify(writtenList));
}

const mypage =
    /*html*/
    `<div class="title-box">
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
            currentPage = 1;
            if (text === "찜한 상품") uploadPickPage();
            else if (text === "주문 내역") uploadOrderPage();
            else if (text === "상품 후기") uploadReviewPage();
            else if (text == "개인정보 수정") uploadInfoPage();
            else uploadGoodsPage();
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

    localStorageUpload();
    const userdata = JSON.parse(localStorage.getItem("user"));
    console.log($(".category-box p ").first().attr("data-js"));
    pageUpload($(".category-box p ").first(), themeColor, darkgrayColor);

    $(".mypage-box").append(mypage);
    $(".member-name").html(/*html*/ `${userdata.name} 님`);

    $(".category-box p").on("click", function (e) {
        // let url = $(this).attr("data-js");
        e.preventDefault();
        pageUpload($(this), themeColor, darkgrayColor);
    });
});
