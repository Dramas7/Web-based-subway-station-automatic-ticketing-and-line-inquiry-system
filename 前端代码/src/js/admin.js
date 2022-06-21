window.addEventListener('load', function () {
    // ajax请求前缀
    let prefix = 'http://175.178.44.189:88';
    /********************************************* 侧边栏切换 ********************************************/
    const asideLis = this.document.querySelectorAll('aside ul a:not(.info-management)');
    const mainDivs = this.document.querySelectorAll('main>div');
    for (let i = 0; i < asideLis.length; i++) {
        asideLis[i].addEventListener('click', function () {
            mainDivs.forEach(function (value) {
                value.style.display = 'none';
            });
            mainDivs[i].style.display = 'block';
        });
    }
    /********************************************* 数据监控模块 ********************************************/
    // 使用立即执行函数划分模块

    // 各线路站点数
    (function () {
        var stationAmount = echarts.init(document.getElementById('station-amount'), 'dark');
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '地铁站点数'
            },
            tooltip: {},
            legend: {
                data: ['站点数']
            },
            xAxis: {
                data: ['1号线', '2号线', '3号线', '4号线', '中转站', '全线']
            },
            yAxis: {},
            series: [
                {
                    name: '站点数',
                    type: 'bar',
                    data: [27, 17, 23, 10, 7, 76]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        stationAmount.setOption(option);
    })();

    // 地铁站一周的运营收益
    (function () {
        var weekEarnings = echarts.init(document.getElementById('week-earnings'), 'dark');
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 千元'
                }
            },
            title: {
                text: '周运营收益'
            },
            series: [
                {
                    name: '日运营收益',
                    type: 'line',
                    data: [1000, 230, 224, 218, 135, 147, 260]
                }
            ]
        };
        weekEarnings.setOption(option);
    })();

    // 购票量及退票量饼状图
    (function () {
        var ticketAmount = echarts.init(document.getElementById('ticket-amount'), 'dark');
        var option = {
            title: {
                text: '购退票分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 48, name: '退票量' },
                        { value: 300, name: '有效票量' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        ticketAmount.setOption(option);
    })();

    // 浏览量饼状图
    (function () {
        var pageView = echarts.init(document.getElementById('page-view'), 'dark');
        var option = {
            title: {
                text: '日浏览量',
                left: 'center',
                subtext: '单位：次'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 480, name: '未注册用户' },
                        { value: 300, name: '已注册用户' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        pageView.setOption(option);
    })();

    // 站点个数
    (function () {
        var stationDistribution = echarts.init(document.getElementById('station-distribution'), 'dark');
        var option = {
            title: {
                text: '站点个数',
                left: 'center',
                subtext: '单位：个'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 27, name: '1号线' },
                        { value: 17, name: '2号线' },
                        { value: 23, name: '3号线' },
                        { value: 10, name: '4号线' },
                        { value: 7, name: '中转站' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        stationDistribution.setOption(option);
    })();

    /********************************************* 票价管理模块 ********************************************/
    // 获取票价输入框
    const priceIpt = this.document.querySelectorAll('#ticket-management-table input[type="text"]');
    // 获取票价文本响应栏
    const reactText = this.document.querySelectorAll('#fare-rules span');
    // 打开页面时，初始化框的值
    ajax({
        method: 'POST',
        url: `${prefix}/admin/base/price`,
        success: function (res) {
            if (res.code == 200) {
                for (let i = 0; i < priceIpt.length; i++) {
                    priceIpt[i].value = parseFloat(res.data[`price${i + 1}`]).toFixed(0);
                    reactText[i].innerHTML = priceIpt[i].value;
                }
            } else {
                alert('数据请求失败');
            }
        }
    });
    // 为输入框绑定change事件
    for (let i = 0; i < priceIpt.length; i++) {
        priceIpt[i].addEventListener('input', function () {
            // 修改框的值并上传至数据库
            const data = {};
            data.token = localStorage.getItem('token');
            data[`price${i + 1}`] = this.value;
            /*****************************发起ajax请求 **************************/
            ajax({
                method: 'POST',
                url: `${prefix}/admin/price/edit`,
                data,
                success: function (res) {
                    if (res.code === 200) {
                        console.log(res.data);
                    } else {
                        console.log('获取列表失败');
                    }
                }
            });
            /*****************************发起ajax请求 **************************/
            reactText[i].innerHTML = this.value;
        });
    }

    /********************************************* 站点管理模块 ********************************************/
    // 获取每一个箭头
    const arrow = document.querySelectorAll('#station-management ul li .arrow');
    // 获取每一项站点
    const stations = document.querySelectorAll('#station-management ul li:not(.line-name)');
    // 获取外部信息框
    const messageIpt = document.querySelector('.message-ipt');
    // 获取鼠标经过时自动打开的信息提示框
    const messageTip = document.querySelector('.message-tip');
    // 为每一个箭头都绑定click事件
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener('click', function (e) {
            // 获取输入框的确定按钮
            const ensureBtn = messageIpt.children[2];
            // 获取信息输入框
            const iptBox = messageIpt.children[1];
            // 定义ensureBtn的CLICK事件处理函数
            function ensure(e) {
                e.stopPropagation();
                // 将输入框隐藏
                this.parentNode.style.display = 'none';
                // 将iptBox中的数据传输至箭头的自定义属性中
                this.parentNode.parentNode.setAttribute('distance', `${iptBox.value}km`);
                /***********************发送Ajax请求，将数据输进数据库 START***********************/
                ajax({
                    method: 'POST',
                    url: `${prefix}admin/distance/edit`,
                    data: {
                        token: localStorage.getItem('token'),
                        start: this.parentNode.parentNode.parentNode.getAttribute('number'),
                        end: this.parentNode.parentNode.parentNode.nextElementSibling.getAttribute('number'),
                        distance: iptBox.value
                    },
                    success: function (res) {
                        if (res.code === 200) {
                            console.log('修改成功！');
                        } else {
                            console.log('修改失败！');
                        }
                    }
                });
                /***********************发送Ajax请求，将数据输进数据库 END***********************/
                // 让输入框内容清空
                iptBox.value = '';
                // 清除ensureBtn的CLICK监听器
                ensureBtn.removeEventListener('click', ensure);
                // 清除所有键盘监听
                messageIpt.removeEventListener('keyup', keyupEnsure, true);
                window.removeEventListener('keyup', function () {}, true);
                messageIpt.removeEventListener('keydown', keydownEnsure, true);
                window.removeEventListener('keydown', function () {}, true);
            }
            // 定义ensureBtn的keyboard事件处理函数
            // 定义keyup
            function keyupEnsure(e) {
                if (e.key == 'Enter') {
                    // keyup的时候，让确定键复原
                    ensureBtn.style.transform = 'scale(1)';
                    // 让确定键消失
                    ensureBtn.parentNode.style.display = 'none';
                    // 将iptBox中的数据传输至箭头的自定义属性中
                    this.parentNode.setAttribute('distance', `${iptBox.value}km`);
                    /***********************发送Ajax请求，将数据输进数据库 START***********************/
                    ajax({
                        method: 'POST',
                        url: `${prefix}/admin/distance/edit`,
                        data: {
                            token: localStorage.getItem('token'),
                            start: this.parentNode.parentNode.getAttribute('number'),
                            end: this.parentNode.parentNode.nextElementSibling.getAttribute('number'),
                            distance: iptBox.value
                        },
                        success: function (res) {
                            if (res.code === 200) {
                                console.log('修改成功！');
                            } else {
                                console.log('修改失败！');
                            }
                        }
                    });
                    /***********************发送Ajax请求，将数据输进数据库 END***********************/
                    // 让输入框内容清空
                    iptBox.value = '';
                    // 清除所有的键盘监听
                    messageIpt.removeEventListener('keyup', keyupEnsure, true);
                    window.removeEventListener('keyup', function () {}, true);
                }
            }
            // 定义keydown
            function keydownEnsure(e) {
                if (e.key == 'Enter') {
                    // keydown的时候，让确定键缩小
                    ensureBtn.style.transform = 'scale(0.9)';
                    // 清除对应的全局监听
                    messageIpt.removeEventListener('keydown', keydownEnsure, true);
                    window.removeEventListener('keydown', function () {}, true);
                }
            }
            // 为ensureBtn添加点击事件
            ensureBtn.addEventListener('click', ensure);
            // 为window添加keyup键盘事件，并将事件设为捕获，让后代元素可以监听以及取消事件捕获
            window.addEventListener('keyup', function () {}, true);
            // 为window添加keyup键盘事件，并将事件设为捕获，让后代元素可以监听以及取消事件捕获
            window.addEventListener('keydown', function () {}, true);
            // 为messageIpt添加键盘事件
            messageIpt.addEventListener('keyup', keyupEnsure, true);
            messageIpt.addEventListener('keydown', keydownEnsure, true);
            // 为messageIpt添加click事件，用于阻止冒泡
            messageIpt.addEventListener('click', function (e) {
                e.stopPropagation();
            });
            // 修改信息框样式
            messageIpt.style.display = 'block';
            messageIpt.style.left = '-59px';
            messageIpt.style.top = '-122px';
            messageIpt.style.textAlign = 'center';
            messageIpt.style.cursor = 'default';
            // 为站点添加信息输入框
            this.appendChild(messageIpt);
            // 点击箭头时让信息输入框聚焦
            iptBox.focus();
            // 清空上一个的输入值
            iptBox.value = '';
            // 获取另一个信息框并让其隐藏
            const messageTip = document.querySelector('.message-tip');
            messageTip.style.display = 'none';
        });
    }

    // TODO: 添加定时器，让效果更平滑，同时这也是一个大难题，初步尝试后失败
    // 为每个箭头都绑定mouseenter事件
    arrow.forEach(function (val) {
        val.addEventListener('mouseenter', function () {
            // 获取左侧站点名称文本，根据父元素的长度来判断不同站点
            if (this.parentNode.children.length == 4) {
                var leftStationName = this.parentNode.children[1].innerHTML;
            } else {
                var leftStationName = this.parentNode.children[0].innerHTML;
            }
            // 获取右侧站点名称文本，根据父元素的长度来判断不同站点
            if (this.parentNode.nextElementSibling.children.length == 4) {
                var rightStationName = this.parentNode.nextElementSibling.children[1].innerHTML;
            } else {
                var rightStationName = this.parentNode.nextElementSibling.children[0].innerHTML;
            }
            // 获取信息提示框的名称元素
            const leftStation = messageTip.children[0].children[0];
            const rightStation = messageTip.children[0].children[2];
            // 进行赋值操作
            leftStation.innerText = leftStationName;
            rightStation.innerText = rightStationName;
            // 定义distance
            let distanceVal;
            /*******************************************发送ajax请求获取站点间的距离列表*************************/
            // 属于异步执行，所以这个代码段的后面接收不了distanceVal
            ajax({
                method: 'POST',
                url: `${prefix}/admin/base/distance`,
                success: (res) => {
                    if (res.code === 200) {
                        distanceVal = res.data.find((x) => {
                            return x.start == this.parentNode.getAttribute('number') && x.end == this.parentNode.nextElementSibling.getAttribute('number');
                        }).distance;
                        // 将距离值写入框内
                        messageTip.children[1].children[0].innerHTML = `${distanceVal}km`;
                    } else {
                        console.log('获取列表失败');
                    }
                }
            });
            /*******************************************发送ajax请求获取站点间的距离列表*************************/

            // 将信息提示框展示
            messageTip.style.display = 'flex';
            messageTip.style.left = '-51px';
            messageTip.style.top = '-115px';
            messageTip.style.textAlign = 'center';
            messageTip.style.cursor = 'default';
            // 将信息提示框作为节点添加进去
            this.appendChild(messageTip);
            // 通过双层判断决定是否展示信息提示框，第一层是根据arrow元素中的子节点个数进行初步判断，第二层是根据信息输入框的display属性
            if (this.children.length == 2) {
                if (messageIpt.style.display == 'block') {
                    messageTip.style.display = 'none';
                }
            }
        });
    });

    // 为每个箭头都绑定mouseleave事件
    arrow.forEach(function (val) {
        val.addEventListener('mouseleave', function () {
            const messageTip = document.querySelector('.message-tip');
            messageTip.style.display = 'none';
        });
    });
    /********************************************* 订单管理模块 ********************************************/
    // 发起ajax请求，初始化订单列表
    ajax({
        method: 'POST',
        url: `${prefix}/admin/order/apply`,
        data: {
            token: this.localStorage.getItem('token')
        },
        success: (res) => {
            if (res.data !== '购买成功') {
            }
            // 获取tbody
            const tbody = this.document.querySelector('#order-management-table').querySelector('tbody');
            console.log(res);
            // 清空一次列表
            tbody.innerHTML = '';
            for (let i = 0; i < res.data.length; i++) {
                const tr = this.document.createElement('tr');
                let username = res.data[i].user.username;
                let email = res.data[i].user.email;
                let create_time = res.data[i].create_time;
                let reason = res.data[i].reason;
                let price = res.data[i].price;
                tr.innerHTML = `
                    <td>${username}</td>
                    <td>${email}</td>
                    <td>${create_time}</td>
                    <td>${reason}</td>
                    <td>${parseFloat(price).toFixed(1)}<span>¥</span></td>
                    <td>
                        <button>同意</button>
                        <button>拒绝</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }

            // 获取同意按钮
            const agreementBtn = tbody.querySelectorAll('button:first-child');
            // 获取拒接按钮
            const rejectBtn = tbody.querySelectorAll('button:last-child');
            for (let i = 0; i < res.data.length; i++) {
                // 根据状态让按钮不展示
                if (res.data[i].status == 3) {
                    agreementBtn[i].disabled = true;
                    rejectBtn[i].disabled = true;
                    rejectBtn[i].style.cursor = 'default';
                    agreementBtn[i].style.cursor = 'default';
                    rejectBtn[i].style.backgroundColor = '#ccc';
                    rejectBtn[i].style.border = 'none';
                } else if (res.data[i].status == 4) {
                    agreementBtn[i].disabled = true;
                    rejectBtn[i].disabled = true;
                    agreementBtn[i].style.cursor = 'default';
                    rejectBtn[i].style.cursor = 'default';
                    agreementBtn[i].style.backgroundColor = '#ccc';
                    agreementBtn[i].style.border = 'none';
                }
            }

            // 为同意按钮绑定事件处理函数
            for (let i = 0; i < agreementBtn.length; i++) {
                agreementBtn[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    ajax({
                        method: 'POST',
                        url: `${prefix}/admin/order/agree`,
                        data: {
                            token: localStorage.getItem('token'),
                            id: res.data[i].id
                        },
                        success: (res) => {
                            this.disabled = true;
                            this.style.backgroundColor = '#ccc';
                            this.style.cursor = 'default';
                            this.style.border = 'none';
                            rejectBtn[i].style.cursor = 'default';
                            console.log(res.msg);
                        }
                    });
                });
            }

            // 为拒绝按钮绑定事件处理函数
            for (let i = 0; i < rejectBtn.length; i++) {
                rejectBtn[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    ajax({
                        method: 'POST',
                        url: `${prefix}/admin/order/refuse`,
                        data: {
                            token: localStorage.getItem('token'),
                            id: res.data[i].id
                        },
                        success: (res) => {
                            this.disabled = true;
                            this.style.backgroundColor = '#ccc';
                            this.style.cursor = 'default';
                            this.style.border = 'none';
                            agreementBtn[i].style.cursor = 'default';
                            console.log(res.msg);
                        }
                    });
                });
            }
        }
    });

    /***************************************用于设置各个站点的自定义属性*************************/
    // 定义各个地铁站点
    let subwayStation = {
        firstLineStations: {
            ele: document.querySelectorAll('#first-line-stations li:not(.line-name)'),
            num: 'A'
        },
        secondLineStations: {
            ele: document.querySelectorAll('#second-line-stations li:not(.line-name)'),
            num: 'B'
        },
        thirdLineStations: {
            ele: document.querySelectorAll('#third-line-stations li:not(.line-name)'),
            num: 'C'
        },
        forthLineStations: {
            ele: document.querySelectorAll('#forth-line-stations li:not(.line-name)'),
            num: 'D'
        }
    };
    /**
     * 设置线路的number属于，实现编号，如1号线第一个站点为number="A1"，2号线第三个站点为number="B3"
     * @param {HTMLDivElement} stations -元素节点
     * @param {string} aph -编号字母
     */
    function setNum(stations, aph) {
        stations.forEach(function (val, index) {
            index++;
            if (index < 10) {
                index = `0${index}`;
            }
            val.setAttribute('number', `${aph}${index}`);
        });
    }
    // 调用setNum函数，遍历每一个站点
    for (let k in subwayStation) {
        setNum(subwayStation[k].ele, subwayStation[k].num);
    }
    /***************************************用于设置各个站点的自定义属性*************************/

    /**************************************发送Ajax请求向数据库添加站点间的距离信息************************/
    // /**@type {Array} -存储位置信息的数组 */
    // const distanceInfo = [];

    // for (let val of arrow) {
    //     /**@type {object} -定义一个对象来存放信息*/
    //     const obj = {};
    //     obj.start = val.parentNode.getAttribute('number');
    //     obj.end = val.parentNode.nextElementSibling.getAttribute('number');
    //     obj.distance = parseFloat(val.getAttribute('distance').slice(0, -2)).toFixed(2);
    //     distanceInfo.push(obj);
    // }

    // // 遍历distanceInfo，增添站点
    // for (let val of distanceInfo) {
    //     ajax({
    //         method: 'POST',
    //         url: 'http://test3.jsnaili.wang/admin/distance/add',
    //         data: {
    //             token: localStorage.getItem('token'),
    //             start: val.start,
    //             end: val.end,
    //             distance: val.distance
    //         },
    //         success: function (res) {
    //             if (res.code === 200) {
    //                 console.log('添加成功')
    //             }
    //         }
    //     })
    // }
    /**************************************发送Ajax请求向数据库添加站点 END************************/

    /****************************************查看距离列表 *************************************************/
    this.window.addEventListener('keyup', function (e) {
        e.stopPropagation();
        if (e.key == 'c') {
            ajax({
                method: 'POST',
                url: `${prefix}/admin/base/site`,
                success: function (res) {
                    if (res.code === 200) {
                        console.log(res);
                    } else {
                        console.log('获取列表失败');
                    }
                }
            });
        }
    });

    /***************************************************查看票价列表 **********************************************/
    this.window.addEventListener('keyup', function (e) {
        e.stopPropagation();
        if (e.key == 'p') {
            ajax({
                method: 'POST',
                url: `${prefix}/admin/base/distance`,
                success: function (res) {
                    if (res.code === 200) {
                        console.log(res.data);
                    } else {
                        console.log('获取列表失败');
                    }
                }
            });
        }
    });

    ajax({
        method: 'POST',
        url: `${prefix}/admin/order/index`,
        data: {
            token: this.localStorage.getItem('token')
        },
        success: (res) => {
            console.log(res);
        }
    });
});
