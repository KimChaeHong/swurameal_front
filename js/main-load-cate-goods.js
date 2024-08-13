document.addEventListener('DOMContentLoaded', function() {
    fetch('./src/json/goods.json')  // JSON 파일을 불러옵니다.
        .then(response => response.json())  // JSON 데이터를 파싱합니다.
        .then(data => {
            const categories = [
                { idPrefix: '1', comment: '🍜 학교 앞에서 먹던 추억의 분식' },
                { idPrefix: '2', comment: '🍝 이번 주말 홈 파티 어때요?' },
                { idPrefix: '3', comment: '🍲 엄마의 손맛을 자취방에서 느끼기' },
                { idPrefix: '4', comment: '🍶 05년생 미만 아가들은 가라' }
            ];

            const container = document.querySelector('main'); // 동적으로 요소를 추가할 컨테이너

            categories.forEach(category => {
                // 해당 카테고리의 상품 필터링
                const filteredGoods = data[0].filter(goods => goods.goodsId.startsWith(category.idPrefix)).slice(0, 4);

                if (filteredGoods.length > 0) {
                    // 카테고리 브랜딩 HTML 생성
                    const categoryBrandingHTML = `
                        <div class="category-branding">
                            <span class="category-comment">${category.comment}</span>
                            <a type="button" class="category-move" href="./html/category.html">
                                <i class="bi bi-chevron-right icon-move"></i>
                            </a>
                        </div>
                    `;

                    // 상품 목록 HTML 생성
                    let goodsHTML = '<div class="goods-list">';
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
                    goodsHTML += '</div>'; // goods-list 닫기

                    // 생성된 카테고리 브랜딩과 상품 목록을 컨테이너에 추가
                    container.insertAdjacentHTML('beforeend', categoryBrandingHTML + goodsHTML);
                }
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});