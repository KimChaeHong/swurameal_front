reviewList = [
    { author: "작성자1", date: "2024.08.01", content: "리뷰내용1" },
    { author: "작성자2", date: "2024.08.02", content: "리뷰내용2" },
    { author: "작성자3", date: "2024.08.03", content: "리뷰내용3" },
    { author: "작성자4", date: "2024.08.04", content: "리뷰내용4" },
    { author: "작성자5", date: "2024.08.05", content: "리뷰내용5" },
    { author: "작성자6", date: "2024.08.06", content: "리뷰내용6" },
    { author: "작성자7", date: "2024.08.07", content: "리뷰내용7" },
    { author: "작성자8", date: "2024.08.08", content: "리뷰내용8" },
];

function reviewUpload() {
    localStorage.setItem("reviews", JSON.stringify(reviewList));
}

$(document).ready(function () {
    var price = 12200;

    $("#product-price").text(price.toLocaleString() + "원");
    var totalPrice = Number($("#count").text()) * price;

    $("#minus-button").on("click", function () { //상품개수 감소버튼
        if (Number($("#count").text()) <= 1) {
        } else {
            var num = Number($("#count").text()) - 1;
            $("#count").text(num);
            totalPrice = Number($("#count").text()) * price;
            $(".total-price").text(totalPrice.toLocaleString() + "원");
        }
    });

    $("#plus-button").on("click", function () { //상품개수 증가버튼
        var num = Number($("#count").text()) + 1;
        $("#count").text(num);
        totalPrice = Number($("#count").text()) * price;
        $(".total-price").text(totalPrice.toLocaleString() + "원");
    });

    $(".total-price").text(totalPrice.toLocaleString() + "원");

    $("#buy").on("click", function () {
        if(confirm("선택한 상품을 장바구니에 담고 결제화면으로 이동하시겠습니까?")){
            window.location.href = "../html/cart.html";
        }
    });

    $("#move-info").on("click", function () { //제품정보 버튼
        $("#detail-img1")[0].scrollIntoView();
    });

    $("#move-detail").on("click", function () { //제품상세 버튼
        $("#detail-img2")[0].scrollIntoView();
    });

    $("#move-review").on("click", function () { // 리뷰 버튼
        $("#review-container")[0].scrollIntoView();
    });

    reviewUpload(); //리뷰 목록 호출
    var review = JSON.parse(localStorage.getItem("reviews"));
    console.log(review);

    const itemPerPage = 5;
    let currentPage = 1;

    function displayReviews(page) { //해당 페이지 리뷰 생성
        const startIndex = (page - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        currentPageReviews = review.slice(startIndex, endIndex);

        $("#review-container").empty();
        for (let i = 0; i < currentPageReviews.length; i++) {
            $("#review-container").append(
                /*html*/
                `<div class="review-box">
                <p>
                <span class="cus-name">${currentPageReviews[i].author}</span>
                <span class="date">${currentPageReviews[i].date}</span>
                </p>
                <p class="review-content">
                ${currentPageReviews[i].content}
                </p>
                </div>`
            );
        }
    }

    function setupPagination() { //페이지 번호 생성
        const pageCount = Math.ceil(review.length / itemPerPage);
        $(".pagination").empty();

        for (let i = 1; i <= pageCount; i++) {
            $(".pagination").append(
                /*html*/
                `<a class="page-link ${i === currentPage ? "active" : ""}" href="#">${i}</a>`

            );
        }
    }

    displayReviews(currentPage);
    setupPagination();

    $(".pagination").on("click", ".page-link", function (e) { //페이지 번호 이벤트
        e.preventDefault();
        currentPage = Number($(this).text());
        displayReviews(currentPage);
        setupPagination();
    });

    $('#count-review').text(review.length+'건');

    $(".to-cart, #cart").on('click', function() { // 장바구니 버튼기능
        window.alert("상품을 장바구니에 추가하였습니다.");
    })

    $(document).on('click','#pick', function() { //찜버튼 기능
        className = $('#pick-icon').attr('class');
        console.log(className);

        if(className =="bi bi-heart"){
            $('#pick-icon').removeClass('bi-heart');
            $('#pick-icon').addClass('bi-heart-fill');
            alert('찜한상품에 추가되었습니다.');
        }else {
            $('#pick-icon').removeClass('bi bi-heart-fill');
            $('#pick-icon').addClass('bi-heart');
            alert('찜한상품에서 제거되었습니다.');
        }

    });

});
