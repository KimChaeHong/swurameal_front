function uploadPage() {
    userdata = JSON.parse(localStorage.getItem("user"));
    const infoPageHtml =
        /*html*/
        `<div class="form-container">
            <form action="your-server-endpoint" method="POST">
                <div class="form-group">
                    <label for="userid">아이디</label>
                    <input type="text" id="userid" name="userid" value=${userdata.id} readonly>
                </div>
                <div class="form-group">
                    <label for="current-password">비밀번호</label>
                    <input type="password" id="current-password" placeholder="비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="new-password">새 비밀번호</label>
                    <input type="password" id="new-password" placeholder="새 비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="confirm-password">새 비밀번호 확인</label>
                    <input type="password" id="confirm-password" placeholder="새 비밀번호를 다시 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name" value=${userdata.name}>
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" id="email" value=${userdata.email}>
                </div>
                <div class="form-group">
                    <label for="phone">전화번호</label>
                    <div class="phone-group">
                        <input type="tel" id="phone" value=${userdata.phone}>
                        <button class="phone-button">인증번호</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="address">주소</label>
                    <div class="address-group">
                        <input type="text" id="address" name="address" value='${userdata.address}'>
                        <button class="address-button" >주소 검색</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="birthday">생년월일</label>
                    <input type="date" id="birthday" name="birthday" value="${userdata.birth}" min="1900-01-01" max="2024-12-31">
                </div>
                <div class="buttons">
                    <button class="delete-button">탈퇴하기</button>
                    <button class="save-button">회원 정보 수정</button>
                </div>
            </form>
        </div>`;

    //개인정보 수정페이지 css불러오기
    const infoCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/info.css",
    });
    $("head").append(infoCss);

    //page-upload 클래스에 infoPageHtml을 넣는다.
    $(".page-upload").html(infoPageHtml);

    // 만약 .form-container안에 있는 address-button이 클릭된다면
    // 기본 이벤트를 막고 주소 검색하는 창을 띄운다.
    $(".form-container").on("click", ".address-button", function (e) {
        e.preventDefault();
        searchAddress();
    });

    // 수정버튼이 눌렸을 때 벌어지는 이벤트
    $(".form-container").on("click", ".save-button, .phone-button", (e) => {
        e.preventDefault();
        alert("수정되었습니다.");
    });

    // 삭제버튼이 눌렸을 때 벌어지는 이벤트
    $(".form-container").on("click", ".delete-button", function (e) {
        e.preventDefault();
        alert("정말로 탈퇴하시겠습니까?");
    });

    // 유효성 검사
    validation();
}

// 유효성 검사
function validation() {
    $("#current-password").on("change", (e) => {
        let val = e.target.value;
        if (val !== "mealkit@123") {
            alert("비밀번호를 틀렸습니다.");
            $("#current-password").focus();
        }
    });
    /* 비밀번호 */
    // 8글자 이상, 영문, 숫자, 특수문자 각 1글자 이상 사용
    $("#new-password").on("change", (e) => {
        let val = e.target.value;
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/;
        if (val.length < 8) {
            alert("비밀번호는 8글자 이상 작성해 주세요.");
            $("#new-password").focus();
        } else if (!pattern.test(val)) {
            alert("비밀번호는 영문, 숫자, 특수문자를 모두 사용하여 작성해 주세요.\n(특수문자는 @, $, !, %, *, #, ?, & 만 사용 가능합니다.)");
            $("#new-password").focus();
        }
    });
    /* 비밀번호 확인 */
    // 비밀번호 값과 일치 여부
    $("#confirm-password").on("change", (e) => {
        console.log(e.target.value);
        console.log($("#new-password").val());
        let val = e.target.value;
        let pw = $("#new-password").val();
        if (val != pw) {
            alert("비밀번호와 일치하지 않습니다.");
            $("#confirm-password").focus();
        }
    });

    /* 이메일 */
    // '@'의 앞/뒤 구간이 알파벳 or 숫자 조합
    //  '.' 뒤가 알파벳
    $("#email").on("change", (e) => {
        let val = e.target.value;
        const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z\-]+/;
        if (!pattern.test(val)) {
            alert("이메일 형식에 맞게 작성해 주세요.\n(예: swura@meal.com)");
            $("#email").focus();
        }
    });

    /* 휴대폰 번호 */
    // '-'을 기준으로 첫번째 구간이 01[0,1,6,7,8,9]중 하나인지 체크
    // '-'을 기준으로 두번째 구간이 숫자 3~4 자리로 이루어져 있는지 체크
    // '-'을 기준으로 세번째 구간이 숫자 4자리로 이루어져 있는지 체크
    $("#phone").on("change", (e) => {
        let val = e.target.value;
        const pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        if (!pattern.test(val)) {
            alert("휴대폰 번호 형식에 맞게 작성해 주세요.\n(예: 010-1234-5678)");
            $("#phone").focus();
        }
    });

    let minDate = "";
    let curDate = "";
    let maxDate = "";
    $("#birthday").on("input", (e) => {
        curDate = new Date(e.target.value);
        minDate = new Date(e.target.min);
        maxDate = new Date(e.target.max);

        if (curDate.getFullYear() > 1000 && (curDate < minDate || curDate > maxDate)) {
            alert("날짜는 1900-01-01과 2024-12-31 사이여야 합니다.");
            e.target.value = `${userdata.birth}`;
            $("#birthday").focus();
        }
    });
}

function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ""; // 메인 주소
            let extraAddr = ""; // 기타 주소

            //선택한 주소 타입(R: 도로명 주소) || J: 지번주소))에 따라 해당 주소 값을 가져온다.
            addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

            // 주소가 도로명 타입일때 기타 주소(extraAddr) 설정
            if (data.userSelectedType === "R") {
                // 법정동명이 있을 경우 추가(마지막 문자 "동/로/가")
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가
                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
            }

            // 주소 정보를 주소 필드에 넣음
            document.getElementById("address").value = addr + extraAddr;
            // 커서를 주소 필드로 이동
            document.getElementById("address").focus();
        },
    }).open();
}
