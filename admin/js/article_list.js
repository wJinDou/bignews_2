$(function () {
  // 获取文章分类
  $.ajax({
    url: BigNew.category_list,
    success: (info) => {
      // console.log(info);
      if (info.code === 200) {
        var htmlstr = template("temp", info);
        $("#selCategory").html(htmlstr);
      }
    },
  });

  // 获取所有文章
  function getData(page, callback) {
    $.ajax({
      url: BigNew.article_query,
      type: "get",
      data: {
        type: $("#selCategory").val(),
        page: page || 1,
        perpage: 3,
        state: $("#selStatus").val(),
      },
      success: (info) => {
        // console.log(info);
        var htmlstr = template("article_temp", info.data);
        $("tbody").html(htmlstr);
        setPage(info);
        if (info.data.data.length != 0) {
          $("#pagination").show().prev().hide();
          callback && callback(info.data.totalPage);
        } else if (currentPage != 0 && info.data.data.length == 0) {
          currentPage--;
          // console.log(currentPage);
          callback(info.data.totalPage, currentPage);
        } else {
          $("#pagination").hide().prev().show();
        }
      },
    });
  }
  getData();

  // 配置分页
  var currentPage;
  function setPage(info) {
    $("#pagination").twbsPagination({
      totalPages: info.data.totalPage,
      visiblePages: 3,
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页",
      onPageClick: function (event, page) {
        currentPage = page;
        getData(page);
      },
    });
  }

  // 筛选
  $("#btnSearch").click(function (e) {
    e.preventDefault();
    getData(1, function (page) {
      //改变总页数
      $("#pagination").twbsPagination("changeTotalPages", page, 1);
    });
  });

  // 删除文章
  var id;
  $("tbody").on("click", "a.delete", function () {
    id = $(this).data("id");
    $("#delModal").modal("show");
  });
  $("#sureDel").click(function () {
    // console.log(id);
    $.ajax({
      url: BigNew.article_delete,
      type: "post",
      data: {
        id: id,
      },
      success: (info) => {
        // console.log(info);
        if (info.code === 204) {
          getData(currentPage, function (page) {
            //改变总页数
            $("#pagination").twbsPagination(
              "changeTotalPages",
              page,
              currentPage
            );
          });
        }
      },
      error: (err) => {
        // console.log(err);
        alert(err.responseJSON.msg);
      },
      complete: () => {
        $("#delModal").modal("hide");
      },
    });
  });

  // 点击发表文章
  $("#release_btn").click(function () {
      parent.$(".menu .level02 li").eq(1).click();
  });
});
