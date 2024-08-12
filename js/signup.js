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
