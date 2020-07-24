var input_txt = $(".input_txt");
var input_pass = $(".input_pass");
var input_sub = $(".input_sub");
var from = $(".login_form");
input_sub.click(function (e) {
  //阻止表单内按钮和submit会触发的默认提交方式
  e.preventDefault();

  if (input_txt.val().trim() === "" || input_pass.val().trim() === "") {
    $("#myModal").find("#modaltText").text("用户名或密码不能为空");
    $("#myModal").modal("show");
    return;
  }
  $.ajax({
    url: BigNew.user_login,
    type: "post",
    data: from.serialize(),
    headers: false,
    success: (info) => {
      // console.log(info);
      $("#myModal").find("#modaltText").text(info.msg);
      $("#myModal").modal("show");
      if (info.code === 200) {
        $("#myModal").on("hide.bs.modal", function () {
          localStorage.setItem("token", info.token);
          location.href = "./index.html";
        });
      }
    },
  });
});
