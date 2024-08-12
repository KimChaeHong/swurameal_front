function uploadGoodsPage() {
    const GoodsContent =
        /*html*/
        `
            <div class="d-flex flex-column">
                <div class="row-header d-flex">
                    <p>ID</p>
                    <p>이미지</p>
                    <p>상품명</p>
                    <p>카테고리</p>
                    <p>가격</p>
                    <p>재고</p>
                    <p>상태</p>
                    <p>선택</p>
                </div>
                <div class="product-list"></div>
            </div>
        `;
    //page-upload할 공간에 집어 넣는 코드(임시로 마이페이지에 구현)
    $(".page-upload").html(GoodsContent);

    //페이지에 css 적용시키기
    const goodsCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/goods.css",
    });
    $("head").append(goodsCss);
}
