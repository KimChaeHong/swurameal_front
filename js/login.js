function toSignup() {
	window.location.href = "/html/signUp.html";
}

/* 페이지 이동 url 생성 */
function findIdPw(type) {
  const baseUrl = "/html/find.html"; // 페이지를 이동 URL 생성
  const url = `${baseUrl}?type=${type}`;
  window.location.href = url; // 페이지 이동
}

