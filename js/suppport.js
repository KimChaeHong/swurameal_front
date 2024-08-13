$(document).ready(function () {
    $("h5").on("click", function () {
      var target = $(this).text();
      $("#title").text(target);
  
      $("h5").removeClass("active");
      $(this).addClass("active");
  
      var jsFile = $(this).data("js");
  
      $.ajax({
        url: jsFile,
        dataType: "script",
        method: "GET",
        success: function (data) {
          if (target === "문의") uploadMyQnaPage();
          
        },
      });
    });
  });