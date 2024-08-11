user = {
    id: "test1234",
    pw: "test1234",
    name: "테스트",
    email: "test@test.com",
    휴대폰: "010-0000-0000",
    배송지: "서울특별시 테스트동",
    생년월일: "2024/08/11",
};

function uploadInfoPage() {
    infoPageHtml =
        /*html*/
        `<div class="form-container">
            <form action="your-server-endpoint" method="POST">
                <div class="form-group">
                    <label for="userid">아이디</label>
                    <input type="text" id="userid" name="userid" value="coghd28" readonly>
                </div>
                <div class="form-group">
                    <label for="current-password">비밀번호</label>
                    <input type="password" id="current-password" name="current-password" placeholder="비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="new-password">새 비밀번호</label>
                    <input type="password" id="new-password" name="new-password" placeholder="새 비밀번호를 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="confirm-password">새 비밀번호 확인</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="새 비밀번호를 다시 입력하세요.">
                </div>
                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" value="김이사">
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" id="email" name="email" value="swura@meal.com">
                </div>
                <div class="form-group">
                    <label for="phone">전화번호</label>
                    <input type="tel" id="phone" name="phone" value="010 - 0603 - 4578">
                </div>
                <div class="form-group">
                    <label for="address">주소</label>
                    <div class="address-group">
                        <input type="text" id="address" name="address" value="서울 ○○동 123번지">
                        <button class="address-button">주소 검색</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="birthdate">생년월일</label>
                    <input type="date" id="birthdate" name="birthdate" placeholder="YYYY / MM / DD">
                </div>
                <div class="buttons">
                    <button type="button" class="cancel-button">탈퇴하기</button>
                    <button type="submit" class="save-button">회원 정보 수정</button>
                </div>
            </form>
        </div>`;
    const infoCss = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "../css/info.css",
    });
    $("head").append(infoCss);
    $(".page-upload").html(infoPageHtml);
}
