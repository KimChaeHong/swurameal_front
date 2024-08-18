/* json 파일 패치 */
async function loadData() {
  const response = await fetch("../src/json/goods.json");
  const data = await response.json();
  return data;
}

/* 장바구니 아이템 출력 */
// json 기준 1~3번째 상품으로 출력하도록 임시로 설정해 둠
async function printItems() {
  const data = await loadData();
  let datas = data[0];

  for (let i = 1; i <= 3; i++) {
    $("#cart-items").append(`
      <div class="item d-flex justify-content-between">
        <i class="bi bi-check-circle hover"></i>
        <img src="${datas[i].mainImg}" alt="상품이미지" />
        <div id="item-detail">
        <p>[${datas[i].category}] ${datas[i].goodsName}</p>
        <p>${datas[i].goodsComment}</p>
        <div class="cnt-btn">
        <button class="updown-btn">-</button>
        <span class="item-cnt">1</span>
        <button class="updown-btn">+</button>
        </div>
        </div>
        <div id="item-price">
        <span 
          class="price" 
          data-price="${datas[i].price}">${datas[i].price.toLocaleString()}
        </span>원
        </div>
        <i class="bi bi-x-lg hover" id="xBtn"></i>
      </div>
      `);
  }
  countItem();
  checkItem();

  // 화면 출력 완료를 알리는 함수
  const event = new CustomEvent("cartItemsLoaded");
  document.dispatchEvent(event);
}

printItems();

/* 상품 갯수 증감에 따른 각 아이템의 가격변동 */
function countItem() {
  $(".updown-btn").click(function () {
    const item = $(this).closest(".item");
    const itemCnt = item.find(".item-cnt");
    const itemPrice = item.find(".price");

    let cnt = parseInt(itemCnt.text(), 10);
    let price = parseFloat(itemPrice.text().replace(/,/g, ""));
    const originPrice = parseInt(itemPrice.data("price")); // 원래 가격

    // '+' 버튼이면 1개 증가 || 아니면 1개 감소
    $(this).text() == "+" ? (cnt += 1) : cnt > 1 && (cnt -= 1);

    price = originPrice * cnt;
    itemCnt.text(cnt);
    itemPrice.text(price.toLocaleString());
    totalPriceOper();
  });
}

/* 선택 || 전체선택 버튼 */
function checkItem() {
  let checkBtn = $(".bi:not(#xBtn, #allBtn, .bi-cart)");

  // 전체선택 버튼
  $("#allBtn, #allBtnTxt").click(function () {
    $("#allBtn").toggleClass("bi-check-circle");
    $("#allBtn").toggleClass("bi-check-circle-fill");

    for (let el of checkBtn) {
      if ($("#allBtn").hasClass("bi-check-circle-fill")) {
        el.classList.add("bi-check-circle-fill");
        el.classList.remove("bi-check-circle");
      } else {
        el.classList.remove("bi-check-circle-fill");
        el.classList.add("bi-check-circle");
      }
      totalPriceOper();
    }
  });

  // 개별선택 버튼
  checkBtn.click(function () {
    for (let el of checkBtn) {
      $(this).toggleClass("bi-check-circle");
      $(this).toggleClass("bi-check-circle-fill");
    }

    // 체크된 아이템의 갯수에 따른 전체선택 버튼 toggle
    let checkedBtn = $(".bi-check-circle-fill:not(#allBtn)");
    if(checkedBtn.length == $(".item").length) {
      $("#allBtn").removeClass("bi-check-circle");
      $("#allBtn").addClass("bi-check-circle-fill");
    } else {
      $("#allBtn").addClass("bi-check-circle");
      $("#allBtn").removeClass("bi-check-circle-fill");
    }

    // checkedBtn.length == $(".item").length
    //   ? $("#allBtn").switchClass("bi-check-circle", "bi-check-circle-fill")
    //   : $("#allBtn").switchClass("bi-check-circle-fill", "bi-check-circle");

    totalPriceOper();
  });
}

/* 전체 가격을 계산 */
function totalPriceOper() {
  const itemList = $(".bi-check-circle-fill:not(#allBtn)").closest(".item");
  const priceList = itemList.find(".price");

  let totalPrice = 0;
  for (let el of priceList) {
    totalPrice += parseInt(el.textContent.replace(/,/g, ""));
  }

  let payPrice = totalPrice == 0 ? 0 : totalPrice + 3000;
  $("#total-price").text(totalPrice.toLocaleString());
  $("#pay-price").text(payPrice.toLocaleString());
}
