document.addEventListener("DOMContentLoaded", function () {
    const goodsListElement = document.getElementById("goodslist");

    const goodsData = [
        {
            goodsId: "112",
            goodsName: "차돌 떡볶이",
            mainImg: "./src/images/112.png",
            category: "분식",
            price: 9900,
            goodsComment: "우정은 배신하지 않아"
        },
        {
            goodsId: "111",
            goodsName: "즉석 떡볶이",
            mainImg: "./src/images/111.png",
            category: "분식",
            price: 12200,
            goodsComment: "매콤하고~쌉쌀한~"
        },
        {
            goodsId: "116",
            goodsName: "오리지널 떡볶이",
            mainImg: "./src/images/116.png",
            category: "분식",
            price: 6000,
            goodsComment: "학교 앞에서 먹던 추억의 맛"
        },
        {
            goodsId: "131",
            goodsName: "순대",
            mainImg: "./src/images/131.png",
            category: "분식",
            price: 6200,
            goodsComment: "찰싹찰싹 찰순대"
        }
    ];

    let goodsHTML = '<div class="goods-list">';

    goodsData.forEach(goods => {
        goodsHTML += `
            <div class="goods">
                <div class="image">
                    <img src="${goods.mainImg}" alt="${goods.goodsName}">
                </div>
                <div class="button-wrapper">
                    <button>담기</button>
                </div>
                <div class="goods-info">
                    <span class="goods-category">[${goods.category}]</span>
                    <span class="goods-name">${goods.goodsName}</span>
                    <p class="goods-comment">${goods.goodsComment}</p>
                    <span class="dimmed-price">
                        <span class="price-number">${goods.price.toLocaleString()}</span>
                        <span class="won">원</span>
                    </span>
                </div>
            </div>
        `;
    });

    goodsHTML += '</div>';
    goodsListElement.innerHTML = goodsHTML;
});
