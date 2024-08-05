/* ===== 페이지 이동 url 생성 =====  */
function findIdPw(type) {
  const baseUrl = "/html/find.html"; // 페이지를 이동 URL 생성
  const url = `${baseUrl}?type=${type}`;

  window.location.href = url; // 페이지 이동
}

/* ===== 아이디 || 비밀번호 찾기 ===== */
function findPage() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let type = param.get("type");

  let findIdH2 = document.querySelector("#find-id-h2");
  let findPwh2 = document.querySelector("#find-pw-h2");
  let findName = document.querySelector("#find-name");
  let findId = document.querySelector("#find-id");

  if (type == "id") {
    findIdH2.style.display = "block";
    findPwh2.style.display = "none";
    findName.style.display = "block";
    findId.style.display = "none";
  } else if (type == "pw") {
    findIdH2.style.display = "none";
    findPwh2.style.display = "block";
    findName.style.display = "none";
    findId.style.display = "block";
  }
}

/* ===== 휴대폰 || 이메일 인증 ===== */
function certPhoneMail(arg) {
  let phoneDiv = document.querySelector("#find-phone");
  let mailDiv = document.querySelector("#find-email");

  if (arg == "phone") {
    phoneDiv.style.display = "block";
    mailDiv.style.display = "none";
  } else if (arg == "email") {
    phoneDiv.style.display = "none";
    mailDiv.style.display = "block";
  }
}
