document.addEventListener('DOMContentLoaded', function() {
    fetch('../src/json/goods.json')  // JSON 파일을 불러옵니다.
        .then(response => response.json())  // JSON 데이터를 파싱합니다.
        .then(data => {
            const goodsData = data[0].slice(0, 4);  // 첫 번째 배열에서 처음 4개 항목만 가져옵니다.

            let goodsHTML = '';

            goodsData.forEach(goods => {
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
});
