/* 결제페이지로 이동 */
function topay() {
  location.href = "/html/pay.html";
}

/* 화면 출력이 완료되면... */
document.addEventListener("cartItemsLoaded", () => {
  /* 장바구니 상품 선택 || 전체선택 버튼 */
  const allBtn = document.querySelector("#allBtn");
  const allBtnTxt = document.querySelector("#allBtnTxt");
  const btns = document.querySelectorAll(".bi");
  const notAllBtn = document.querySelectorAll(".bi:not(#allBtn)");
  console.log(notAllBtn);

  // 개별 체크 버튼
  notAllBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      let classes = e.target.classList;
      classes.toggle("bi-check-circle-fill");
      classes.toggle("bi-check-circle");

      // 아래 3개 모두 체크 -> 전체선택 버튼 체크
      // 아래 3개 중, 하나라도 체크 해제 -> 전체선택 버튼 체크 해제
      let flag = true;
      for (let btn of notAllBtn) {
        if (btn.classList.contains("bi-check-circle")) flag = false;
      }

      flag
        ? (allBtn.className = "bi bi-check-circle-fill hover")
        : (allBtn.className = "bi bi-check-circle hover");
    })
  );

  // 전체 체크 버튼
  allBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-check-circle")) {
      btns.forEach((el) => {
        el.classList.remove("bi-check-circle");
        el.classList.add("bi-check-circle-fill");
      });
    } else {
      btns.forEach((el) => {
        el.classList.add("bi-check-circle");
        el.classList.remove("bi-check-circle-fill");
      });
    }
  });

  // 전체 선택 버튼(span text)
  allBtnTxt.addEventListener("click", (e) => {
    if (allBtn.classList.contains("bi-check-circle")) {
      btns.forEach((el) => {
        el.classList.remove("bi-check-circle");
        el.classList.add("bi-check-circle-fill");
      });
    } else {
      btns.forEach((el) => {
        el.classList.add("bi-check-circle");
        el.classList.remove("bi-check-circle-fill");
      });
    }
  });

  /* 주문내역 상품금액 || 결제예정 금액 */

  document.querySelector("main").addEventListener("click", (e) => {
    const payPriceEl = document.querySelector("#pay-price");
    const totalEl = document.querySelector("#total-price");
    const checkedBtnList = document.querySelectorAll(
      ".bi-check-circle-fill:not(#allBtn)"
    );

    let totalPrice = 0;
    let priceList = [];
    checkedBtnList.forEach((el) => {
      const item = el.closest(".item");
      const priceEl = item.querySelector(".price").textContent;
      const itemPrice = parseInt(priceEl.replace(/,/g, ""));
      priceList.push(itemPrice);
    });

    priceList.forEach((num) => {
      totalPrice += num;
    });

    // console.log(totalPrice);
    totalEl.textContent = totalPrice;
    payPriceEl.textContent =
      totalEl.textContent == 0 ? 0 : parseInt(totalEl.textContent) + 3000;
  });
});
