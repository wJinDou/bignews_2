var tbody = $("tbody");
// 查询所有的类别信息
function select() {
  $.ajax({
    url: BigNew.category_list,
    success: (info) => {
      // console.log(info);
      if (info.code === 200) {
        var htmlstr = template("temp", info);
        tbody.html(htmlstr);
      }
    },
  });
}
select();

// 显示模态框时判断时新增还是编辑
$("#exampleModal").on("show.bs.modal", function (e) {
  // 模态框显示之后可以通过事件对象来知道触发源,但必须是使用自定义标签的方式来控制隐藏
  // console.log();
  if (e.relatedTarget === $("#xinzengfenlei")[0]) {
    // console.log("新增");
    $("#sureAddOrEdit")
      .text("新增")
      .addClass("btn-primary")
      .removeClass("btn-success");
    $("#exampleModalLabel").text("新增文章分类");
    // $("#recipient-id").val("");
    $("#form")[0].reset();
  } else {
    // console.log("编辑");
    $("#sureAddOrEdit")
      .text("编辑")
      .addClass("btn-success")
      .removeClass("btn-primary");
    $("#exampleModalLabel").text("编辑文章分类");
    $.ajax({
      url: BigNew.category_search,
      data: {
        id: $(e.relatedTarget).data("id"),
      },
      success: (info) => {
        // console.log(info);
        $("#recipient-id").val(info.data[0].id);
        $("#recipient-name").val(info.data[0].name);
        $("#recipient-slug").val(info.data[0].slug);
      },
    });
  }
});

$("#sureAddOrEdit").click(function () {
  // if ($(this).hasClass("btn-primary")) {
  // console.log("新增");
  if (
    $("#recipient-name").val().trim() === "" ||
    $("#recipient-slug").val().trim() === ""
  ) {
    return alert("内容不能为空");
  }
  $.ajax({
    url: $(this).hasClass("btn-primary")
      ? BigNew.category_add
      : BigNew.category_edit,
    type: "post",
    data: $("#form").serialize(),
    success: (info) => {
      // console.log(info);
      if (info.code === 201 || info.code === 200) {
        $("#exampleModal").modal("hide");
        select();
      }
    },
    error: (err) => {
      alert(err.responseJSON.msg);
    },
  });
  // } else {
  // console.log("编辑");
  // }
});

//删除功能
let id;
$("#delModal").on("show.bs.modal", function (e) {
  id = $(e.relatedTarget).data("id");
});
$("#sureDelBtn").click(function () {
  // console.log(id);
  $.ajax({
    url: BigNew.category_delete,
    type: "post",
    data: {
      id: id,
    },
    success: (info) => {
      // console.log(info);
      $("#delModal").modal("hide");
      select();
    },
    error: (err) => {
      alert(err.responseJSON.msg);
    },
  });
});
