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
        <button class="cnt-down">-</button>
        <span class="item-cnt">1</span>
        <button class="cnt-up">+</button>
        </div>
        </div>
        <div id="item-price">
        <span 
          class="price" 
          data-price="${datas[i].price}">${datas[i].price.toLocaleString()}
        </span>원
        </div>
        <i class="bi bi-x-lg hover"></i>
      </div>
      `);
  }
  countItem();

  // 화면 출력 완료를 알리는 함수
  const event = new CustomEvent("cartItemsLoaded");
  document.dispatchEvent(event);
}

function countItem() {
  /* 상품 갯수 증가 */
  $(".cnt-up").click(function () {
    const item = $(this).closest(".item");
    const itemCnt = item.find(".item-cnt");
    const itemPrice = item.find(".price");

    let cnt = parseInt(itemCnt.text(), 10);
    let price = parseFloat(itemPrice.text().replace(/,/g, ""));
    const originPrice = parseInt(itemPrice.data("price")); // 원래 가격

    cnt += 1;
    price = originPrice * cnt;

    itemCnt.text(cnt);
    itemPrice.text(price.toLocaleString());
  });

  /* 상품 갯수 감소 */
  $(".cnt-down").click(function () {
    const item = $(this).closest(".item");
    const itemCnt = item.find(".item-cnt");
    const itemPrice = item.find(".price");

    let cnt = parseInt(itemCnt.text(), 10);
    let price = parseFloat(itemPrice.text().replace(/,/g, ""));
    const originPrice = parseInt(itemPrice.data("price")); // 원래 가격

    if (cnt > 1) {
      cnt -= 1;
      price = originPrice * cnt;

      itemCnt.text(cnt);
      itemPrice.text(price.toLocaleString());
    }
  });
}

printItems();
