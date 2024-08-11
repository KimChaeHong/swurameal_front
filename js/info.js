function uploadInfoPage() {
    userdata = JSON.parse(localStorage.getItem("user"));
    infoPageHtml =
        /*html*/
        `<div class="form-container">
            <form action="your-server-endpoint" method="POST">
                <div class="form-group">
                    <label for="userid">아이디</label>
                    <input type="text" id="userid" name="userid" value=${userdata.id} readonly>
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
                    <input type="text" id="name" name="name" value=${userdata.name}>
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" id="email" name="email" value=${userdata.email}>
                </div>
                <div class="form-group">
                    <label for="phone">전화번호</label>
                    <input type="tel" id="phone" name="phone" value=${userdata.phone}>
                </div>
                <div class="form-group">
                    <label for="address">주소</label>
                    <div class="address-group">
                        <input type="text" id="address" name="address" value='${userdata.address}'>
                        <button class="address-button">주소 검색</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="birthdate">생년월일</label>
                    <input type="date" id="birthdate" name="birthdate" value=${userdata.birth}>
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
