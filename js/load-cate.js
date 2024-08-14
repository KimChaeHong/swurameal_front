function loadGoodsByCategory(category) {
    fetch('../src/json/goods.json')
        .then(response => response.json())
        .then(data => {
            // JSON 데이터에서 category 값에 따라 필터링
            const filteredGoods = data[0].filter(goods => goods.category === category);

            let goodsHTML = '';

            filteredGoods.forEach(goods => {
                goodsHTML += `
                    <div class="goods">
                        <img id="goods-img" src="${goods.mainImg}" class="goods-img" alt="${goods.goodsName}">
                        <div class="button-wrapper">
                            <button class="to-cart"><i class="bi bi-cart icon-margin"></i>담기</button>
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

            const goodsListElement = document.querySelector('.goods-list');
            if (goodsListElement) {
                goodsListElement.innerHTML = goodsHTML;
            } else {
                console.error("'.goods-list' 요소를 찾을 수 없습니다.");
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
}
