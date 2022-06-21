window.addEventListener('load', function () {
    // 获取登录按钮
    const loginBtn = document.querySelector('#login');
    // 为登录按钮绑定点击事件
    loginBtn.addEventListener('click', function (e) {
        // 阻止事件冒泡
        e.stopPropagation();
        // 阻止事件默认行为
        e.preventDefault();
        // 获取邮箱输入框内容
        const email = document.querySelector('input[type="email"]').value;
        const pwd = document.querySelector('input[type="password"]').value;
        // 发起异步请求
        ajax({
            method: 'POST',
            url: 'http://175.178.44.189:88/admin/base/login',
            data: {
                username: email,
                password: pwd
            },
            success: function (res) {
                // 跳转至登录成功后的界面
                if (res.code === 200) {
                    localStorage.setItem('token', res.data);
                    window.location.href = '../html/admin.html'
                    console.log(localStorage.getItem('token'))
                }
                if (res.code === 400) {
                    alert('登录失败，请检查账号与密码');
                }
            }
        });
    });
});
