/* 카카오주소 api */
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = ""; // 메인 주소
      let extraAddr = ""; // 기타 주소

      //선택한 주소 타입(R: 도로명 주소) || J: 지번주소))에 따라 해당 주소 값을 가져온다.
      addr =
        data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

      // 주소가 도로명 타입일때 기타 주소(extraAddr) 설정
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가(마지막 문자 "동/로/가")
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      // 주소 정보를 주소 필드에 넣음
      document.getElementById("user-address").value = addr + extraAddr;
      // 커서를 주소 필드로 이동
      document.getElementById("user-address").focus();
    },
  }).open();
}

/* 유효성 검사 */
window.onload = () => {
  /* 아이디 */
  // 4~8글자, 영어 또는 숫자만 가능
  $("#user-id").on("change", (e) => {
    let val = e.target.value;
    const pattern = /^[A-Za-z0-9][A-Za-z0-9]*$/;
    if (!(val.length >= 4 && val.length <= 12)) {
      alert("아이디는 4~12글자로 입력해 주세요.");
      $("#user-id").focus();
    } else if (!pattern.test(val)) {
      alert("아이디는 영어 또는 숫자만 입력해 주세요.");
      $("#user-id").focus();
    }
  });

  /* 비밀번호 */
  // 8글자 이상, 영문, 숫자, 특수문자 각 1글자 이상 사용
  $("#user-pw").on("change", (e) => {
    let val = e.target.value;
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/;
    if (val.length < 8) {
      alert("비밀번호는 8글자 이상 작성해 주세요.");
    } else if (!pattern.test(val)) {
      alert(
        "비밀번호는 영문, 숫자, 특수문자를 모두 사용하여 작성해 주세요.\n(특수문자는 @, $, !, %, *, #, ?, & 만 사용 가능합니다.)"
      );
      $("#user-pw").focus();
    }
  });

  /* 비밀번호 확인 */
  // 비밀번호 값과 일치 여부
  $("#user-pw2").on("change", (e) => {
    let val = e.target.value;
    let pw = $("#user-pw").value;
    if (val != pw) {
      alert("비밀번호와 일치하지 않습니다.");
      $("#user-pw2").focus();
    }
  });

  /* 이메일 */
  // '@'의 앞/뒤 구간이 알파벳 or 숫자 조합
  //  '.' 뒤가 알파벳
  $("#user-email").on("change", (e) => {
    let val = e.target.value;
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z\-]+/;
    if (!pattern.test(val)) {
      alert("이메일 형식에 맞게 작성해 주세요.\n(예: swura@meal.com)");
      $("#user-email").focus();
    }
  });

  /* 휴대폰 번호 */
  // '-'을 기준으로 첫번째 구간이 01[0,1,6,7,8,9]중 하나인지 체크
  // '-'을 기준으로 두번째 구간이 숫자 3~4 자리로 이루어져 있는지 체크
  // '-'을 기준으로 세번째 구간이 숫자 4자리로 이루어져 있는지 체크
  $("#user-phone").on("change", (e) => {
    let val = e.target.value;
    const pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!pattern.test(val)) {
      alert("휴대폰 번호 형식에 맞게 작성해 주세요.\n(예: 010-1234-5678)");
      $("#user-phone").focus();
    }
  });

  /* 생년월일 */
  $("#year").on("change", (e) => {
    let val = e.target.value;
    if (!/^\d{4}$/.test(val)) {
      alert("형식에 맞게 입력해 주세요.(예: 2024)");
      $("#year").focus();
    }
  });

  $("#mm").on("change", (e) => {
    let val = e.target.value;
    if (!/^\d{2}$/.test(val) || val < 1 || val > 12) {
      alert("1 ~ 12까지의 숫자만 입력해 주세요..");
      $("#mm").focus();
    }
  });

  $("#dd").on("change", (e) => {
    let val = e.target.value;
    if (!/^\d{2}$/.test(val) || val < 1 || val > 31) {
      alert("1 ~ 31까지의 숫자만 입력해 주세요..");
      $("#dd").focus();
    }
  });
};
