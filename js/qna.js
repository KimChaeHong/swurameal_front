qnaList = [
    { title: "문의1", content: "내용1", date: "2024.08.10", status: "답변대기" },
    { title: "문의2", content: "내용2", date: "2024.08.11", status: "답변대기" },
    { title: "문의3", content: "내용3", date: "2024.08.12", status: "답변대기" },
    { title: "문의4", content: "내용4", date: "2024.08.13", status: "답변대기" },
    { title: "문의5", content: "내용5", date: "2024.08.14", status: "답변대기" },
  ];
  
  function makeJson() {
    localStorage.setItem("qna", JSON.stringify(qnaList));
  }
  
  function uploadQnaPage() {
    makeJson();
    qnaData = JSON.parse(localStorage.getItem("qna"));
  
    $(".accordion").empty();
    for (var i = 0; i < qnaData.length; i++) {
      $(".accordion").append(
        /*html*/
        `<div class="accordion-item">
          <h2 class="accordion-header">
            <button class="board d-flex align-item-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                <p class="post-title">${qnaData[i].title}</p>
                <p class="flex-grow-1 text-center">${qnaData[i].date}</p>
                <p class="flex-grow-1 text-center">${qnaData[i].status}</p>
            </button>
          </h2>
          <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div id="content${i}" class="accordion-body">
              ${qnaData[i].content}
              <div class="form-button-container"><span class="btn btn-sm form-button" data-num="${i}">수정</span><span class="btn btn-sm delete-button" data-num="${i}">삭제</span></div>
            </div>
          </div>
        </div>`
      );
    }
  }
  
  $(document).ready(function () {
    $(".form-button").on("click", function () {
      var num = $(this).data("num");
  
      var contentDiv = $("#content" + num);
  
      contentDiv.empty();
  
      contentDiv.append(
        /*html*/
        `<textarea class="text-form"></textarea>
          <p class="btn btn-sm complete-button">완료</p>`
      );
    });
  });