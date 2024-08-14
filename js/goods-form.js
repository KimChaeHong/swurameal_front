const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--theme");
const darkgrayColor = getComputedStyle(document.documentElement).getPropertyValue("--darkgray");

function uploadGoodsFormPage(goodsInfo) {
    const goodsFormContent = goodsFormContentUpload(goodsInfo);
    $(".page-upload").html(goodsFormContent);
    if (goodsInfo != "undefined") {
        $("#goods-category").val(undefinedCheck(goodsInfo?.category));
        if (goodsInfo?.stockStatus == 0) $(".sold-out").css({ color: "white", "background-color": darkgrayColor });
        if (goodsInfo?.status.trim() == "품절") $(".seller-sold-out").css({ color: "white", "background-color": darkgrayColor });
        else $(".sale").css({ color: "white", "background-color": darkgrayColor });
    }

    //페이지에 css 적용시키기
    const goodsCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/goods-form.css",
    });
    $("head").append(goodsCss);

    validation();

    fileSelect();

    $(".seller-sold-out, .sale").on("click", (e) => {
        e.preventDefault();
        $(e.target).css({ color: "white", "background-color": darkgrayColor });
        $(e.target).siblings("button").css({ color: darkgrayColor, "background-color": "white" });
    });

    /*prettier-ignore*/
    $("#goods-comment").hover(function(e) {
        $("#comment-tooltip").text($(this).attr("data-comment")).css({
            top: e.pageY + 10 + "px", 
            left: e.pageX + 10 + "px",
            display: "block"
        });
    }, function() {
        $("#comment-tooltip").hide();
    });
}

