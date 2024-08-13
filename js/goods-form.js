function uploadGoodsFormPage() {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
    const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");
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
                    <input type="file" id="rep-img">
                    <div id="rep-img-input"></div>
                    <button class="file-select" data-btn="rep-img">파일 선택</button>
                </div>
                <div class="form-group">
                    <label for="description-img">상세설명 이미지</label>
                    <input type="file" id="description-img">
                    <div id="description-img-input"></div>
                    <button class="file-select" data-btn="description-img">파일 선택</button>
                </div>
                <div class="form-group">
                    <label for="detail-img">상세설명 이미지</label>
                    <input type="file" id="detail-img">
                    <div id="detail-img-input"></div>
                    <button class="file-select" data-btn="detail-img">파일 선택</button>
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
                    <button class="sold-out" disabled>품절</button>
                </div>
                <div class="form-group">
                    <label for="goods-stockStatus">상태(판매/품절)</label>
                    <button class="sale">판매</button>
                    <button class="seller-sold-out">품절</button>
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
    fileSelect();
    $(".seller-sold-out, .sale").on("click", (e) => {
        e.preventDefault();
        $(e.target).css({ color: "white", "background-color": darkgrayColor });
        $(e.target).siblings().css({ color: darkgrayColor, "background-color": "white" });
    });
}

function fileSelect() {
    $(".file-select").on("click", (e) => {
        e.preventDefault();
        const fileId = $(e.target).attr("data-btn");
        $(`#${fileId}`).click();

        $(`#${fileId}`).on("change", (e) => {
            const file = e.target.files[0];
            console.log(file);
            const fileName = $(e.target).val().split("\\").pop() || "선택된 파일 없음";
            const maxSize = 2 * 1024 * 1024; //2MB

            const fileExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!fileExtensions.exec(file.name)) {
                alert(".jpg, .png, .jpeg 파일만 등록해 주세요");
                $(e.target).val("");
                $(`#${fileId}-input`).text("");
            } else if (file.size > maxSize) {
                alert("5MB 미만의 파일만 등록해 주세요.");
                $(e.target).val("");
                $(`#${fileId}-input`).text("");
            } else {
                $(`#${fileId}-input`).text(fileName);
            }
        });
    });
}

function validation() {
    const korEngNum = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const onlyNum = /^[0-9]+$/;

    // 상품명 유효성 검사
    // 100글자 이내, 영어 한글 숫자만
    $(".#goods-name").on("change", (e) => {
        let val = e.target.value;
        if (val.legnth > 100) {
            alert("상품명은 100글자 아래로 작성해 주세요.");
        } else if (!korEngNum.test(val)) {
            alert("상품명은 한글, 영문, 숫자로만 작성해 주세요.");
            $("#goods-name").focus();
        }
    });
}
