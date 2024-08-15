let user = {
    id: "swura4789",
    pw: " mealkit@123",
    name: "수라밀",
    email: "test@test.com",
    phone: "010-0000-0000",
    address: "서울특별시 테스트동",
    birth: "2024-08-11",
};
let pickList = [
    { img: "../src/images/112.png", category: "분식", title: "떡볶이", price: "12,200원" },
    { img: "../src/images/411.png", category: "전통주", title: "17도 막걸리", price: "45,000원" },
    { img: "../src/images/211.jpg", category: "양식", title: "바질페스토파스타", price: "11,900원" },
    { img: "../src/images/331.png", category: "한식", title: "오삼불고기", price: "13,000원" },
    { img: "../src/images/222.jpg", category: "양식", title: "부채살 찹스테이크", price: "14,500원" },
    { img: "../src/images/114.png", category: "분식", title: "크림 떡볶이", price: "6,900원" },
];

let orderList = [
    { img: "../src/images/112.png", title: "차돌떢볶이", orderDate: "2024년08월06일", orderStatus: "배송완료", price: "9,900원" },
    { img: "../src/images/114.png", title: "크림떡볶이", orderDate: "2024년08월06일", orderStatus: "배송완료", price: "6,900원" },
    { img: "../src/images/116.png", title: "떡볶이", orderDate: "2024년04월01일", orderStatus: "배송완료", price: "6,000원" },
    { img: "../src/images/211.jpg", title: "바질페스토파스타", orderDate: "2022년01월06일", orderStatus: "배송완료", price: "11,900원" },
    { img: "../src/images/432.png", title: "문경바람 오크통 주", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "30,000원" },
    { img: "../src/images/421.png", title: "제주감귤 혼디", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "9,000원" },
    { img: "../src/images/331.png", title: "오삼불고기", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "13,000원" },
    { img: "../src/images/221.jpg", title: "연어스테이크", orderDate: "2021년08월04일", orderStatus: "배송완료", price: "13,500원" },
];

let writeableList = [
    { img: "../src/images/112.png", title: "차돌떡볶이", orderNumber: "123123123", orderDay: "2024년 08월 06일", price: "6,900 원" },
    { img: "../src/images/432.png", title: "문경바람 오크통 주", orderNumber: "222222222", orderDay: "2024년 08월 05일", price: "11,900 원" },
    { img: "../src/images/114.png", title: "크림떡볶이", orderNumber: "333333333", orderDay: "2024년 08월 05일", price: "11,900 원" },
    { img: "../src/images/222.jpg", title: "부채살 찹스테이크", orderNumber: "444444444", orderDay: "2024년 08월 05일", price: "11,900 원" },
];
/*prettier-ignore*/
let writtenList = [
    {img: "../src/images/116.png", title: "떡볶이", wirttenDay: "24/08/06", auther:"수라밀",
        description: "떡볶이의 쫄깃한 식감과 매콤한 양념이 완벽하게 어우러졌어요. 첫 입부터 감칠맛이 입안 가득 퍼져서 계속 손이 갔습니다. 매운맛도 적당해서 먹기 부담스럽지 않았고, 마지막까지 맛있게 즐길 수 있었어요. 재구매 의사 100%입니다!"},
    {img: "../src/images/211.jpg",title: "바질페스토파스타", wirttenDay: "24/08/06", auther:"수라밀",
        description: "파스타의 면발이 알맞게 삶아져서 쫄깃하고 부드러웠습니다. 소스와의 조화가 훌륭해 한 입 먹을 때마다 깊은 맛이 느껴졌어요. 신선한 재료 덕분에 전체적으로 깔끔하고 풍미가 좋았고, 양도 적당해 만족스러웠습니다. 다시 먹고 싶은 맛이에요!"},
    {img: "../src/images/421.png",title: "제주감귤 혼디", wirttenDay: "24/08/06", auther:"수라밀",
        description: "제주감귤 혼디는 감귤의 상큼한 맛이 입안 가득 퍼져서 아주 상쾌한 술이었습니다. 가볍게 마시기 좋으면서도 감귤의 자연스러운 단맛과 산미가 어우러져 부담 없이 즐길 수 있었습니다. 특히 차가운 상태로 마시니 더욱 감귤의 풍미가 살아나서 좋았어요. 제주 자연을 담은 듯한 느낌이 인상적이었어요!"},
    {img: "../src/images/331.png",title: "오삼불고기", wirttenDay: "24/08/06", auther:"수라밀",
        description: "매콤한 양념이 오징어와 삼겹살에 잘 배어 감칠맛이 최고였어요. 불향까지 더해져 한층 더 맛있게 즐길 수 있었습니다."},
    {img: "../src/images/321.png",title: "간장 돼지갈비찜", wirttenDay: "24/08/06", auther:"수라밀",
        description: "부드러운 돼지고기와 달콤짭짤한 간장 소스가 조화를 이루어 정말 맛있었어요. 풍성한 양념 덕에 밥도둑이 따로 없었습니다."},
    {img: "../src/images/211.jpg",title: "연어스테이크", wirttenDay: "24/08/06", auther:"수라밀",
        description: "연어의 부드러운 식감과 겉은 바삭한 그릴링이 완벽하게 어우러졌어요. 풍부한 육즙과 고소한 맛이 입안 가득 퍼져, 정말 고급스러운 맛을 느낄 수 있었습니다."},
    {img: "../src/images/411.png",title: "17도 막걸리", wirttenDay: "24/08/06", auther:"수라밀",
        description: "부드럽고 은은한 단맛에 더해진 17도의 알코올이 묵직한 맛을 더해줍니다. 일반 막걸리보다 깊고 진한 풍미가 인상적이었고, 특별한 날에 마시기 좋은 술이었어요."}
]

