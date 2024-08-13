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

    $("#minus-button").on("click", function () {
        if (Number($("#count").text()) <= 1) {
        } else {
            var num = Number($("#count").text()) - 1;
            $("#count").text(num);
            totalPrice = Number($("#count").text()) * price;
            $(".total-price").text(totalPrice.toLocaleString() + "원");
        }
    });

    $("#plus-button").on("click", function () {
        var num = Number($("#count").text()) + 1;
        $("#count").text(num);
        totalPrice = Number($("#count").text()) * price;
        $(".total-price").text(totalPrice.toLocaleString() + "원");
    });

    $(".total-price").text(totalPrice.toLocaleString() + "원");

    $("#buy").on("click", function () {
        window.location.href = "../html/cart.html";
    });

    $("#move-info").on("click", function () {
        $("#detail-img1")[0].scrollIntoView();
    });

    $("#move-detail").on("click", function () {
        $("#detail-img2")[0].scrollIntoView();
    });

    $("#move-review").on("click", function () {
        $("#review-container")[0].scrollIntoView();
    });

    reviewUpload();
    var review = JSON.parse(localStorage.getItem("reviews"));
    console.log(review);

    const itemPerPage = 5;
    let currentPage = 1;

    function displayReviews(page) {
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

    function setupPagination() {
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

    $(".pagination").on("click", ".page-link", function (e) {
        e.preventDefault();
        currentPage = Number($(this).text());
        displayReviews(currentPage);
        setupPagination();
    });

    $('#count-review').text(review.length+'건');
});
