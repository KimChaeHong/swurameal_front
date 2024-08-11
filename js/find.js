/*  아이디 || 비밀번호 찾기  */
function findPage() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let type = param.get("type");

  if (type == 'id') {
    $("#find-title").text('아이디 찾기');
		$('#find-name-id').html(
			'<label for="userName">이름</label>'
			+'<input type="text" id="userName" placeholder="이름을 입력해 주세요." />');
  } else {
    $("#find-title").text('비밀번호 찾기');
    $('#find-name-id').html(
			'<label for="userId">아이디</label>'
			+ '<input type="text" id="userId" placeholder="아이디를 입력해 주세요." />');
  }

	// 휴대폰 인증을 기본값으로
	$('#find-phone-email').html(
		'<label for="userPhone">휴대폰 번호</label>'
		+'<input type="tel" id="userPhone" placeholder="휴대폰 번호를 입력해 주세요."/>'
	);
}

/* 휴대폰 || 이메일 인증 */
function certPhoneMail(arg) {
  if (arg == "phone") {	// 휴대폰 인증
		$('#find-phone-email').html(
			'<label for="userPhone">휴대폰 번호</label>'
			+'<input type="tel" id="userPhone" placeholder="휴대폰 번호를 입력해 주세요."/>'
		);
		$('#find-phone-btn').css({
			"borderBottom": "2px solid #6B0609", 
			"color": "#6B0609",
			"fontWeight": "500"
		});
		$('#find-email-btn').css({
			"borderBottom": "1px solid #d9d9d9", 
			"color": "#757575",
			"fontWeight": "400"
		});
  } else { // 이메일 인증
    $('#find-phone-email').html(
			'<label for="userMail">이메일</label>'
			+'<input type="email" id="userMail" placeholder="이메일을 입력해 주세요."/>'
		);
    $('#find-email-btn').css({
			"borderBottom": "2px solid #6B0609", 
			"color": "#6B0609",
			"fontWeight": "500"
		});
		$('#find-phone-btn').css({
			"borderBottom": "1px solid #d9d9d9", 
			"color": "#757575",
			"fontWeight": "400"
		});
  }
}
