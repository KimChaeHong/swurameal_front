document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const loggedOutLinks = document.getElementById('logged-out-links');
    const loggedInLinks = document.getElementById('logged-in-links');

    if (isLoggedIn) {
         // 로그인 상태
         loggedOutLinks.style.display = 'none';
         loggedInLinks.style.display = 'flex';
    } else {
        // 로그아웃 상태
        loggedOutLinks.style.display = 'flex';
        loggedInLinks.style.display = 'none';
    }
    // 로그인 버튼에 대한 예시 이벤트
    document.getElementById('login-link').addEventListener('click', function () {
        // 예시: 로그인 성공 시
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인되었습니다.');
        location.reload();  // 페이지 새로고침하여 링크 갱신
    });

    // 로그아웃 시 예시 이벤트
    document.getElementById('logout-link').addEventListener('click', function () {
        // 예시: 로그아웃 기능
        if (confirm('로그아웃하시겠습니까?')) {
            localStorage.setItem('isLoggedIn', 'false');
            alert('로그아웃되었습니다.');
            location.reload();  // 페이지 새로고침하여 링크 갱신
        }
    });
});
