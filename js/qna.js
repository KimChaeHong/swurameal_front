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
        status: "답변대기",
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
var currentPage = 1; // 현재페이지번호 초기화

function makeJson() { // qnaList JSON으로 만들어서 로컬스토리지에 저장
    localStorage.setItem("qna", JSON.stringify(qnaList));
}

function renderPage(page) { // 해당 페이지 내용표시
    currentPage = page;
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    $(".page-upload").empty(); // 내용 들어갈 부분 비우기

    $(".page-upload").append( // 게시판 상단부 생성
        /*html*/
        `<div class="board-top d-flex align-items-center">
          <p id="just-title">제목</p>
          <p class="flex-grow-1">작성일</p>
          <p class="flex-grow-1">답변상태</p>
      </div>`
    );

    for (var i = startIndex; i < endIndex && i < qnaData.length; i++) { // ItemPerPage 만큼 해당 페이지에 게시물 생성
        $(".page-upload").append(
            /*html*/
            `<div class="accordion-item">
              <h2 class="accordion-header">
                  <button class="board d-flex align-item-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                      <p class="post-title">${qnaData[i].title}</p>
                      <p class="flex-grow-1 text-center">${qnaData[i].date}</p>
                      <p id="post-status${i}" class="flex-grow-1 text-center">${qnaData[i].status}</p>
                  </button>
              </h2>
              <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div id="content${i}" class="accordion-body">
                      ${qnaData[i].content}
                      <div class="form-button-container"><span class="btn btn-md form-button" data-num="${i}">답변하기</span></div>
                  </div>
              </div>
          </div>`
        );
    }

    renderPagination(); 

    $(".form-button").on("click", function () { //답변하기 버튼 이벤트 등록
        var num = $(this).data("num");
        var contentDiv = $("#content" + num);

        contentDiv.empty(); //해당하는 content div비우기

        contentDiv.append( //해당하는 content div에 내용 생성
            `${qnaData[num].content}
          <hr>
          <textarea class="text-form" placeholder="답변을 입력하세요"></textarea>
          <p class="btn btn-sm complete-button" data-num="${num}">등록</p>`
        ); // 기존내용이 들어가있는 textarea 생성, 등록완료 버튼 생성
    });

    $(document).on("click", ".complete-button", function () { // 등록 버튼 이벤트 등록 
        var num = $(this).data("num");
        var contentDiv = $("#content" + num);

        contentDiv.empty(); // 해당하는 content div비우기
        contentDiv.append( // 해당하는 content div에 내용 생성
            `${qnaData[Number(num)].content}
          <hr>
          ${qnaData[Number(num)].answer}`
        );
        $(`#post-status${num}`).text("답변완료"); // 답변한 게시물 답변완료로 변경
    });
}

function renderPagination() { // 페이지 이동버튼 생성
  var totalPages = Math.ceil(qnaData.length / itemsPerPage);

  $(".page-upload").append( // 페이지 이동 버튼 담을 div 생성
    /*html*/
    `<div class="pagination"></div>`
  );
  
  for (var i = 1; i <= totalPages; i++) { // 페이지 이동버튼 생성
      $(".pagination").append(
        /*html*/
          `<button class="page-num">${i}</button>`
      );
  }

  //현재 페이지 번호에 active 클래스 부여
  $(".page-num").eq(`${currentPage-1}`).addClass("active");
  
  $(".page-num").on("click", function () { // 버튼 기능 부여
      var page = $(this).text();
      renderPage(page);
  });
}

function uploadQnaPage() { // ajax로 부를 함수 생성 
    makeJson(); 
    qnaData = JSON.parse(localStorage.getItem("qna"));

    const linkCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: `../css/support.css`,
    });

    $("head").append(linkCss); //관리자 페이지에서 불러도 css가 지정했던 support.css것이 적용되도록 설정

    renderPage(1); // 호출 했을 때 1페이지가 호출되도록 설정
    }

$(document).ready(function () {
    uploadQnaPage();
});
