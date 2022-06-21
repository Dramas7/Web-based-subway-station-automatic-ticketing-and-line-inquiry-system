function resolveData(data) {
    var arr = [];
    for (var k in data) {
        var str = k + '=' + data[k];
        arr.push(str);
    }

    return arr.join('&');
}

/**
 * 根据常用属性及方法封装的一个基于ajax的对象
 * @param {object} options -配置对象
 * @returns {any} -返回任意值
 */
var ajax = (options) => {
    var xhr = new XMLHttpRequest();

    // 把外界传递过来的参数对象，转换为 查询字符串
    var qs = resolveData(options.data);

    // 设置asyn的默认值
    let async = 'async' in options ? options.async : true;
    if (options.method.toUpperCase() === 'GET') {
        // 发起GET请求
        // 配置同步异步
        if (async == true) {
            xhr.open(options.method, options.url + '?' + qs);
        } else if (async == false) {
            xhr.open(options.method, `${options.url}?${qs}`, false);
            xhr.send();
            let result = JSON.parse(xhr.responseText);
            return options.success(result);
        }
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起POST请求
        // 配置同步异步，如果是同步，则无需调用添加onreadystate监听，而是直接返回请求体
        if (async == true) {
            xhr.open(options.method, options.url);
        } else if (async == false) {
            xhr.open(options.method, options.url, false);
            xhr.send(qs);
            let result = JSON.parse(xhr.responseText);
            return options.success(result);
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // 判断状态响应码
            // 2xx表示成功
            if (xhr.status >= 200 && xhr.status < 300) {
                let result = JSON.parse(xhr.responseText);
                options.success(result);
            } else if (xhr.status >= 400 && xhr < 600) {
                options.error();
            }
        }
    };
};
