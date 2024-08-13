function myqnaFormPage() {
    $(".board-list").empty();
    $(".pagination").empty();
    $("#inq-btn-container").remove();
    $('.board-top').remove();
    $(".board-list").append(
        /*html*/
        `<div class="d-flex mt-3 ps-4">
            <p style="width: 80px">제목</p> <textarea style="width: 550px; height: 30px;" placeholder="제목을 입력하세요"></textarea>
        </div>
        <div class="d-flex mt-3 ps-4">
            <p style="width: 80px">내용</p> <textarea style="width: 550px; height: 500px;"placeholder="내용을 입력하세요"></textarea>
        </div>`
    );
}

$(document).ready(function () {
    myqnaFormPage();

    $("#board-container").append(
        /*html*/
        `<div id="cmp-container" class="d-flex justify-content-center">
            <p class="btn cmp-button ajax-btn" data-js="../js/myqna.js">등록</p>
        </div>`
    );
});
