function checkMembership() {
    // 로컬 스토리지에서 데이터 가져오기
    const personData = localStorage.getItem('personData');

    // JSON 문자열을 객체로 변환
    const person = JSON.parse(personData);
    return person.membership;
}

function membershipPageLoad() {
    // membership 값 확인
    if (checkMembership()) {
        // 맴버십 회원인 경우
        window.location.href = '../html/membership2.html';
    } else {
        // 회원이 아닌 경우
        window.location.href = '../html/membership.html';
    }

}

document.getElementById('membershipButton').addEventListener('click', membershipPageLoad);
