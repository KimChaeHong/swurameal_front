document.addEventListener("DOMContentLoaded", function () {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let isLoggedIn = param.get("login");

  const loggedOutLinks = document.getElementById("logged-out-links");
  const loggedInLinks = document.getElementById("logged-in-links");

  if (isLoggedIn == "true") {
    // 로그인 상태
    loggedOutLinks.style.display = "none";
    loggedInLinks.style.display = "flex";
  } else {
    // 로그아웃 상태
    loggedOutLinks.style.display = "flex";
    loggedInLinks.style.display = "none";
  }

  // 로그아웃 시 예시 이벤트
  document.getElementById("logout-link").addEventListener("click", function () {
    confirm("로그아웃하시겠습니까?") && (window.location.href = "/index.html");
  });
});
