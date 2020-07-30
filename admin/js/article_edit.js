
// 获取文章分类
$.ajax({
    url: BigNew.category_list,
    success: (info) => {
        // console.log(info);
        if (info.code === 200) {
            var htmlstr = template("temp", info);
            $("#categoryId").html(htmlstr);
        }
    },
});


//替换图片，更改图片的固定步骤
$('#inputCover').change(function () {
    var url = URL.createObjectURL(this.files[0]);
    $('.article_cover').attr('src', url);
})


//日期插件
jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    isinitVal: true,
    trigger: 'click',
    onClose: false,
    donefun: function (obj) { },
})


// 富文本插件
var E = window.wangEditor;
var editor = new E('#editor');
// 更改层级覆盖问题
editor.customConfig.zIndex = 100;
editor.create();


// 获取了ID
var id = location.search.slice(1).split("=")[1];
// 根据id查询文章信息
$.ajax({
    url: BigNew.article_search,
    data: {
        id: id
    },
    success: info => {
        // console.log(info);
        $("#inputTitle").val(info.data.title);
        $(".article_cover").attr("src", info.data.cover);
        $("#categoryId").val(info.data.categoryId);
        $("#testico").val(info.data.date);
        editor.txt.html(info.data.content);
    },
    error: err => {
        // console.log(err);
        alert(err.responseJSON.msg)
    }
});
$(".btn-edit").click(function (e) {
    e.preventDefault();
    edit("已发布");
})
$(".btn-draft").click(function (e) {
    e.preventDefault();
    edit();
})


function edit(state) {
    var formdata = new FormData($("#form")[0]);
    formdata.append("id", id);
    formdata.append("content", editor.txt.html());
    formdata.append("state", state ? "已发布" : "");
    $.ajax({
        url: BigNew.article_edit,
        type: "post",
        data: formdata,
        contentType: false,
        processData: false,
        success: info => {
            // console.log(info);
            if (info.code === 200) {
                location.href = "./article_list.html";
            }
        },
        error: err => {
            // console.log(err);
            alert(err.responseJSON.msg)
        }
    })
}