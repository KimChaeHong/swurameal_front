let product = [
    {img : "../images/211.jpg", title: "떡볶이", orderNumber: "123123123", 
        paymentMethod: "네이버페이", price: "12,300 원",  orderStatus: "배송 완료"},
    {img : "../images/212.jpg", title: "파스타", orderNumber: "222222222", 
        paymentMethod: "신용카드", price: "7,300 원",  orderStatus: "배송 중"}
]

function productUpload() {
    localStorage.setItem("product", JSON.stringify(product));
}

$(document).ready(function () {
    
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
        $(".review-writeable-page").css("display", "none");
        $(".review-written-page").css("display", "block");
    });
});
