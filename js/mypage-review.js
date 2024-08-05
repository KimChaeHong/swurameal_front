let product = [
    {img : "../images/211.jpg", title: "떡볶이", orderNumber: "123123123", 
        paymentMethod: "네이버페이", price: "12,300 원",  orderStatus: "배송 완료"},
    {img : "../images/212.jpg", title: "파스타", orderNumber: "222222222", 
        paymentMethod: "신용카드", price: "7,300 원",  orderStatus: "배송 중"}
]
let review = [
    {img : "../images/211.jpg", title: "떡볶이", category: "[떡볶이] 떡볶이", 
        star: "★★★★★", scope: "5",  description: "감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 전직대통령의 신분과 예우에 관하여는 법률로 정한다. 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 국군의 조직과 편성은 법률로 정한다. "},
    {img : "../images/212.jpg", title: "파스타", category: "[파스타] 파스타", 
        star: "★★★★☆", scope: "4",  description: "매우 맛있습니다."},
    {img : "../images/212.jpg", title: "파스타", category: "[파스타] 파스타", 
        star: "★★★★☆", scope: "4",  description: "매우 맛있습니다."}
]

function productUpload() {
    localStorage.setItem("product", JSON.stringify(product));
}

function reviewUpload(){
    localStorage.setItem("review", JSON.stringify(review));
}

$(document).ready(function () {
    reviewUpload();
    productUpload();
    $(".review-writeable-box").on("click", function (e) {
        $(".review-writeable-page").html("");
        $(".review-written-page").css("display", "none");
        $(".review-writeable-page").css("display", "block");
        const productdata = JSON.parse(localStorage.getItem("product"));
        for( p of productdata){
            const productHtml = /*html*/
            `<div class="product-box">
                <img src=${p.img} class="product-image" />
                <div class="product-details">
                    <p><strong>상품명</strong>: ${p.title}</p>
                    <p><strong>주문 번호</strong>: ${p.orderNumber}</p>
                    <p><strong>결제 방법</strong>: ${p.paymentMethod}</p>
                    <p><strong>결제 금액</strong>: ${p.price}</p>
                    <p><strong>주문 상태</strong>: ${p.orderStatus}</p>
                </div>
            </div>`
            $(".review-writeable-page").append(productHtml);
        }
    });

    $(".review-written-box").on("click", function (e) {
        $(".review-written-page").html("");
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
        const reviewdata = JSON.parse(localStorage.getItem("review"));
        for( r of reviewdata){
            const reviewHtml = /*html*/
            `<div class="review-box">
            <button class="review-delete">&times;</button>
            <div class="review-title">
                <p class="title"><strong>${r.title}</strong></p>
                <p class="category">${r.category}</p>
                <p><span class="star">${r.star}</span><span class="scope"> ${r.scope}</span></p>
            </div>
            <div class="review-detail">
                <div class="review-description">
                    <p class="description">${r.description}</p>
                </div>
                <div class="review-image">
                    <img src=${r.img}>
                </div>
                <div class="review-update">
                    <button>수정하기</button>
                </div>
            </div>
        </div>`
            $(".review-written-page").append(reviewHtml);
        }
    });
});
