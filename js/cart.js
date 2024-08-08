let checked = false;
let checkBtn = document.querySelectorAll("i:not(.fa-x)");
let selfCheckBtn = document.querySelectorAll("i:not(#allBtn):not(.fa-x)");

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

// 상품 꺼내기

/* 상품 수량 증가 || 감소 */

const priceBox = document.querySelector("");

const itemCnt = document.querySelector(".one");
let cnt = parseInt(itemCnt.innerText);

const itemPrice = document.querySelector(".one-price");
const itemSalePrice = document.querySelector(".one-price-sale");

let price = parseInt(itemPrice.innerText);
let salePrice = parseInt(itemSalePrice.innerText);

function increse() {
  cnt += 1;
  itemCnt.innerText = cnt;
  price = price * 2;
  salePrice = salePrice * 2;
  itemPrice.innerText = price;
  itemSalePrice.innerText = salePrice;
}

function decrese() {
  if (cnt > 1) {
    cnt -= 1;
    itemCnt.innerText = cnt;
    price = price / 2;
    salePrice = salePrice / 2;
    itemPrice.innerText = price;
    itemSalePrice.innerText = salePrice;
  }
}

// const cntBox = document.querySelector(".cnt-btn");
// function changeCnt(e) {
//   let cnt = e.target;
// }

// const itemCountElement = document.getElementById("item-count");
// const itemPriceElement = document.getElementById("item-price-regular");
// const itemSalePriceElement = document.getElementById("item-price-sale");

// let itemCount = parseInt(itemCountElement.innerText, 10);
// let itemPrice = parseInt(itemPriceElement.innerText, 10);
// let itemSalePrice = parseInt(itemSalePriceElement.innerText, 10);

// function updatePrices(count) {
//   itemPriceElement.innerText = itemPrice * count;
//   itemSalePriceElement.innerText = itemSalePrice * count;
// }

// function changeCnt(num) {
//   const newCount = itemCount + num;
//   if (newCount >= 1) {
//     itemCount = newCount;
//     itemCountElement.innerText = itemCount;
//     updatePrices(itemCount);
//   }
// }
