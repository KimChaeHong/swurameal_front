$(document).ready(function() {
    // 로그인 상태 확인 및 업데이트
    function updateMemberLinks() {
        if (localStorage.getItem('loggedIn') === 'true') {
            $('#memberLinks').html('<a href="../html/mypage.html">마이페이지</a> <a href="#" id="logoutLink">로그아웃</a>');
        } else {
            $('#memberLinks').html('<a href="../html/signup.html" id="signupLink">회원가입</a> <a href="../html/login.html" id="loginLink">로그인</a>');
        }
    }

    // 초기 상태 업데이트
    updateMemberLinks();

    // 로그인 함수 예제
    function login() {
        // 로그인 성공 시 로컬 스토리지에 로그인 정보 저장
        localStorage.setItem('loggedIn', 'true');
        updateMemberLinks();
    }

    // 로그아웃 함수 예제
    function logout() {
        // 로그아웃 시 로컬 스토리지의 로그인 정보 삭제
        localStorage.removeItem('loggedIn');
        updateMemberLinks();
    }

    // 로그아웃 링크 클릭 이벤트 처리
    $(document).on('click', '#logoutLink', function(event) {
        event.preventDefault();
        logout();
    });

    // 예제: 로그인 이벤트 처리 (실제 로그인 처리는 서버와 연동 필요)
    // $('#login-button').on('click', function() {
    //     login();
    // });
});
