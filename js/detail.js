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

// 리뷰 데이터를 localStorage에 저장하는 함수
function reviewUpload() {
    localStorage.setItem("reviews", JSON.stringify(reviewList));
}

$(document).ready(function () {
    var price = 12200; // 상품 가격 설정

    // 상품 가격을 화면에 표시 (천단위 ,)
    $("#product-price").text(price.toLocaleString() + "원");
    var totalPrice = Number($("#count").text()) * price; // 총 가격 계산

    // 상품 개수 감소 버튼 클릭 이벤트 처리
    $("#minus-button").on("click", function () {
        if (Number($("#count").text()) <= 1) { // 개수가 1개 이하일 경우 아무 작업도 하지 않음
        } else {
            var num = Number($("#count").text()) - 1; // 상품 개수 감소
            $("#count").text(num);
            totalPrice = Number($("#count").text()) * price; // 총 가격 게산
            $(".total-price").text(totalPrice.toLocaleString() + "원"); // 총 가격 표시
        }
    });

    // 상품 개수 증가 버튼 클릭 이벤트 처리
    $("#plus-button").on("click", function () {
        var num = Number($("#count").text()) + 1; // 상품 개수 증가
        $("#count").text(num);
        totalPrice = Number($("#count").text()) * price; // 총 가격 계산
        $(".total-price").text(totalPrice.toLocaleString() + "원"); // 총 가격 표시
    });

    // 총 가격 표시
    $(".total-price").text(totalPrice.toLocaleString() + "원");

    // "구매" 버튼 클릭 시 장바구니에 담고 결제 화면으로 이동 확인
    $("#buy").on("click", function () {
        if(confirm("선택한 상품을 장바구니에 담고 결제화면으로 이동하시겠습니까?")){
            window.location.href = "../html/cart.html"; // 결제 페이지로 이동
        }
    });

    // 제품정보 버튼 클릭 시 해당 이미지로 이동
    $("#move-info").on("click", function () {
        $("#detail-img1")[0].scrollIntoView();
    });

    // 제품상세 버튼 클릭 시 해당 이미지로 이동
    $("#move-detail").on("click", function () {
        $("#detail-img2")[0].scrollIntoView();
    });

    // 리뷰 버튼 클릭 시 리뷰 섹션으로 이동
    $("#move-review").on("click", function () {
        $("#review-container")[0].scrollIntoView();
    });

    reviewUpload(); // 리뷰 데이터를 로컬 스토리지에 저장
    var review = JSON.parse(localStorage.getItem("reviews")); // 저장된 리뷰 데이터 로드

    const itemPerPage = 5; // 페이지당 표시할 리뷰 개수 설정
    let currentPage = 1; // 현재 페이지 설정

    // 현재 페이지에 해당하는 리뷰를 화면에 표시하는 함수
    function displayReviews(page) {
        const startIndex = (page - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        currentPageReviews = review.slice(startIndex, endIndex);

        $("#review-container").empty(); // 기존 리뷰 내용을 초기화
        for (let i = 0; i < currentPageReviews.length; i++) {
            // 리뷰 데이터를 화면에 표시
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

    // 페이지네이션을 설정하는 함수
    function setupPagination() {
        const pageCount = Math.ceil(review.length / itemPerPage); // 총 페이지 수 계산
        $(".pagination").empty(); // 기존 페이지네이션 초기화

        for (let i = 1; i <= pageCount; i++) {
            // 페이지네이션 번호를 화면에 표시
            $(".pagination").append(
                /*html*/
                `<a class="page-link ${i === currentPage ? "active" : ""}" href="#">${i}</a>`
            );
        }
    }

    displayReviews(currentPage); // 첫 번째 페이지의 리뷰를 화면에 표시
    setupPagination();

    // 페이지 번호 클릭 시 해당 페이지 리뷰를 표시하는 이벤트 처리
    $(".pagination").on("click", ".page-link", function (e) {
        e.preventDefault();
        currentPage = Number($(this).text()); // 클릭한 페이지 번호로 설정
        displayReviews(currentPage); // 해당 페이지의 리뷰를 표시
        setupPagination(); // 페이지네이션 갱신
    });

    // 리뷰 개수를 화면에 표시
    $('#count-review').text(review.length + '건');

    // 장바구니 버튼 클릭 시 장바구니에 추가 알림
    $(".to-cart, #cart").on('click', function() {
        window.alert("상품을 장바구니에 추가하였습니다.");
    });

    // 찜 버튼 클릭 시 아이콘 변경 및 알림
    $(document).on('click', '#pick', function() {
        className = $('#pick-icon').attr('class'); // 찜 아이콘의 현재 클래스 가져오기
        console.log(className); // 현재 클래스 콘솔에 출력

        if (className == "bi bi-heart") { // 하트 아이콘이 비어있을 때
            $('#pick-icon').removeClass('bi-heart');
            $('#pick-icon').addClass('bi-heart-fill');
            alert('찜한상품에 추가되었습니다.');
        } else { // 하트 아이콘이 채워져 있을 때
            $('#pick-icon').removeClass('bi bi-heart-fill');
            $('#pick-icon').addClass('bi-heart');
            alert('찜한상품에서 제거되었습니다.');
        }
    });

});