// 현재 페이지
let currentPage = 1;
// 한 페이지에 보여줄 갯수
const itemsPerPage = 7;

// LocalStorage에 업로드를 한다.
function localStorageUpload() {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("pickList", JSON.stringify(pickList));
    localStorage.setItem("orderList", JSON.stringify(orderList));
    localStorage.setItem("writeableList", JSON.stringify(writeableList));
    localStorage.setItem("writtenList", JSON.stringify(writtenList));
}

const mypageDefault =
    /*html*/
    `<div class="title-box">
        <p>찜한 상품</p>
        <div class="horizontal-line"></div>
        </div>
        <div class="page-upload"></div>`;

function pageUpload(clicked, themeColor, darkgrayColor) {
    const text = clicked.text();
    const url = clicked.attr("data-js");

    // ajax로 페이지를 불러올 때마다 title-boxd안의 p를 바꿔줍니다.
    // 바꾸는 text는 클릭한 <p>태그
    $(".title-box p").html(`${clicked.text()}`);

    // .category의 자손인 모든 p태그의 색과 폰트를 바꾼다.
    $(".category-box p").css({
        color: darkgrayColor,
        "font-weight": "normal",
    });

    // 클릭된 <p>태그의 색과 폰트를 바꾼다.
    clicked.css({
        color: themeColor,
        "font-weight": "bold",
    });

    //ajax를 사용해 페이지를 불러온다.
    $.ajax({
        url: url,
        method: "GET",
        success: function (data) {
            // currentPage, itemPerPage를 초기화 시킨다.
            // currentPage를 mypage.js에서 선언한 이유 :
            // 만약 currentPage를 let변수로 다른 js에서 선언하였다면
            // ajax로 js에 접근할떄마다 currentPage를 초기화하게 되고
            // let선언을 계속 하게 되어 오류가 발생한다.
            // 따라서 currentPage를 myPage에서 선언하고 이 js파일에서 초기화 시킨뒤
            // 다른 js 파일에서도 사용할 수 있도록 만들었다.
            currentPage = 1;

            // js파일안에 있는 uploadPage를 통해 페이지를 가지고 온다.
            uploadPage();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Request failed: ", textStatus, errorThrown);
            alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
        },
    });
}

$(document).ready(function () {
    $("#nav-container").load("../html/nav.html");
    $(".sns-link > a:nth-of-type(1) img").attr("src", "../src/images/ico_instagram.png");
    $(".sns-link > a:nth-of-type(2) img").attr("src", "../src/images/ico_fb.png");
    $(".sns-link > a:nth-of-type(3) img").attr("src", "../src/images/ico_blog.png");
    $(".sns-link > a:nth-of-type(4) img").attr("src", "../src/images/ico_naverpost.png");
    $(".sns-link > a:nth-of-type(5) img").attr("src", "../src/images/ico_youtube.png");

    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    localStorageUpload();
    //localStorage에 있는 key가 user의 데이터를 가지고 온다.
    const userdata = JSON.parse(localStorage.getItem("user"));

    // pageUpload함수 사용
    pageUpload($(".category-box p ").first(), themeColor, darkgrayColor);

    // .mypage-box 밑에 mypageDefault를 넣는다.
    $(".mypage-box").append(mypageDefault);

    // .localStorage에 저장되어있는 name변수를 .member-name에 바꿔준다.
    $(".member-name").html(/*html*/ `${userdata.name} 님`);

    // click하면 page를 로드한다.
    $(".category-box p").on("click", function (e) {
        // let url = $(this).attr("data-js");
        e.preventDefault();
        pageUpload($(this), themeColor, darkgrayColor);
    });
});
