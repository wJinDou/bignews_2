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




        // 点击发布
        $(".btn-release").click(function (e) {
            e.preventDefault();
            publish("发布");
        })

        // 保存草稿
        $(".btn-draft").click(function(e){
            e.preventDefault();
            publish();
        })

        function publish(state) {
            var formdata = new FormData($("#form")[0]);
            formdata.append("content", editor.txt.html());
            formdata.append("state", state ? "已发布" : "");
            $.ajax({
                url: BigNew.article_publish,
                type: "post",
                data: formdata,
                contentType: false,
                processData: false,
                success: info => {
                    // console.log(info);
                    if (info.code = 200) {
                        alert("文章新增成功");
                        location.href = "./article_list.html";
                    }
                },
                error: err => {
                    alert(err.responseJSON.msg)
                }
            })
        }