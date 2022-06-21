window.addEventListener('load', function () {
    const signinBtn = document.getElementById('signin');
    const signupBtn = document.getElementById('signup');
    const firstForm = document.getElementById('form1');
    const secondForm = document.getElementById('form2');
    const container = document.querySelector('.container');
    signinBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    signupBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    firstForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    secondForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const loginBtn = document.querySelector('#login');
    const regBtn = document.querySelector('#register');

    // 为登录按钮绑定点击事件
    loginBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        // 获取登录框内容
        const email = document.querySelector('#form2 > input:nth-child(2)');
        const pwd = document.querySelector('#form2 > input:nth-child(3)');
        // 发起异步请求
        ajax({
            method: 'POST',
            url: 'http://175.178.44.189:88/home/base/login',
            data: {
                username: email.value,
                password: pwd.value
            },
            success: function (res) {
                if (res.code === 200) {
                    console.log(res);
                    localStorage.setItem('utoken', res.data.utoken);
                    window.location.href = '../html/commonUser.html'
                } else {
                    alert('登录失败，请检查账号与密码');
                    console.log(res)
                }
            }
        });
    });

    // 为注册按钮绑定点击事件
    regBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        // 获取注册框信息
        const username = document.querySelector('#form1 > input:nth-child(2)');
        const email = document.querySelector('#form1 > input:nth-child(3)');
        const pwd = document.querySelector('#form1 > input:nth-child(4)');
        ajax({
            method: 'POST',
            url: 'http://175.178.44.189:88/home/base/register',
            data: {
                username: username.value,
                email: email.value,
                password: pwd.value
            },
            success: function (res) {
                if (res.code === 200) {
                    alert('注册成功！');
                    console.log(res)
                } else {
                    alert('注册失败，该账号已存在！');
                    console.log(res)
                }
            }
        });
    });
    console.log(this.localStorage.getItem('utoken'));
});
