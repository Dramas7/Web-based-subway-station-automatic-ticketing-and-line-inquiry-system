window.addEventListener('load', function () {
    // 测试用，用于获取鼠标target的坐标值
    // this.window.addEventListener('click', function (e) {
    //     console.log(e.pageX, e.pageY)
    // })

    // FIXME:存在一个小bug，点击下方的下拉菜单使其展开后，如果想展开上方的下拉菜单，则需要点与之相应的按钮两次
    // FIXME:在上述条件的前提下，将上方的下拉菜单折叠后，如果想将下方的下拉菜单折叠，也需要点击与之对应的按钮两次
    // FIXME:若将点击下拉菜单使其展开的次序与上述情况相反，则不会出现上述bug
    // FIXME:将浏览器缩放到90%以及110%等数值，动画函数无法触发回调，此处可做优化
    /*************************************通用下拉菜单 *************************************/
    // 下拉菜单展开按钮
    let slideDownButton = document.querySelectorAll('.list-wrapper .slide-down-icon');
    // 下拉菜单标题
    let slideTitle = document.querySelectorAll('.list-wrapper .title');
    // 下拉菜单主体
    let slideList = document.querySelectorAll('.list-wrapper .list');
    // 下来菜单主体与标题之间的填充区
    let fillArea = document.querySelectorAll('.list-wrapper .fill');

    // 动画函数，parm:(目标元素，目标元素的高度，回调函数)  Tips:clientHeight不包含边框
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.clientHeight) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.clientHeight == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.height = step + obj.clientHeight + 'px';
        }, 15);
    }

    // 定义一个slideDownFlag标识，通过slideDownFlag来判断下拉菜单的状态
    let slideDownFlag = true;

    // 定义下拉菜单的初始化函数
    function initSlideDown() {
        // 初始化flag
        slideDownFlag = true;
        // 移除下拉菜单title的"is-slide-down-title"样式
        slideTitle.forEach(function (val) {
            val.classList.contains('is-slide-down-title') && val.classList.remove('is-slide-down-title');
        });
        // 将slideList的展示属性设为无
        slideList.forEach(function (val) {
            // 高度设为0，以便下次有动画效果
            val.style.height = '0';
            val.style.display = 'none';
            val.style.overflow = 'hidden';
        });
        // 将fillArea的展示属性设为无
        fillArea.forEach(function (val) {
            val.style.display = 'none';
        });
        // 将操作按钮的类设为初始状态
        slideDownButton.forEach(function (val) {
            val.classList.contains('is-slide-down') && val.classList.remove('is-slide-down');
        });
    }

    // 定义下拉菜单的控制函数
    function handleSlideDown() {
        if (slideDownFlag) {
            // 初始化slideList,让其他list不展示，只能同时展示一个list
            initSlideDown();
            // 增删类名，改变
            this.classList.add('is-slide-down');
            this.parentNode.children[1].classList.add('is-slide-down-title');
            // 让相关的元素展示
            this.parentNode.children[3].style.display = 'block';
            this.parentNode.children[2].style.display = 'block';
            // 调用动画函数。设置目标高度为400
            animate(this.parentNode.children[3], 400, () => {
                // 动画结束后，让overflow设为auto，保证能完整查看的同时，让画面更美观
                this.parentNode.children[3].style.overflow = 'auto';
            });
            // 改变slideDownFlag的值，表示下拉菜单已经展开
            slideDownFlag = false;
        } else {
            // 开始折叠下拉菜单时，让overflow设为hidden，保证能完整查看的同时，让画面更美观
            this.parentNode.children[3].style.overflow = 'hidden';
            // 增删类名，改变样式
            this.classList.remove('is-slide-down');
            this.parentNode.children[1].classList.remove('is-slide-down-title');
            // 调用动画函数，设置目标高度为0,
            animate(this.parentNode.children[3], 0, () => {
                // 动画完毕后执行回调，让相关元素隐藏
                this.parentNode.children[3].style.display = 'none';
                this.parentNode.children[2].style.display = 'none';
            });
            // 改变slideDownFlag值，表示下拉菜单已经缩回
            slideDownFlag = true;
        }
    }

    // 用于判断是否点击了下拉按钮的变量
    for (let i = 0; i < slideDownButton.length; i++) {
        slideDownButton[i].addEventListener('click', handleSlideDown);
    }

    /***********************************通用错误提示模态框 *******************************/
    // 获取错误信息提示模态框
    const errMsgModalBox = document.querySelector('body > main > div.err-msg-modal-box');
    // 获取主体文字内容的承载元素
    const errMsgModalBoxMainText = errMsgModalBox.children[0].children[1];

    function popupErrMsg(msg) {
        // 弹出错误信息提示模态框
        errMsgModalBox.style.display = 'block';
        // 弹出遮罩层
        maskLayer.style.display = 'block';
        // 获取确定按钮
        const ensureBtn = document.querySelector('body > main > div.err-msg-modal-box > div > button');
        // 定义确认按钮的点击事件处理函数
        function ensureBtnHandler(e) {
            e.stopPropagation();
            // 通过节点方法获取错误信息模态框主体，并将其关闭
            this.parentNode.parentNode.style.display = 'none';
            // 将遮罩层关闭，添加条件判断，如果具体查询框展示时，不应当让遮罩层消失
            if (queryBoxSpecific.style.display == 'block') {
                maskLayer.style.display = 'block';
            } else {
                maskLayer.style.display = 'none';
            }
            ensureBtn.removeEventListener('click', ensureBtnHandler);
        }
        // 给确定按钮添加click事件
        ensureBtn.addEventListener('click', ensureBtnHandler);

        // 初始化主体区域文字内容的排布样式
        errMsgModalBoxMainText.style.textAlign = 'center';
        errMsgModalBoxMainText.style.textIndent = '0';
        // 传入文字信息
        errMsgModalBoxMainText.innerHTML = msg;
        // 根据主体内容区的高度判断主体文字是否需要换行，如需换行，则更改text-align等信息
        if (errMsgModalBoxMainText.offsetHeight > 32) {
            errMsgModalBoxMainText.style.textAlign = 'initial';
            errMsgModalBoxMainText.style.textIndent = '3rem';
        }
    }

    /***************************************线路查询框 **********************************/
    // 简易查询框的查询按钮
    const routeQueryBtn = document.querySelector('#query-box-simple > div.btn-container > button');
    // 简易查询框
    const queryBoxSpecific = document.querySelector('#query-box-specific');
    // 获取线路交换按钮
    const interchangeBtn = document.querySelector('#query-box-simple img');
    // 具体查询框
    const queryBoxSimple = document.querySelector('#query-box-simple');
    // 票价说明弹出框
    const ticketInfo = document.querySelector('#ticket-info-modal-box');
    // 具体查询框的关闭按钮
    const closeBtnSpec = document.querySelector('#query-box-specific #close-btn');
    // 具体查询框票价说明按钮
    const ticketInfoBtn = document.querySelector('#ticket-info');
    // 票价说明模态框右上角的关闭按钮
    const ticketInfoCloseBtn = document.querySelector('#ticket-info-modal-box #close-btn');
    // 获取遮罩层
    const maskLayer = document.querySelector('.mask-layer');
    // 获取点击购买按钮
    const buyTicket = document.querySelector('#buy-ticket');
    // 获取添加收藏按钮
    const addCollection = document.querySelector('#add-collection');
    // 获取登录提示弹出框
    const notLoginBox = document.querySelector('.not-login-tip-box');
    // 是按钮
    const yesBtn = document.querySelector('.yes-btn');
    // 否按钮
    const noBtn = document.querySelector('.no-btn');
    // 获取具体查询框的title
    const stationQueryTitle = document.querySelector('#station-info-bar > div > div.small-title');
    // 获取折叠按钮
    const foldBtn = document.querySelector('#fold-btn');
    // 获取路程信息的元素节点
    const pathInfo = document.querySelector('#path-info');
    // 获取预计时间元素节点
    const scheduledTime = document.querySelector('#scheduled-time');
    // 获取票价元素节点
    const ticketPrice = document.querySelector('#ticket-price');
    // 获取换乘信息元素节点
    const transferInfo = document.querySelector('#transfer-info');
    // 定义换乘次数
    let transferCount;
    // 制定“预计时间”计算规则函数
    /****************************************************************************************************
     * 设计思路：
     * 1.给每个站点都设置状态颜色，而中转站统一设置为黑色
     * 2.获取所有站点的状态颜色，并存放与一个数组中
     * 3.根据该数组的长度来判断换乘次数
     * 4.如果存放颜色状态的数组中存在黑色，及中转站对应的颜色，则在原来的基础上统一减少一次换乘次数
     * 5.根据基础时间为1.33km/min，每更换一次线路需要3min这一规则进行计算返回
     ***************************************************************************************************/
    function timeHandler() {
        // 获取总路程信息以及途经站点信息，此处之所以将变量放在作用域内，而在两个作用域中分别定义,
        // 是为了避免，当起点及终点的值为空时，用户点击查询，直接执行了getPath函数，而导致无法有效弹出警示框
        let { path: stationGroup, weight: distance } = graph.getPath(...arrSelection);
        // 定义一个数组，用于存放输出的途经的线路种类，忽略中转站
        const lineKind = [];
        stationGroup.forEach(function (val, index) {
            lineKind[index] = document.querySelector(`#${val}`).getAttribute('color');
        });
        // 数组去重
        (function unique(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] == arr[j]) {
                        arr.splice(j, 1);
                        j--;
                    }
                }
            }
            return arr;
        })(lineKind);

        // 定义最终的换乘次数,根据线路种类数判断
        transferCount = lineKind.length - 1;
        // 如果存在中转站，则让线路种类减1，并体现在线路条数上
        if (lineKind.includes('black')) {
            transferCount--;
        }

        // 规则计算
        return (time = `${(parseFloat(distance) / 1.33 + 3 * transferCount).toFixed(1)}min`);
    }
    // 制定票价计算规则
    function ticketPriceHandler() {
        let gradFirst = 2; // 起步价(<4km)固定为2元
        let gradSecond = 4; // 第二梯度(4km-12km)价格为4公里/元
        let gradThird = 6; // 第三梯度(12km-24km)价格为6公里/元
        let gradForth = 8; // 第四梯度(>24km)价格为8公里/元
        let price;
        // 获取总路程信息以及途经站点信息，使用逻辑中断处理，让点击查询时不报错
        let { path: stationGroup, weight: distance } = arrSelection.length == 2 && graph.getPath(...arrSelection);
        if (distance > 0 && distance <= 4) {
            price = gradFirst;
        } else if (distance <= 12) {
            price = gradFirst + (distance - 4) / gradSecond;
        } else if (distance <= 24) {
            price = gradFirst + 8 / gradSecond + (distance - 12) / gradThird;
        } else {
            price = gradFirst + 8 / gradSecond + 12 / gradThird + (distance - 24) / gradForth;
        }
        return price.toFixed(1);
    }
    // 途经站点处理函数
    function stationListHandler(specificList) {
        // 获取线路查询栏中途经站点元素节点
        const stationList = document.querySelectorAll(`#station-list.${specificList}`);
        // 获取列表区内容
        const list = stationList[stationList.length - 1].children[3];
        // 清空list内容
        while (list.firstElementChild) {
            list.removeChild(list.firstElementChild);
        }
        // 获取通过佛洛依德算法获取的经由最短路径计算过的数据
        let { path: stationGroup, weight: distance } = arrSelection.length == 2 && graph.getPath(...arrSelection);
        // 定义四个数组，存放不同线路的站点id
        const redLineStationGroup = [];
        const blueLineStationGroup = [];
        const purpleLineStationGroup = [];
        const greenLineStationGroup = [];
        // 定义一个数组，根据原始数据获取相应的元素节点，并存储进该数组中
        const arrEle = [];
        stationGroup &&
            stationGroup.forEach(function (val, index) {
                arrEle[index] = document.querySelectorAll(`#${val}`);
            });
        arrEle.forEach(function (val) {
            val.forEach(function (subVal) {
                // 获取父节点的id
                const whatALine = subVal.parentNode.id;
                switch (whatALine) {
                    case 'red_line_stations':
                        redLineStationGroup.push(subVal);
                        break;
                    case 'blue_line_stations':
                        blueLineStationGroup.push(subVal);
                        break;
                    case 'purple_line_stations':
                        purpleLineStationGroup.push(subVal);
                        break;
                    case 'green_line_stations':
                        greenLineStationGroup.push(subVal);
                        break;
                }
            });
        });
        // 定义数组存储站点名
        const redLineStationName = [];
        const blueLineStationName = [];
        const purpleLineStationName = [];
        const greenLineStationName = [];

        // 根据站点id获取相应的站点名，封装一个函数
        function getStationName(group, nameArr) {
            group.forEach(function (val) {
                let name = val.getAttribute('text');
                nameArr.push(name);
            });
        }

        // 执行函数，用逻辑中断判断
        redLineStationGroup && getStationName(redLineStationGroup, redLineStationName);
        blueLineStationGroup && getStationName(blueLineStationGroup, blueLineStationName);
        purpleLineStationGroup && getStationName(purpleLineStationGroup, purpleLineStationName);
        greenLineStationGroup && getStationName(greenLineStationGroup, greenLineStationName);

        // 处理红线站点，空数组，空对象，负值，均判断为false
        if (redLineStationGroup.length !== 0) {
            // 创建第一级li
            const li = document.createElement('li');
            li.innerHTML = `
                <ul class="sub-list">
                    <li class="sub-title">1号线：</li>
                </ul>
            `;
            console.log(redLineStationGroup);

            // 处理红线站点
            redLineStationName.forEach(function (val) {
                // 创建第二级li
                const subLi = document.createElement('li');
                switch (val) {
                    case '江门站':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    case '中心南路':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="purple-line line-icon">3</span>${val}`;
                        break;
                    case '市政府':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    case '龙溪':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="green-line line-icon">4</span>${val}`;
                        break;
                    case '滨江':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    default:
                        subLi.innerHTML = `<span class="red-line line-icon">1</span>${val}`;
                }
                // 添加子节点
                li.children[0].appendChild(subLi);
            });
            list.appendChild(li);
        }

        // 处理蓝线站点
        if (blueLineStationGroup.length !== 0) {
            // 创建第一级li
            const li = document.createElement('li');
            li.innerHTML = `
                <ul class="sub-list">
                    <li class="sub-title">2号线：</li>
                </ul>
            `;

            // 处理蓝线站点
            blueLineStationName.forEach(function (val) {
                // 创建第二级li
                const subLi = document.createElement('li');
                switch (val) {
                    case '江门站':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    case '东海路':
                        subLi.innerHTML = `<span class="blue-line line-icon">2</span><span class="purple-line line-icon">3</span>${val}`;
                        break;
                    case '市政府':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    case '东方广场':
                        subLi.innerHTML = `<span class="blue-line line-icon">2</span><span class="green-line line-icon">4</span>${val}`;
                        break;
                    case '滨江':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}`;
                        break;
                    default:
                        subLi.innerHTML = `<span class="blue-line line-icon">2</span>${val}`;
                }
                // 添加子节点
                li.children[0].appendChild(subLi);
            });
            // 添加节点
            list.appendChild(li);
        }

        // 处理紫线站点
        if (purpleLineStationGroup.length !== 0) {
            // 创建第一级li
            const li = document.createElement('li');
            li.innerHTML = `
                <ul class="sub-list">
                    <li class="sub-title">3号线：</li>
                </ul>
            `;

            // 处理蓝线站点
            purpleLineStationName.forEach(function (val) {
                // 创建第二级li
                const subLi = document.createElement('li');
                switch (val) {
                    case '中心南路':
                        subLi.innerHTML = `<li><span class="red-line line-icon">1</span><span class="purple-line line-icon">3</span>${val}</li>`;
                        break;
                    case '东海路':
                        subLi.innerHTML = `<li><span class="blue-line line-icon">2</span><span class="purple-line line-icon">3</span>${val}</li>`;
                        break;
                    default:
                        subLi.innerHTML = `<li><span class="purple-line line-icon">3</span>${val}</li>`;
                }
                // 添加子Li
                li.children[0].appendChild(subLi);
            });
            // 添加节点
            list.appendChild(li);
        }

        // 处理绿线站点
        if (greenLineStationGroup.length !== 0) {
            // 创建第一级li
            const li = document.createElement('li');
            li.innerHTML = `
                <ul class="sub-list">
                    <li class="sub-title">4号线：</li>
                </ul>
            `;

            // 处理蓝线站点
            greenLineStationName.forEach(function (val) {
                // 创建第二级li
                const subLi = document.createElement('li');
                switch (val) {
                    case '东方广场':
                        subLi.innerHTML = `<span class="blue-line line-icon">2</span><span class="green-line line-icon">4</span>${val}`;
                        break;
                    case '龙溪':
                        subLi.innerHTML = `<span class="red-line line-icon">1</span><span class="green-line line-icon">4</span>${val}`;
                        break;
                    default:
                        subLi.innerHTML = `<span class="green-line line-icon">4</span>${val}`;
                }
                // 添加子Li
                li.children[0].appendChild(subLi);
            });
            // 添加节点
            list.appendChild(li);
        }
    }
    // 制定换乘信息栏处理函数
    // FIXME:仅显示中转站，而并非真实的换乘信息
    function transferInfoHandler() {
        // 获取经由佛洛依德算法计算的最短路径信息
        let { path: stationGroup, weight: distance } = graph.getPath(...arrSelection);
        // 获取列表
        const list = transferInfo.children[3];
        // 清空列表
        while (list.lastElementChild) {
            list.removeChild(list.lastElementChild);
        }
        // 筛选出中转站
        const transferGroup = stationGroup.filter((val) => val.at(-1) == 't');
        // 定义一个数组，存放筛选出来的中转站的名字
        const transferName = [];
        transferGroup.forEach(function (val, index) {
            transferName[index] = document.querySelector(`#${val}`).getAttribute('text');
        });
        transferName.forEach(function (val) {
            // 创建列表li
            const li = document.createElement('li');
            switch (val) {
                case '江门站':
                    li.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '中心南路':
                    li.innerHTML = `<span class="red-line line-icon">1</span><span class="purple-line line-icon">3</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '市政府':
                    li.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '龙溪':
                    li.innerHTML = `<span class="red-line line-icon">1</span><span class="green-line line-icon">4</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '滨江':
                    li.innerHTML = `<span class="red-line line-icon">1</span><span class="blue-line line-icon">2</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '东海路':
                    li.innerHTML = `<span class="blue-line line-icon">2</span><span class="purple-line line-icon">3</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
                case '东方广场':
                    li.innerHTML = `<span class="blue-line line-icon">2</span><span class="green-line line-icon">4</span>${val}<span class="wait-time">（3min）</span>`;
                    break;
            }
            list.appendChild(li);
        });
    }
    // 给线路查询按钮绑定Click事件
    routeQueryBtn.addEventListener('click', function () {
        // 调用站点处理函数
        stationListHandler('line-query');
        // 调用中转站处理函数
        arrSelection.length == 2 && transferInfoHandler();
        // 判断输入框的值是否满足打开具体信息栏条件
        if (startStationIpt.value && endStationIpt.value) {
            // 设置简易查询框与具体查询框的隐藏和展示
            queryBoxSpecific.style.display = 'block';
            queryBoxSimple.style.display = 'none';
            // 获取总路程信息以及途经站点信息
            let { path: stationGroup, weight: distance } = graph.getPath(...arrSelection);
            // 对路程信息进行赋值操作
            pathInfo.children[0].innerHTML = `${distance}km`;
            // 对预计时间信息进行赋值操作
            scheduledTime.children[0].innerHTML = timeHandler();
            // 操作DOM，为票价栏赋值
            ticketPrice.children[0].innerHTML = ticketPriceHandler();
            // 设置遮罩层
            maskLayer.style.display = 'block';
        } else {
            popupErrMsg('您没有完整地选择起点站以及终点站，请确保完整选择两个站点再点击查询按钮。');
        }
    });

    // 给交换线路按钮绑定CLICK事件
    // TODO: 只选择一个点时，也可以交换起点终点
    interchangeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        // 获取arrSelection中的数组，并根据数据获取相应的元素节点
        const startBtn = document.querySelector(`#${arrSelection[0]}`);
        const endBtn = document.querySelector(`#${arrSelection[1]}`);
        // 注意，svg元素无法直接使用click()触发事件，必须使用dispatchEvent(new Event('click'));
        // 事件触发队列
        endBtn.dispatchEvent(new Event('click'));
        tip_route_btn_start.click();
        startBtn.dispatchEvent(new Event('click'));
        tip_route_btn_end.click();
    });

    // 给具体查询框的关闭按钮绑定click事件
    closeBtnSpec.addEventListener('click', function () {
        // 让具体查询信息框关闭
        queryBoxSpecific.style.display = 'none';
        // 让简单信息框重新展示
        queryBoxSimple.style.display = 'block';
        // 让遮罩层消失
        maskLayer.style.display = 'none';
        // 让下拉菜单直接折叠
        initSlideDown();
    });
    // 给具体查询框票价说明按钮绑定click事件
    ticketInfoBtn.addEventListener('click', function () {
        // 让票价说明框弹出
        ticketInfo.style.display = 'block';
        // 让遮罩层覆盖
        maskLayer.style.display = 'block';
    });
    // 给票价说明模态框右上角的关闭按钮添加click事件，使当前弹出框关闭
    ticketInfoCloseBtn.addEventListener('click', function () {
        ticketInfo.style.display = 'none';
    });
    // 给“点击购买”按钮添加click事件
    buyTicket.addEventListener('click', function () {
       // 提示登录
       notLoginBox.style.display = 'block';
    });
    // 给"添加收藏“事件绑定click事件
    addCollection.addEventListener('click', function () {
       // 提示登录
       notLoginBox.style.display = 'block';
    });

    // 给“是”按钮绑定点击事件
    yesBtn.addEventListener('click', function () {
        window.location.href = '../html/commonUserLogin.html';
    });
    // 给否按钮绑定点击事件
    noBtn.addEventListener('click', function () {
        maskLayer.style.display = 'none';
        notLoginBox.style.display = 'none';
    });
    // TODO: 为侧边折叠按钮绑定CLICK事件，添加缓动折叠效果

    // foldBtn.addEventListener('click', function () {
    //     // 获取右侧面板
    //     const rightBar = queryBoxSpecific.children[0].children[1]
    //     rightBar.classList.add('.is-fold')
    // })

    /***********************************地铁线路示意图交互 **********************************/
    // TODO: 缓动聚焦效果
    // TODO: 线路示意图可拖拽效果
    // TODO: 线路示意图缩放效果
    // 获取各线路组的线路单元
    const redLineUnits = document.querySelectorAll('#red_line_units path');
    const blueLineUnits = document.querySelectorAll('#blue_line_units path');
    const purpleLineUnits = document.querySelectorAll('#purple_line_units path');
    const greenLineUnits = document.querySelectorAll('#green_line_units path');
    // 定义地铁线路示意图初始化函数
    function lineDiagramInit() {
        redLineUnits.forEach(function (val) {
            val.setAttribute('fill', '#cc0c30');
            val.setAttribute('stroke', '#e54648');
            val.innerHTML = '';
        });
        blueLineUnits.forEach(function (val) {
            val.setAttribute('fill', '#2e57d0');
            val.setAttribute('stroke', '#1f53ba');
            val.innerHTML = '';
        });
        purpleLineUnits.forEach(function (val) {
            val.setAttribute('fill', '#7030a0');
            val.setAttribute('stroke', '#8b13be');
            val.innerHTML = '';
        });
        greenLineUnits.forEach(function (val) {
            val.setAttribute('fill', '#42c181');
            val.setAttribute('stroke', '#209058');
            val.innerHTML = '';
        });
    }
    // 获取地铁线路示意图全部内容
    const lineDiagram = document.querySelector('#lineDiagram');
    // 点击站点后的弹出提示选择框
    const tip_wrapper = document.querySelector('#tip-wrapper');
    // 获取线路中的每一个站点
    const stations = document.querySelectorAll('.circle');
    // 获取选择起点按钮
    const tip_route_btn_start = document.querySelector('.tip-route-btn-start');
    // 获取选择终点按钮
    const tip_route_btn_end = document.querySelector('.tip-route-btn-end');
    // 获取起点输入框
    const startStationIpt = queryBoxSimple.children[1].children[0].children[0];
    // 获取终点输入框
    const endStationIpt = queryBoxSimple.children[1].children[1].children[0];
    // 获取提示框名字
    const tipName = tip_wrapper.children[0].children[0].children[0];
    // 获取提示框的线路数字
    const routeNum = document.querySelectorAll('#route-num');
    // 获取选择站点后的残留标识
    const ident = document.querySelectorAll('.ident');
    /********************************************最短路径处理程序********************************************/
    // 获取所有相邻站点的线路单元的元素节点
    const lineUnits = this.document.querySelectorAll('#subway_lines>g>g>*');

    // 获取红蓝紫绿四条线的站点(包含中转站)
    const redLineStations = this.document.querySelectorAll('#red_line_stations .circle');
    const blueLineStations = this.document.querySelectorAll('#blue_line_stations .circle');
    const purpleLineStations = this.document.querySelectorAll('#purple_line_stations .circle');
    const greenLineStations = this.document.querySelectorAll('#green_line_stations .circle');

    // 为每组线路都设定动态设定颜色状态，中转站设为黑色
    // 先封装一个函数
    function setColorStatus(stationGroup, color) {
        stationGroup.forEach(function (val) {
            if (val.id.at(-1) == 't') {
                val.setAttribute('color', 'black');
            } else {
                val.setAttribute('color', color);
            }
        });
    }

    // 执行设置颜色状态函数
    setColorStatus(redLineStations, 'red');
    setColorStatus(blueLineStations, 'blue');
    setColorStatus(purpleLineStations, 'purple');
    setColorStatus(greenLineStations, 'green');

    // 获取中转站(在html中放置与中转站组的站点)
    const transferStations = this.document.querySelectorAll('#transfer_stations .circle');
    console.log('中转站元素节点：\r', transferStations, '\r\n----------------------------------------------------------------');

    // 定义一个线路单元的信息对象
    const lineUnitsInfo = [];
    for (let i = 0; i < lineUnits.length; i++) {
        {
            const obj = new Object();
            obj.distance = lineUnits[i].getAttribute('distance');
            obj.connect = lineUnits[i].getAttribute('connect');
            const arr = lineUnits[i].getAttribute('id').split('_');
            obj.line = arr[0];
            lineUnitsInfo.push(obj);
        }
    }

    // 查看站点编号及对应名称
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];
    // 通过DOM获取站点信息，将数据提取到对象中
    redLineStations.forEach(function (val) {
        const obj = new Object();
        obj.stationName = val.getAttribute('text');
        obj.index = val.getAttribute('data-index');
        arr1.push(obj);
    });
    blueLineStations.forEach(function (val) {
        const obj = new Object();
        obj.stationName = val.getAttribute('text');
        obj.index = val.getAttribute('data-index');
        arr2.push(obj);
    });
    purpleLineStations.forEach(function (val) {
        const obj = new Object();
        obj.stationName = val.getAttribute('text');
        obj.index = val.getAttribute('data-index');
        arr3.push(obj);
    });
    greenLineStations.forEach(function (val) {
        const obj = new Object();
        obj.stationName = val.getAttribute('text');
        obj.index = val.getAttribute('data-index');
        arr4.push(obj);
    });

    // 合并所有所有线路的站点，并去重
    const uniqueStationGroup = [...arr1, ...arr2, ...arr3, ...arr4];
    // 数组去重，立即执行，注意：立即执行函数的前置行必须加上“;"，否则前置行会被认定为函数名，圆括号包含的立即执行函数会被认定为调用()
    (function unique(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i]['index'] == arr[j]['index']) {
                    // 第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    // 因为原数组已经改变，直接保持该轮循环的原索引值即可，此处需j--，下一轮再j++，即可返回原索引位置，重新检测，确保不遗漏
                    j--;
                }
            }
        }
        return arr;
    })(uniqueStationGroup);

    // 或取所有站点的元素节点，并去重
    const redLineNode = this.document.querySelectorAll('#red_line_stations .circle');
    const blueLineNode = this.document.querySelectorAll('#blue_line_stations .circle');
    const purpleLineNode = this.document.querySelectorAll('#purple_line_stations .circle');
    const greenLineNode = this.document.querySelectorAll('#green_line_stations .circle');
    const nodeArr = [...redLineNode, ...blueLineNode, ...purpleLineNode, ...greenLineNode];
    (function unique(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].getAttribute('text') == arr[j].getAttribute('text')) {
                    // 第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    // 因为原数组已经改变，直接保持该轮循环的原索引值即可，此处需j--，下一轮再j++，即可返回原索引位置，重新检测，确保不遗漏
                    j--;
                }
            }
        }
        return arr;
    })(nodeArr);

    // 控制台输出查看
    console.log('1号线站点：\r\n', arr1, '\r\n----------------------------------------------------------------');
    console.log('2号线站点：\r\n', arr2, '\r\n----------------------------------------------------------------');
    console.log('3号线站点：\r\n', arr3, '\r\n----------------------------------------------------------------');
    console.log('4号线站点：\r\n', arr4, '\r\n----------------------------------------------------------------');
    console.log('所有站点：\r', uniqueStationGroup, '\r\n----------------------------------------------------------------');
    console.log('所有线路单元基本信息：\r', lineUnitsInfo, '\r\n----------------------------------------------------------------');
    console.log('所有线路单元元素节点：\r', lineUnits, '\r\n----------------------------------------------------------------');
    // 封装一个用于针对性制定邻接矩阵的行的函数
    // ...theArgs中包含两类参数，第一个参数传入的是所在行的第一个站点，其余参数传入的是lineUnitsInfo中connect的值，且必须与connect的值保持一致，但无顺序要求
    function matrixRowHandler(...theArgs) {
        // 定义一个用于过滤参数的函数，val最开始是一个字符串，然后通过split()分离 -> filter()过滤取出与站点名不同的另一个值 -> toString()取出字符串
        function filterIt(val) {
            return val
                .split('-')
                .filter((k) => k !== theArgs[0])
                .toString();
        }
        // 封装一个用于获取线路单元长度的函数，输入相邻两站点的名字，输出相应的路径值
        function getLineUnitsDistance(connectRoute) {
            // 根据属性值获取相应的对象
            let obj = lineUnitsInfo.find((val) => {
                return val.connect == connectRoute;
            });
            return parseFloat(obj.distance);
        }
        // 定义一个数组，供后续程序使用
        const arr = [];
        // 用逻辑中断处理case的值，避免空值报错，定义四个参数，因为最多根据实际需求，最多传入四个参数
        // TODO:如果需要搭建无数条边呢？该如何封装这个函数
        // TODO:可以继续使用逻辑中断减少参数的输入，同时保证语义明确，用逻辑中断判断connect的值
        for (let i = 0; i < uniqueStationGroup.length; i++) {
            switch (uniqueStationGroup[i].stationName) {
                case theArgs[0]:
                    arr[i] = 0;
                    break;
                case theArgs[1] && filterIt(theArgs[1]):
                    arr[i] = getLineUnitsDistance(theArgs[1]);
                    break;
                case theArgs[2] && filterIt(theArgs[2]):
                    arr[i] = getLineUnitsDistance(theArgs[2]);
                    break;
                case theArgs[3] && filterIt(theArgs[3]):
                    arr[i] = getLineUnitsDistance(theArgs[3]);
                    break;
                case theArgs[4] && filterIt(theArgs[4]):
                    arr[i] = getLineUnitsDistance(theArgs[4]);
                    break;
                default:
                    arr[i] = Infinity;
            }
        }
        return arr;
    }

    // 定义一个对象，用于存储邻接矩阵的每一行，结尾加_t代表中转站
    const matrixRowObj = {
        jiang_men_zhan_t: matrixRowHandler('江门站', '江门站-启超大道', '江门站-礼东'),
        qi_chao_da_dao: matrixRowHandler('启超大道', '江门站-启超大道', '启超大道-中心南路'),
        zhong_xin_nan_lu_t: matrixRowHandler('中心南路', '启超大道-中心南路', '中心南路-冈州大道', '三和大道-中心南路', '中心南路-侨兴路'),
        gang_zhou_da_dao: matrixRowHandler('冈州大道', '中心南路-冈州大道', '冈州大道-会城大道'),
        hui_cheng_da_dao: matrixRowHandler('会城大道', '冈州大道-会城大道', '会城大道-龙湾路'),
        long_wan_lu: matrixRowHandler('龙湾路', '会城大道-龙湾路', '龙湾路-白沙大道'),
        bai_sha_da_dao: matrixRowHandler('白沙大道', '龙湾路-白沙大道', '白沙大道-华园路'),
        hua_yuan_lu: matrixRowHandler('华园路', '白沙大道-华园路', '华园路-市政府'),
        shi_zheng_fu_t: matrixRowHandler('市政府', '华园路-市政府', '市政府-五邑大学', '市政府-东方广场', '新南里-市政府'),
        wu_yi_da_xue: matrixRowHandler('五邑大学', '市政府-五邑大学', '五邑大学-龙溪'),
        long_xi_t: matrixRowHandler('龙溪', '五邑大学-龙溪', '龙溪-北环路', '万达-龙溪', '龙溪-潮连'),
        bei_huan_lu: matrixRowHandler('北环路', '龙溪-北环路', '北环路-水厂'),
        shui_chang: matrixRowHandler('水厂', '北环路-水厂', '水厂-周郡'),
        zhou_jun: matrixRowHandler('周郡', '水厂-周郡', '周郡-大林'),
        da_lin: matrixRowHandler('大林', '周郡-大林', '大林-华盛路'),
        hua_sheng_lu: matrixRowHandler('华盛路', '大林-华盛路', '华盛路-滨江'),
        bin_jiang_t: matrixRowHandler('滨江', '华盛路-滨江', '滨江-棠下', '新南路-滨江', '滨江-滨江南'),
        tang_xia: matrixRowHandler('棠下', '滨江-棠下', '棠下-竹溪'),
        zhu_xi: matrixRowHandler('竹溪', '棠下-竹溪', '竹溪-雅瑶'),
        ya_yao: matrixRowHandler('雅瑶', '竹溪-雅瑶', '雅瑶-月光'),
        yue_guang: matrixRowHandler('月光', '雅瑶-月光', '月光-鹤山东站'),
        he_shan_dong_zhan: matrixRowHandler('鹤山东站', '月光-鹤山东站', '鹤山东站-古桥'),
        gu_qiao: matrixRowHandler('古桥', '鹤山东站-古桥', '古桥-鹤山行政中心'),
        he_shan_xing_zheng_zhong_xin: matrixRowHandler('鹤山行政中心', '古桥-鹤山行政中心', '鹤山行政中心-沙坪'),
        sha_ping: matrixRowHandler('沙坪', '鹤山行政中心-沙坪', '沙坪-新城路'),
        xin_cheng_lu: matrixRowHandler('新城路', '沙坪-新城路', '新城路-古劳水乡'),
        gu_lao_shui_xiang: matrixRowHandler('古劳水乡', '新城路-古劳水乡'),
        li_dong: matrixRowHandler('礼东', '江门站-礼东', '礼东-东海路'),
        dong_hai_lu_t: matrixRowHandler('东海路', '礼东-东海路', '东海路-江海', '纳谷-东海路', '东海路-广丰'),
        jiang_hai: matrixRowHandler('江海', '东海路-江海', '江海-江门东站'),
        jiang_men_dong_zhan: matrixRowHandler('江门东站', '江海-江门东站', '江门东站-新南里'),
        xin_nan_li: matrixRowHandler('新南里', '江门东站-新南里', '新南里-市政府'),
        dong_fang_guang_chang_t: matrixRowHandler('东方广场', '市政府-东方广场', '东方广场-建设二路', '蓬江站-东方广场', '东方广场-万达'),
        jian_she_er_lu: matrixRowHandler('建设二路', '东方广场-建设二路', '建设二路-汽车站'),
        qi_che_zhan: matrixRowHandler('汽车站', '建设二路-汽车站', '汽车站-潮江里'),
        chao_jiang_li: matrixRowHandler('潮江里', '汽车站-潮江里', '潮江里-新南路'),
        xin_nan_lu: matrixRowHandler('新南路', '潮江里-新南路', '新南路-滨江'),
        bin_jiang_nan: matrixRowHandler('滨江南', '滨江-滨江南', '滨江南-仙溪'),
        xian_xi: matrixRowHandler('仙溪', '滨江南-仙溪', '仙溪-虎岭'),
        hu_ling: matrixRowHandler('虎岭', '仙溪-虎岭', '虎岭-滨江尾'),
        bin_jiang_wei: matrixRowHandler('滨江尾', '虎岭-滨江尾'),
        si_qian: matrixRowHandler('司前', '司前-金泽路'),
        jin_ze_lu: matrixRowHandler('金泽路', '司前-金泽路', '金泽路-大泽'),
        da_ze: matrixRowHandler('大泽', '金泽路-大泽', '大泽-五和'),
        wu_he: matrixRowHandler('五和', '大泽-五和', '五和-同仁'),
        tong_ren: matrixRowHandler('同仁', '五和-同仁', '同仁-工业园'),
        gong_ye_yuan: matrixRowHandler('工业园', '同仁-工业园', '工业园-繁华路'),
        fan_hua_lu: matrixRowHandler('繁华路', '工业园-繁华路', '繁华路-三和大道'),
        san_he_da_dao: matrixRowHandler('三和大道', '繁华路-三和大道', '三和大道-中心南路'),
        qiao_xing_lu: matrixRowHandler('侨兴路', '中心南路-侨兴路', '侨兴路-汇源坊'),
        hui_yuan_fang: matrixRowHandler('汇源坊', '侨兴路-汇源坊', '汇源坊-断河'),
        duan_he: matrixRowHandler('断河', '汇源坊-断河', '断河-礼乐'),
        li_le: matrixRowHandler('礼乐', '断河-礼乐', '礼乐-纳谷'),
        na_gu: matrixRowHandler('纳谷', '礼乐-纳谷', '纳谷-东海路'),
        guang_feng: matrixRowHandler('广丰', '东海路-广丰', '广丰-高新区'),
        gao_xin_qu: matrixRowHandler('高新区', '广丰-高新区', '高新区-兴宁'),
        xing_ning: matrixRowHandler('兴宁', '高新区-兴宁', '兴宁-横海'),
        heng_hai: matrixRowHandler('横海', '兴宁-横海', '横海-科宛路'),
        ke_wan_lu: matrixRowHandler('科宛路', '横海-科宛路', '科宛路-金瓯路'),
        jin_ou_lu: matrixRowHandler('金瓯路', '科宛路-金瓯路', '金瓯路-江海站'),
        jiang_hai_zhan: matrixRowHandler('江海站', '金瓯路-江海站', '江海站-外海'),
        wai_hai: matrixRowHandler('外海', '江海站-外海'),
        gong_he: matrixRowHandler('共和', '共和-杜阮'),
        du_ruan: matrixRowHandler('杜阮', '共和-杜阮', '杜阮-松岭'),
        song_ling: matrixRowHandler('松岭', '杜阮-松岭', '松岭-龙安'),
        long_an: matrixRowHandler('龙安', '松岭-龙安', '龙安-松翠'),
        song_cui: matrixRowHandler('松翠', '龙安-松翠', '松翠-南户'),
        nan_hu: matrixRowHandler('南户', '松翠-南户', '南户-蓬江站'),
        peng_jiang_zhan: matrixRowHandler('蓬江站', '南户-蓬江站', '蓬江站-东方广场'),
        wan_da: matrixRowHandler('万达', '东方广场-万达', '万达-龙溪'),
        chao_lian: matrixRowHandler('潮连', '龙溪-潮连', '潮连-荷塘南'),
        he_tang_nan: matrixRowHandler('荷塘南', '潮连-荷塘南', '荷塘南-民兴路'),
        min_xing_lu: matrixRowHandler('民兴路', '荷塘南-民兴路', '民兴路-中兴三路'),
        zhong_xing_san_lu: matrixRowHandler('中兴三路', '民兴路-中兴三路', '中兴三路-中泰路'),
        zhong_tai_lu: matrixRowHandler('中泰路', '中兴三路-中泰路', '中泰路-荷塘'),
        he_tang: matrixRowHandler('荷塘', '中泰路-荷塘')
    };

    // 最短路径弗洛伊德算法
    /**
     * 图的最短路径
     * @param {string[]} vertex 顶点
     * @param {number[][]} matrix 邻接矩阵
     */
    function createGraph(vertex, matrix) {
        const size = vertex.length;

        const pathTable = [];
        const weightTable = [];

        (function init() {
            for (let i = 0; i < size; i++) {
                pathTable[i] = [];
                weightTable[i] = [];
                for (let j = 0; j < size; j++) {
                    pathTable[i][j] = j;
                    weightTable[i][j] = matrix[i][j];
                }
            }
        })();

        (function floyd() {
            for (let i = 0; i < weightTable.length; i++) {
                for (let j = 0; j < weightTable.length; j++) {
                    for (let k = 0; k < weightTable.length; k++) {
                        if (weightTable[j][k] > weightTable[j][i] + weightTable[i][k]) {
                            pathTable[j][k] = pathTable[j][i];
                            weightTable[j][k] = weightTable[j][i] + weightTable[i][k];
                        }
                    }
                }
            }
        })();

        function getPathByIndex(i, j) {
            const path = [i];
            let nxt = pathTable[i][j];
            while (nxt !== j) {
                path.push(nxt);
                nxt = pathTable[nxt][j];
            }
            path.push(j);
            return path;
        }

        return {
            getPath(startVertice, endVertice) {
                const startIndex = vertex.findIndex((v) => v === startVertice);
                const endIndex = vertex.findIndex((v) => v === endVertice);

                return {
                    path: getPathByIndex(startIndex, endIndex).map((index) => vertex[index]),
                    weight: weightTable[startIndex][endIndex]
                };
            }
        };
    }

    // 顶点
    vertex = Object.keys(matrixRowObj);
    // 邻接矩阵
    matrix = Object.values(matrixRowObj);
    // 创建图
    graph = createGraph(vertex, matrix);

    // 定义获取站点间线路元素节点的处理函数
    function getLineUnitsEle(arr) {
        // 元素节点NodeList返回的是伪数组，无法使用传统的数组方法
        const arrEle = [];
        arr.forEach(function (val) {
            arrEle.push(document.querySelector(`#${val}`));
        });
        const stationName = [];
        arrEle.forEach(function (val) {
            stationName.push(val.getAttribute('text'));
        });
        // 定义一个二维数组，对stationName数组进行处理，用于作为属性值来获取相应的线路元素节点
        const baseConnectGroup = [];
        // 定义一个二级元素翻转的基础数组
        const reverseBaseConnectGroup = [];
        // 让两两相邻的站点形成一组，然后添加“-”
        for (let i = 0; i < stationName.length - 1; i++) {
            baseConnectGroup.push([stationName[i], stationName[i + 1]]);
        }
        for (let i = 0; i < stationName.length - 1; i++) {
            reverseBaseConnectGroup.push([stationName[i], stationName[i + 1]].reverse());
        }
        // 完成版的数组
        const completeConnectGroup = [];
        // 定义一个内部元素值翻转的数组
        const reverseCompleteConnectGroup = [];
        // 二级处理
        baseConnectGroup.forEach(function (val, index) {
            completeConnectGroup[index] = val.join('-');
        });
        // 二级处理
        reverseBaseConnectGroup.forEach(function (val, index) {
            reverseCompleteConnectGroup[index] = val.join('-');
        });
        // 定义路径元素，使用逻辑中断来获取反向选择的路径
        const pathEle = [];
        for (let i = 0; i < completeConnectGroup.length; i++) {
            pathEle.push(document.querySelector(`*[connect="${completeConnectGroup[i]}"]`) || document.querySelector(`*[connect="${reverseCompleteConnectGroup[i]}"]`));
        }
        return pathEle;
    }
    // 点击空白处关闭“点击站点后的弹出提示选择框”
    lineDiagram.addEventListener('click', function () {
        tip_wrapper.style.display = 'none';
        lineDiagramInit();
    });

    // 定义一个数组，用于存储所选择的起点与终点
    let arrSelection = [];

    // 定义点击站点事件
    for (let i = 0; i < stations.length; i++) {
        stations[i].addEventListener('click', function (e) {
            // 阻止事件冒泡
            e.stopPropagation();
            // 获取普通站点id
            let stationId = this.id;
            // 处理在图层最上方的中转站，历史遗留问题，不想再重新搭建结构，重新写样式，此处只能这样处理
            switch (stationId) {
                case 'red_blue_line_jiangMenZhan':
                    stationId = 'jiang_men_zhan_t';
                    break;
                case 'red_purple_line_zhongXinNanLu':
                    stationId = 'zhong_xin_nan_lu_t';
                    break;
                case 'red_blue_line_shiZhengFu':
                    stationId = 'shi_zheng_fu_t';
                    break;
                case 'red_green_line_longXi':
                    stationId = 'long_xi_t';
                    break;
                case 'red_blue_line_binJiang':
                    stationId = 'bin_jiang_t';
                    break;
                case 'blue_purple_line_dongHaiLu':
                    stationId = 'dong_hai_lu_t';
                    break;
                case 'blue_green_line_dongFangGuangChang':
                    stationId = 'dong_fang_guang_chang_t';
            }
            // 获取站点名
            const stationName = this.nextElementSibling.innerHTML;
            // 获取当前站点所属的线路组
            const stationGroup = this.parentNode;
            // 通过条件判断普通站点所在线路组，为routeName添加背景色
            switch (stationGroup.id) {
                case 'red_line_stations':
                    routeNum[0].style.backgroundColor = 'red';
                    routeNum[0].innerHTML = '1';
                    routeNum[1].style.display = 'none';
                    break;
                case 'blue_line_stations':
                    routeNum[0].style.backgroundColor = 'blue';
                    routeNum[0].innerHTML = '2';
                    routeNum[1].style.display = 'none';
                    break;
                case 'purple_line_stations':
                    routeNum[0].style.backgroundColor = 'purple';
                    routeNum[0].innerHTML = '3';
                    routeNum[1].style.display = 'none';
                    break;
                case 'green_line_stations':
                    routeNum[0].style.backgroundColor = 'green';
                    routeNum[0].innerHTML = '4';
                    routeNum[1].style.display = 'none';
                    break;
                // 对中转站进行处理
                default:
                    // 从所点击站点的id中提取一个数组，记录对应中转站的颜色属性
                    const lineColor = this.id.split('_').slice(0, 2);
                    // 定义一个颜色数组
                    const color = ['red', 'blue', 'purple', 'green'];
                    // 让第二个routeNum元素展示
                    routeNum[1].style.display = 'block';
                    // 根据前面定义的数组来改变不同routeNum线路数字的样式
                    routeNum[0].style.backgroundColor = lineColor[0];
                    routeNum[1].style.backgroundColor = lineColor[1];
                    // 使用indexOf方法来判断颜色的索引值，进而改变routeNum的数字
                    routeNum[0].innerHTML = color.indexOf(lineColor[0]) + 1;
                    routeNum[1].innerHTML = color.indexOf(lineColor[1]) + 1;
            }

            // 让提示框的名字等于站点名
            tipName.innerHTML = stationName;
            // 显示提示框
            tip_wrapper.style.display = 'block';
            let cx = this.getAttribute('cx');
            let cy = this.getAttribute('cy');
            tip_wrapper.style.left = `${cx - 140}px`;
            tip_wrapper.style.top = `${cy - 147}px`;

            // 定义选择线路起点的事件处理函数
            function clickStart(e) {
                e.stopPropagation();
                // 定义一个变量，用于存储起点的id
                // 将站点名称传输至输入框
                startStationIpt.value = stationName;
                // 通过条件判断，判断起点终点的值是否相同，若相同则让另一个输入框的值设为空字符串
                if (startStationIpt.value == endStationIpt.value) {
                    endStationIpt.value = '';
                    ident[1].style.display = 'none';
                }
                // 让选择起点后，原站点位置残留“起点”标识
                ident[0].style.display = 'block';
                ident[0].style.left = `${cx - 15}px`;
                ident[0].style.top = `${cy - 50}px`;
                // 让线路选择提示框不展示
                tip_wrapper.style.display = 'none';
                // 为查询框的title赋值
                stationQueryTitle.children[0].innerHTML = startStationIpt.value;
                // 改变用于存储起点的数组元素
                arrSelection[0] = stationId;
                // if (arrSelection[0] == arrSelection[1]) {
                //     arrSelection.splice(0, 1);
                // }
                // 获取总路程信息以及途经站点信息
                let { path: stationGroup, weight: distance } = arrSelection.length == 2 && graph.getPath(...arrSelection);
                const lineUnitsEle = stationGroup && getLineUnitsEle(stationGroup);
                // 初始化地铁线路示意图
                lineDiagramInit();
                // 添加选择线路突出显示效果，设置多个逻辑中断防止选取相同站点时报错
                lineUnitsEle &&
                    lineUnitsEle[0] !== null &&
                    lineUnitsEle.forEach(function (val) {
                        // 处理由多个xml标签组成的线路单元，确保每一条线都正常显示
                        if (val.tagName == 'g') {
                            for (let i = 0; i < val.children.length; i++) {
                                // 给svg添加闪烁动画
                                val.children[i].innerHTML = `<animate attributeType="XML" attributeName="fill" values="yellow;yellow;#ffa500;yellow" dur="0.8s" repeatCount="indefinite" />`;
                                val.children[i].setAttribute('stroke', '#fff');
                            }
                        } else {
                            val.innerHTML = `<animate attributeType="XML" attributeName="fill" values="yellow;yellow;#ffa500;yellow" dur="0.8s" repeatCount="indefinite" />`;
                            val.setAttribute('stroke', '#fff');
                        }
                    });
                // 直接销毁两个点击事件，只限用户在同一站点内点击一次起点或终点
                tip_route_btn_start.removeEventListener('click', clickStart);
                tip_route_btn_end.removeEventListener('click', clickEnd);
            }

            // 定义选择线路终点的事件处理函数
            function clickEnd(e) {
                e.stopPropagation();
                // 将站点名称传输至输入框
                endStationIpt.value = stationName;
                // 通过条件判断，判断起点终点的值是否相同，若相同则让另一个输入框的值设为空字符串,并让相对的残留标志消失
                if (startStationIpt.value == endStationIpt.value) {
                    startStationIpt.value = '';
                    ident[0].style.display = 'none';
                }
                ident[1].style.display = 'block';
                ident[1].style.left = `${cx - 15}px`;
                ident[1].style.top = `${cy - 50}px`;
                // 让线路选择提示框不展示
                tip_wrapper.style.display = 'none';
                // 为查询框的title赋值
                stationQueryTitle.children[2].innerHTML = endStationIpt.value;
                // 改变用于存储终点的数组元素
                arrSelection[1] = stationId;
                // if (arrSelection[0] == arrSelection[1]) {
                //     arrSelection.splice(1, 1);
                // }
                // 获取总路程信息以及途经站点信息
                let { path: stationGroup, weight: distance } = arrSelection.length == 2 && graph.getPath(...arrSelection);
                console.log(stationGroup);
                const lineUnitsEle = stationGroup && getLineUnitsEle(stationGroup);
                // 初始化地铁线路示意图
                lineDiagramInit();
                // 添加选择线路突出显示效果，设置多个逻辑中断防止选取相同站点时报错
                lineUnitsEle &&
                    lineUnitsEle[0] !== null &&
                    lineUnitsEle.forEach(function (val) {
                        // 处理由多个xml标签组成的线路单元，确保每一条线都正常显示
                        if (val.tagName == 'g') {
                            for (let i = 0; i < val.children.length; i++) {
                                // 给svg添加闪烁动画
                                val.children[i].innerHTML = `<animate attributeType="XML" attributeName="fill" values="yellow;yellow;#ffa500;yellow" dur="0.8s" repeatCount="indefinite" />`;
                                val.children[i].setAttribute('stroke', '#fff');
                            }
                        } else {
                            val.innerHTML = `<animate attributeType="XML" attributeName="fill" values="yellow;yellow;#ffa500;yellow" dur="0.8s" repeatCount="indefinite" />`;
                            val.setAttribute('stroke', '#fff');
                        }
                    });
                // 直接销毁两个点击事件，只限用户在同一站点内点击一次起点或终点
                tip_route_btn_start.removeEventListener('click', clickStart);
                tip_route_btn_end.removeEventListener('click', clickEnd);
            }
            // 为“起点”按钮添加click事件
            tip_route_btn_start.addEventListener('click', clickStart);
            // 为“终点"按钮添加click事件
            tip_route_btn_end.addEventListener('click', clickEnd);
        });
    }
});
