var qnaList = [
    {
        title: "문의1",
        content: "내용1",
        date: "2024.08.10",
        status: "답변대기",
        answer: "답변1",
    },
    {
        title: "문의2",
        content: "내용2",
        date: "2024.08.11",
        status: "답변대기",
        answer: "답변3",
    },
    {
        title: "문의3",
        content: "내용3",
        date: "2024.08.12",
        status: "답변완료",
        answer: "답변3",
    },
    {
        title: "문의4",
        content: "내용4",
        date: "2024.08.13",
        status: "답변대기",
        answer: "답변4",
    },
    {
        title: "문의5",
        content: "내용5",
        date: "2024.08.15",
        status: "답변대기",
        answer: "답변5",
    },
    {
        title: "문의6",
        content: "내용6",
        date: "2024.08.16",
        status: "답변대기",
        answer: "답변6",
    },
    {
        title: "문의7",
        content: "내용7",
        date: "2024.08.17",
        status: "답변대기",
        answer: "답변7",
    },
    {
        title: "문의8",
        content: "내용8",
        date: "2024.08.18",
        status: "답변대기",
        answer: "답변8",
    },
];

var itemsPerPage = 5;
var currentPage = 1;

//qna 데이터를 localStorage에 저장
function makeJson() {
    localStorage.setItem("qna", JSON.stringify(qnaList));
}

//수정 버튼 클릭 시 실행되는 함수
function formButton() {
    $(document).on("click", ".form-button", function () {
        var num = $(this).data("num");
        var contentDiv = $("#content" + num);

        contentDiv.empty();

        contentDiv.append(
            /*html*/
            `<textarea class="text-form" placeholder="답변을 입력하세요">${qnaData[num].content}</textarea>
            <p class="btn btn-sm complete-button" data-num="${num}">완료</p>`
        );
        completeButton();
    });
}

// 완료 버튼 클릭 시 실행되는 함수
function completeButton() {
    $(document).on("click", ".complete-button", function () {
        var num = $(this).data("num");
        var contentDiv = $("#content" + num);

        contentDiv.empty();
        contentDiv.append(
            /*html*/
            `${qnaData[Number(num)].content}
            <div class="form-button-container">
                <span class="btn btn-sm form-button" data-num="${num}">수정</span>
                <span class="btn btn-sm delete_button" data-num="${num}">삭제</span>
            </div>`
        );
        formButton();
    });
}

// qna 목록을 현재 페이지에 맞게 렌더링
function renderMyqnaPage(page) {
    currentPage = page;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    $(".board-list").empty();
    for (var i = startIndex; i < endIndex && i < qnaData.length; i++) {
        if(qnaData[i].status =="답변대기"){
            $(".board-list").append(
                /*html*/
                `<div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="board d-flex align-item-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            <p class="post-title">${qnaData[i].title}</p>
                            <p class="flex-grow-1 text-center">${qnaData[i].date}</p>
                            <p id="post-status${i}" class="flex-grow-1 text-center">${qnaData[i].status}</p>
                        </button>
                    </h2>
                    <div id="collapse${i}" class="accordion-collapse collapse">
                        <div id="content${i}" class="accordion-body">
                         ${qnaData[i].content}
                            <div class="form-button-container">
                                <span class="btn btn-sm form-button" data-num="${i}">수정</span>
                                <span class="btn btn-sm delete_button" data-num="${i}">삭제</span>
                             </div>
                        </div>
                    </div>
                </div>`
            );
        }else {
            $(".board-list").append(
                /*html*/
                `<div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="board d-flex align-item-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                            <p class="post-title">${qnaData[i].title}</p>
                            <p class="flex-grow-1 text-center">${qnaData[i].date}</p>
                            <p id="post-status${i}" class="flex-grow-1 text-center">${qnaData[i].status}</p>
                        </button>
                    </h2>
                    <div id="collapse${i}" class="accordion-collapse collapse">
                        <div id="content${i}" class="accordion-body">
                            ${qnaData[i].content}
                            <hr>
                            ${qnaData[i].answer}
                        </div>
                    </div>
                </div>`
            );
        }
    }

    renderPagination(); // 페이지네이션을 렌더링
    formButton();
    completeButton();
}

// 페이지네이션을 렌더링
function renderPagination() {
    $(".pagination").empty();
    var totalPages = Math.ceil(qnaData.length / itemsPerPage);

    for (var i = 1; i <= totalPages; i++) {
        $(".pagination").append(
            /*html*/
            `<button class="page-link">${i}</button>`
        );
    }
// 페이지 링크 클릭 시 해당 페이지를 렌더링하는 이벤트 등록
    $(".page-link").on("click", function () {
        var page = $(this).text();
        renderMyqnaPage(page);
    });
}

// QnA 페이지초기 렌더링 함수
function uploadMyQnaPage() {
    makeJson();
    qnaData = JSON.parse(localStorage.getItem("qna"));
    $("#board-container").empty().append(
            /*html*/
            `<div class="board-top d-flex align-items-center">
        <p id="just-title">제목</p>
        <p class="flex-grow-1">작성일</p>
        <p class="flex-grow-1">답변상태</p>
    </div>
    <div class="board-list">
        
    </div>
    
    
    <div class="d-flex justify-content-center">
        <div class="pagination">
        
        </div>
    </div>`
        );
    $("#cmp-container").remove();

    renderMyqnaPage(1);
}

$(document).ready(function () {
    uploadMyQnaPage();
    $("#board-container").append(
        /*html*/
        `<div id="inq-btn-container" class="d-flex justify-content-end mb-3">
        <p class="btn inquiry-button ajax-btn" data-js="../js/myqna-form.js">문의하기</p>
    </div>`
    );
});
