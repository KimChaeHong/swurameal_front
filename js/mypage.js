const user = {
    username: "OOO",
    email: "testuser@example.com",
    isLoggedIn: true,
};

function userUpload() {
    localStorage.setItem("user", JSON.stringify(user));
}

const mypage =
    /*html*/
    `<div class="title-box"">
        <p>주문배송</p>
      <div class="horizontal-line"></div>
      </div>
      <div class="page-upload"></div>`;

$(document).ready(function () {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

    userUpload();
    const userdata = JSON.parse(localStorage.getItem("user"));
    $(".mypage-box").append(mypage);
    $(".member-name").html(
        /*html*/
        `${userdata.username}님`
    );

    $(".category-box p").on("click", function (e) {
        let url = $(this).attr("data-js");

        e.preventDefault();
        userUpload;
        $(".title-box p").html(`${$(this).text()}`);
        $(".category-box p").css({
            color: darkgrayColor,
            "font-weight": "normal",
        });
        $(this).css({
            color: themeColor,
            "font-weight": "bold",
        });
        $.ajax({
            url: url,
            method: "GET",
            success: function (data) {
                $(".page-upload").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: ", textStatus, errorThrown);
                alert("오류가 발생하였습니다. 다시 한번 시도해 주세요");
            },
        });
    });
});
