$(function () {

    $.ajax({
        url: BigNew.user_info,
        // headers: {  因为每次都需要传递令牌，所以要把这个东西设置在全局中，可以省略每次都要传递这个步骤
        //     // 传入token到请求头中，用来获取登录信息
        //     // Authorization:localStorage.getItem("token")
        // },
        success: info => {
            console.log(info);
            if (info.code === 200) {
                $('.user_info>span>i').text(info.data.nickname);
                $('.user_info>img').attr("src", info.data.userPic);
                $('.user_center_link>img').attr("src", info.data.userPic);
            }
        },
        // error: err => {
        //     console.log(err);
        // }
    });

    $('.logout').click(function () {
        $('#logoutModal').modal("show");
        $('#logoutSureBtn').click(function(){
            localStorage.removeItem("token");
            location.href="./login.html"
        })
    })

})