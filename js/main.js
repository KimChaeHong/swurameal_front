$(document).ready(function() {
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

    function updateMemberLinks() {
        if (localStorage.getItem('loggedIn') === 'true') {
            $('#memberLinks').html('<a href="#" id="logout">로그아웃</a>');
        } else {
            $('#memberLinks').html('<a href="../html/signup.html">회원가입</a><a href="../html/login.html">로그인</a>');
        }
    }

    // 로그아웃 링크 클릭 이벤트 처리
    $(document).on('click', '#logout', function() {
        logout();
    });

    // 예제: 로그인 이벤트 처리 (실제 로그인 처리는 서버와 연동 필요)
    // $('#login-button').on('click', function() {
    //     login();
    // });
});