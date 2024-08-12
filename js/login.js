/* 회원가입 페이지로 이동 */
function toSignup() {
  window.location.href = "/html/signUp.html";
}

/* id/pw 찾기 페이지로 이동 */
function findIdPw(type) {
  const baseUrl = "/html/find.html"; // 페이지를 이동 URL 생성
  const url = `${baseUrl}?type=${type}`;
  window.location.href = url; // 페이지 이동
}

/* 로그인 처리 */
function loginCheck() {
  if ($("#id").val() != "swura4789" || $("#pw").val() != "mealkit@123") {
    console.log($("#id").val());
    console.log($("#pw").val());
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  } else {
    window.location.href = "../../index.html";
  }
}
