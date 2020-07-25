//获取并且添加上
$.ajax({
    url: BigNew.user_detail,
    success: info => {
        console.log(info);
        if (info.code === 200) {
            //原方式

            // $('.username').val(info.data.username);
            // $('.nickname').val(info.data.nickname);
            // $('.email').val(info.data.email);
            // $('.password').val(info.data.password);
            //优化方式

            for (const key in info.data) {
                $('.' + key).val(info.data[key]);
            };
            $('.user_pic').attr("src", info.data.userPic)

        }
    }
});

//替换图片，更改图片的固定步骤
$('#exampleInputFile').change(function () {
    var url = URL.createObjectURL(this.files[0]);
    $('.user_pic').attr('src', url);

})
// 修改表单信息
$('#form').submit(function (e) {
    e.preventDefault();
    //直接相当于:$(this).serialize,且还可以带入了图片的信息，这是原生的方式
    var formdata = new FormData(this);

    $.ajax({
        url: BigNew.user_edit,
        type: "post",
        data: formdata,
        contentType: false,  //凡是传入了formdata必须要加这两个
        processData: false,
        success: info => {
            //做判断，如果更新成功，那么就更新页面
            if (info.code === 200) {
                // 这个方式可以更新父页面,但是会刷新页面，这样的用户体验不是很好
                // window.parent.window.location.reload();
                // alert("更新成功");
                parent.$('#tipsModal').modal('show').find("#tipsText").attr("class","text-info").text(info.msg);

                $.ajax({
                    url: BigNew.user_info,
                    success: info => {
                        if (info.code === 200) {
                            // 这样的话更新的本页面里的元素。如果想要更新父页面的元素，和上面同理，增加个parent即可
                            parent.$('.user_info>span>i').text(info.data.nickname);
                            parent.$('.user_info>img').attr("src", info.data.userPic);
                            parent.$('.user_center_link>img').attr("src", info.data.userPic);


                        }
                    },
                });

            }
        },
        error:err=>{
            parent.$('#tipsModal').modal('show').find("#tipsText").attr("class","text-danger").text(err.responseJSON.msg);
        }
    });
})