function undefinedCheck(info) {
    return info || "";
}
function goodsFormContentUpload(data) {
    //기본 틀이 되는 html
    /*prettier-ignore */
    const content =
        /*html*/
        `<div class="form-container">
            <form action="your-server-endpoint" method="POST">
                <div class="form-group">
                    <label for="goodsid">상품ID<span class="rq">*</span></label>
                    <input type="text" id="goodsid" name="goodsid" value="${undefinedCheck(data?.goodsId)}" placeholder="숫자 3개를 입력해주세요." required>
                </div>
                <div class="form-group">
                    <label for="goods-name">상품명<span class="rq">*</span></label>
                    <input type="text" id="goods-name" name="goods-name" value="${undefinedCheck(data?.goodsName)}" placeholder="상품명" required >
                </div>
                <div class="form-group">
                    <label for="rep-img">대표 이미지<span class="rq">*</span></label>
                    <input type="file" id="rep-img">
                    <div id="rep-img-input">${undefinedCheck(data?.mainImg.split("/").pop())}</div>
                    <button type=button class="file-select" data-btn="rep-img" required>파일 선택</button>
                </div>
                <div class="form-group">
                    <label for="description-img">상세설명 이미지<span class="rq">*</span></label>
                    <input type="file" id="description-img">
                    <div id="description-img-input">${undefinedCheck(data?.goodsImg)}</div>
                    <button type=button class="file-select" data-btn="description-img" required>파일 선택</button>
                </div>
                <div class="form-group">
                    <label for="detail-img">상세설명 이미지<span class="rq">*</span></label>
                    <input type="file" id="detail-img">
                    <div id="detail-img-input">${undefinedCheck(data?.goodsDetailImg)}</div>
                    <button type=button class="file-select" data-btn="detail-img" required>파일 선택</button>
                </div>
                <div class="form-group">
                    <label for="goods-category">카테고리<span class="rq">*</span></label>
                    <select id="goods-category" name="goods-category" required>
                        <option value="" disabled selected>카테고리를 선택하세요</option>
                        <option value="분식">분식</option>
                        <option value="양식">양식</option>
                        <option value="한식">한식</option>
                        <option value="전통주">전통주</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="goods-price">가격<span class="rq">*</span></label>
                    <input type="text" id="goods-price" name="goods-price" value="${undefinedCheck(data?.price)}">
                </div>
                <div class="form-group">
                    <label for="goods-comment">제품 코멘트<span class="rq">*</span></label>
                    <input type="text" id="goods-comment" name="goods-comment" value="${undefinedCheck(data?.goodsComment)}" required placeholder="제품 코멘트 한 줄">
                </div>
                <div class="form-group">
                    <label for="goods-origin">원산지<span class="rq">*</span></label>
                    <input type="text" id="goods-origin" name="goods-origin"required value="${undefinedCheck(data?.origin)}">
                </div>
                <div class="form-group">
                    <label for="order-info">배송정보<span class="rq">*</span></label>
                    <input type="text" id="order-info" name="order-info" required value="${undefinedCheck(data?.deliveryInfo)}">
                </div>
                <div class="form-group">
                    <label for="seller">판매자<span class="rq">*</span></label>
                    <input type="text" id="seller" name="seller" required value="${undefinedCheck(data?.seller)}">
                </div>
                <div class="form-group">
                    <label for="sales-unit">판매단위<span class="rq">*</span></label>
                    <input type="text" id="sales-unit" name="sales-unit" required value="${undefinedCheck(data?.saleUnit)}">
                </div>
                <div class="form-group">
                    <label for="goods-weight">중량/용량<span class="rq">*</span></label>
                    <input type="text" id="goods-weight" name="goods-weight" required value="${undefinedCheck(data?.weight)}">
                </div>
                <div class="form-group">
                    <label for="goods-stockStatus">재고상태(품절 여부)<span class="rq">*</span></label>
                    <input type="text" id="goods-stockStatus" name="goods-stockStatus" required value="${undefinedCheck(data?.stockStatus)}">
                    <button type=button class="sold-out" disabled>품절</button>
                </div>
                <div class="form-group">
                    <label for="goods-Status">상태(판매/품절)<span class="rq">*</span></label>
                    <button type=button class="sale">판매</button>
                    <button type=button class="seller-sold-out">품절</button>
                </div>
                <div class="buttons">
                    <button type=button class="goods-delete">삭제</button>
                    <button type=button class="goods-update">수정</button>
                </div>
            </form>
        </div>`;
    return content;
}
function fileSelect() {
    $(".file-select").on("click", (e) => {
        e.preventDefault();
        const fileId = $(e.target).attr("data-btn");
        $(`#${fileId}`).click();

        $(`#${fileId}`).on("change", (e) => {
            const file = e.target.files[0];
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
    const onlyKor = /^[ㄱ-ㅎ가-힣]+$/;
    // 상품id 유효성 검사
    // 숫자만 3글자 이내로
    $("#goodsid").on("change", (e) => {
        const val = e.target.value;
        if (val.length > 3) {
            alert("3글자 이내로 작성해 주세요");
            $("#goodsid").focus();
        } else if (!onlyNum.test(val)) {
            alert("상품ID는 숫자로만 작성해 주세요.");
            $("#goodsid").focus();
        }
    });

    // 상품명 유효성 검사
    // 100글자 이내, 영어 한글 숫자만
    $("#goods-name").on("change", (e) => {
        const val = e.target.value;
        if (val.legnth > 100) {
            alert("상품명은 100글자 아래로 작성해 주세요.");
            $("#goods-name").focus();
        } else if (!korEngNum.test(val)) {
            alert("상품명은 한글, 영문, 숫자로만 작성해 주세요.");
            $("#goods-name").focus();
        }
    });

    //가격 숫자만
    $("#goods-price").on("change", (e) => {
        const val = e.target.value;
        if (!onlyNum.test(val)) {
            alert("숫자만 입력해 주세요.");
            e.target.focus();
        } else if (val.length < 3) {
            alert("100원 이상 입력해 주세요");
            e.target.focus();
        }
    });

    $("#goods-comment").on("change", (e) => {
        const val = e.target.value;
        if (val.legnth > 100) {
            alert("코멘트는 100글자 아래로 작성해 주세요.");
            $("#goods-comment").focus();
        }
    });

    $("#goods-origin").on("change", (e) => {
        const val = e.target.value;
        if (!onlyKor.test(val)) {
            alert("한글로 작성해 주세요.");
            $("#goods-origin").focus();
        }
    });

    $("#seller").on("change", (e) => {
        const val = e.target.value;
        if (!korEngNum.test(val)) {
            alert("한글 영문 숫자만 사용해 주세요");
            $("#seller").focus();
        }
    });

    $("#sales-unit").on("change", (e) => {
        const val = e.target.value;
        if (!onlyNum.test(val)) {
            alert("숫자만 입력해 주세요.");
            $("#sales-unit").focus();
        } else if (val < 1) {
            alert("0이상의 값을 입력해 주세요.");
            $("#sales-unit").focus();
        }
    });

    $("#goods-weight").on("change", (e) => {
        const val = e.target.value;
        if (!onlyNum.test(val)) {
            alert("숫자만 입력해주세요.");
            $("#goods-weight").focus();
        } else if (val < 1) {
            alert("0이상의 값을 입력해주세요.");
            $("#goods-weight").focus();
        }
    });

    $("#goods-stockStatus").on("change", (e) => {
        const val = e.target.value;
        if (val < 0) {
            alert("0이상의 값을 입력해 주세요.");
            $("#goods-stockStatus").focus();
        } else if (!onlyNum.test(val)) {
            alert("숫자만 입력해 주세요.");
            $("#goods-stockStatus").focus();
        }

        if (val === "0") {
            $(".sold-out").css({ color: "white", "background-color": darkgrayColor });
        } else if (val > 0) $(".sold-out").css({ color: darkgrayColor, "background-color": "white" });
    });
}
