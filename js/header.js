document.addEventListener("DOMContentLoaded", function () {
  printHeader();
  const isLoggedIn = localStorage.getItem("login");
  console.log(isLoggedIn);

  const loggedOutLinks = document.getElementById("logged-out-links");
  const loggedInLinks = document.getElementById("logged-in-links");
  const adminLinks = document.getElementById("admin-link");
  const adminHide = document.querySelectorAll(".admin-hide"); // admin 계정일 때, 숨길 것

  if (isLoggedIn != "false") {
    // 로그인 상태
    loggedOutLinks.style.display = "none";
    loggedInLinks.style.display = "flex";
    if (isLoggedIn == "user") {
      adminLinks.style.display = "none"; // user
    } else {
      for (let e of adminHide) e.style.display = "none"; // admin
    }
  } else {
    // 로그아웃 상태
    loggedOutLinks.style.display = "flex";
    loggedInLinks.style.display = "none";
  }

  // 로그아웃 시 예시 이벤트
  document.getElementById("logout-link").addEventListener("click", function () {
    if (confirm("로그아웃하시겠습니까?")) {
      localStorage.setItem("login", "false");
      location.reload();
    }
  });
});

/* header 부분 화면 구현 */
function printHeader() {
  $('#header-container').append(`
    <div class="container justify-content-center">
            <!-- 로고 -->
            <div id="logo" class="navbar-brand mx-auto" onclick="location.href='/index.html'">
                swuraMeal
            </div>

            <!-- 로그인 정보 -->
            <div class="row align-items-start">
                <!-- 로그인 전 -->
                <div id="logged-out-links" class="col">
                    <a class="nav-link" href="/html/signup.html" id="signup-link">회원가입</a>
                    &nbsp;|&nbsp;
                    <a class="nav-link" href="/html/login.html" id="login-link">로그인</a>
                </div>

                <!-- 로그인 후 -->
                <div id="logged-in-links" class="col" style="display: none">
                    <a class="nav-link" href="#" id="logout-link">로그아웃</a>
                    &nbsp;|&nbsp;
                    <a class="nav-link admin-hide" href="/html/myPage.html" id="mypage-link">마이페이지</a>
                    <a class="nav-link" href="/html/admin.html" id="admin-link">관리자페이지</a>
                    &nbsp;<span class="admin-hide">|</span>&nbsp;
                    <a class="nav-link admin-hide" href="/html/support.html">고객센터</a>
                </div>
            </div>
        </div>
    `);
}