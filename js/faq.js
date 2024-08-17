var faqList = [
    {
        title: "자주묻는질문1",
        content: "내용1",
        author: "관리자"
    },
    {
        title: "자주묻는질문2",
        content: "내용2",
        author: "관리자"
    },
    {
        title: "자주묻는질문3",
        content: "내용3",
        author: "관리자"
    },
    {
        title: "자주묻는질문4",
        content: "내용4",
        author: "관리자"
    },
];

var itemsPerPage = 5;
var currentPage = 1;

function faqListUpload() {
    localStorage.setItem("faq-JSON", JSON.stringify(faqList))
}

function renderFaqPage(page) { //변수로 받은 페이지 생성
    currentPage = page;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    $(".board-list").empty(); //들어갈 div 비우기
    for (var i = startIndex; i < endIndex && i < faq.length; i++) {
            $(".board-list").append( //게시물 생성
                /*html*/
                `<div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="board d-flex align-item-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            <p class="post-num text-center me-3" id="post-num${i}">${i+1}</p>
                            <p class="post-title">${faq[i].title}</p>
                            <p id="post-status${i}" class="flex-grow-1 text-center">${faq[i].author}</p>
                        </button>
                    </h2>
                    <div id="collapse${i}" class="accordion-collapse collapse">
                        <div id="content${i}" class="accordion-body">
                            ${faq[i].content}
                        </div>
                    </div>
                </div>`
            );
    };

    renderPagination(); //페이지 번호 생성 호출
}

function renderPagination() { // 페이지 번호 생성
    $(".pagination").empty();
    var totalPages = Math.ceil(faq.length / itemsPerPage);

    for (var i = 1; i <= totalPages; i++) {
        $(".pagination").append(
            /*html*/
            `<button class="page-num">${i}</button>`
        );
    }

    //현재 페이지 번호에 active 클래스 부여
    $(".page-num").eq(`${currentPage-1}`).addClass("active");
    
    $(".page-num").on("click", function () {
        var page = $(this).text();
        renderFaqPage(page);
    });
}

function uploadFaqPage() { // 자주묻는질문 클릭시 호출될 함수
    faqListUpload();
    faq = JSON.parse(localStorage.getItem("faq-JSON")); //로컬스토리지에서 꺼내서 변수에 담기

    $("#board-container").empty().append( //게시판
        /*html*/
        `<div class="board-top d-flex align-items-center">
            <p class="flex-grow-1">번호</p>
            <p id="just-title">제목</p>
            <p class="flex-grow-1">작성자</p>
        </div>
        <div class="board-list">

        </div>
        <div class="d-flex justify-content-center">
            <div class="pagination">

            </div>
        </div>`
    );
    renderFaqPage(1);
}

$(document).ready(function() {
    uploadFaqPage();
});