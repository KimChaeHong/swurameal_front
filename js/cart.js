let checked = false;
let checkBtn = document.querySelectorAll("i");
let selfCheckBtn = document.querySelectorAll("i:not(#allBtn)");

/* 전체선택 || 전체해제 */
function choiceAll() {
  checked = !checked; // 체크상태 토글

  checkBtn.forEach(
    (el) =>
      (el.className = checked
        ? "fa-solid fa-circle-check"
        : "fa-regular fa-circle-check")
  );
}

/* 개별아이템 선택 || 해제 */
selfCheckBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    let icon = e.target;
    icon.className = icon.classList.contains("fa-solid")
      ? "fa-regular fa-circle-check"
      : "fa-solid fa-circle-check";
  })
);

/* 수량 증가 || 감소 */
let cnt = document.querySelector(".one").innerText;

function increse() {
  cnt = parseInt(cnt) + 1;
}

function decrese() {
  cnt = parseInt(cnt) - 1;
}
