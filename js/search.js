document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const itemList = document.getElementById('itemList');

    const data = [
        {
            "goodsId": "211",
            "goodsName": "바질페스토파스타",
            "mainImg": "../src/images/211.jpg",
            "category": "파스타",
            "price": 11900,
            "goodsComment": "신선하고 향긋한 콜드 파스타"
        },
        {
            "goodsId": "212",
            "goodsName": "볼로네제 라자냐",
            "mainImg": "../src/images/212.jpg",
            "category": "파스타",
            "price": 12900,
            "goodsComment": "진한 토마토와 고기의 풍미"
        },
        {
            "goodsId": "213",
            "goodsName": "크림 뇨끼",
            "mainImg": "../src/images/213.jpg",
            "category": "파스타",
            "price": 7900,
            "goodsComment": "감자맛이 고소하게 나는"
        },
        // JSON 데이터 생략...
    ];

    function renderItems(items) {
        itemList.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.mainImg}" alt="${item.goodsName}">
                <div>
                    <h5>${item.goodsName}</h5>
                    <p>${item.goodsComment}</p>
                    <p><strong>가격:</strong> ${item.price.toLocaleString()}원</p>
                </div>
            `;
            itemList.appendChild(listItem);
        });
    }

    function filterItems() {
        const query = searchInput.value.toLowerCase();
        const filteredItems = data.filter(item => item.goodsName.toLowerCase().includes(query));
        renderItems(filteredItems);
    }

    // 초기 렌더링
    renderItems(data);

    searchButton.addEventListener('click', filterItems);

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterItems();
        }
    });
});
