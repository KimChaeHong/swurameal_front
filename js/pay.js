/* 개인정보 및 결제 동의: 체크버튼 */
window.onload = () => {
  const allBtn = document.querySelector("#allBtn");
  const btns = document.querySelectorAll(".bi");
  const notAllBtn = document.querySelectorAll(".bi:not(#allBtn)");

  // 개별 체크 버튼
  document.querySelectorAll(".bi:not(#allBtn)").forEach((el) =>
    el.addEventListener("click", (e) => {
      let classes = e.target.classList;
      classes.toggle("bi-square");
      classes.toggle("bi-check-square-fill");

      // 아래 3개 모두 체크 -> 전체선택 버튼 체크
      // 아래 3개 중, 하나라도 체크 해제 -> 전체선택 버튼 체크 해제
      let flag = true;
      for (let btn of notAllBtn) {
        if (btn.classList.contains("bi-square")) flag = false;
      }

      flag
        ? (allBtn.className = "bi bi-check-square-fill")
        : (allBtn.className = "bi bi-square");
    })
  );

  // 전체 체크 버튼
  allBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-square")) {
      btns.forEach((el) => {
        el.classList.remove("bi-square");
        el.classList.add("bi-check-square-fill");
      });
    } else {
      btns.forEach((el) => {
        el.classList.add("bi-square");
        el.classList.remove("bi-check-square-fill");
      });
    }
  });
};

/* 결제하기 버튼 유효성 검사 */
function pay() {
  const btns = document.querySelectorAll(".bi");
  let flag = true;

  for (let btn of btns) {
    if (!btn.classList.contains("bi-check-square-fill")) flag = false;
  }

  if (!flag) {
    alert("개인정보 및 결제 동의 사항을 확인하여 주십시오.");
  } else {
    alert("결제가 완료되었습니다.");
    window.location.href = "../../index.html";
  }
}
