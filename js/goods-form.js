function uploadGoodsFormPage() {
    //기본 틀이 되는 html
    const goodsFormContent =
        /*html*/
        `<div class="form-container">
            <form action="your-server-endpoint" method="POST">
                <div class="form-group">
                    <label for="goodsid">상품ID</label>
                    <input type="text" id="goodsid" name="goodsid" value="">
                </div>
                <div class="form-group">
                    <label for="goods-name">상품명</label>
                    <input type="text" id="goods-name" name="goods-name">
                </div>
                <div class="form-group">
                    <label for="rep-img">대표 이미지</label>
                    <input type="file" id="rep-img" name="rep-img">
                </div>
                <div class="form-group">
                    <label for="description-img">상세설명 이미지</label>
                    <input type="file" id="description-img" name="description-img">
                </div>
                <div class="form-group">
                    <label for="detail-img">상세설명 이미지</label>
                    <input type="file" id="detail-img" name="detail-img">
                </div>
                <div class="form-group">
                    <label for="goods-category">카테고리</label>
                    <input type="text" id="goods-category" name="goods-category" value="">
                </div>
                <div class="form-group">
                    <label for="goods-price">가격</label>
                    <input type="text" id="goods-price" name="goods-price" value="">
                </div>
                <div class="form-group">
                    <label for="goods-comment">전화번호</label>
                    <input type="text" id="goods-comment" name="goods-comment" value="">
                </div>
                <div class="form-group">
                    <label for="order-info">배송정보</label>
                    <input type="text" id="order-info" name="order-info" value=''>
                </div>
                <div class="form-group">
                    <label for="seller">판매자</label>
                    <input type="text" id="seller" name="seller" value="">
                </div>
                <div class="form-group">
                    <label for="sales-unit">판매단위</label>
                    <input type="text" id="sales-unit" name="sales-unit" value="">
                </div>
                <div class="form-group">
                    <label for="goods-weight">중량/용량</label>
                    <input type="text" id="goods-weight" name="goods-weight" value="">
                </div>
                <div class="form-group">
                    <label for="goods-stockStatus">재고상태(품절 여부)</label>
                    <input type="text" id="goods-stockStatus" name="goods-stockStatus" value="">
                    <button class="sold-out">품절</button>
                </div>
                <div class="form-group">
                    <label for="goods-stockStatus">상태(판매/품절)</label>
                    <button class="sale">판매</button>
                    <button class="sold-out">품절</button>
                </div>
                <div class="buttons">
                    <button class="goods-delete">삭제</button>
                    <button class="goods-update">수정</button>
                </div>
            </form>
        </div>`;

    $(".page-upload").html(goodsFormContent);
    //페이지에 css 적용시키기
    const goodsCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/goods-form.css",
    });
    $("head").append(goodsCss);
}
