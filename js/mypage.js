const user = {
    username: "testuser",
    email: "testuser@example.com",
    isLoggedIn: true,
    isMembership: true,
    couponNum: 2,
    pointNum: 2100,
};

$(document).ready(function () {
    localStorage.setItem("user", JSON.stringify(user));
    const userdata = JSON.parse(localStorage.getItem("user"));
    $(".coupon-number").html(`${userdata.couponNum}장`);
    $(".point-number").html(`${userdata.pointNum}p`);

    if (userdata.isMembership) {
        $(".mypage-name").html(
            /*html*/
            `반가워요 <span>${userdata.username}</span>님(<span>멤버쉽 회원</span>)`
        );
        $(".mypage-name span").css("color", "#d4c3e8");
        $(".membership-info").html(
            /*html*/
            `<span class="highlight-purple">수라밀 멤버쉽</span>회원. 구매금액 <span class="highlight">5%</span> 
            추가적립 <span class="highlight">적용중</span>`
        );
    }

    $(".category-detail a").on("click", function (e) {
        e.preventDefault();
        $(".title").html(`${$(this).text()}`);
        $(".category-detail a").css({
            color: "#757575",
            "font-weight": "normal",
        });
        let url = $(this).attr("href");
        $(this).css({
            "font-weight": "bold",
            color: "black",
        });
        $.ajax({
            url: url,
            method: "GET",
            success: function (data) {
                $(".page-upload").html(data);
            },
        });
    });
});
