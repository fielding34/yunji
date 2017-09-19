import security from './security.util.js';
import alert from './alert.util.js';


//ajax相关方法封装
//let host = 'http://localhost:9000/mgt';
let host = '/mgt';
//服务器出错时,默认的处理方式,即现实错误信息
let defaultErrorHandler = function (err) {
    console.error('err: ' + JSON.stringify(err));
    if ((err.responseText == undefined)) {
        alert.error('跨域访问失败');
    } else {
        var data = JSON.parse(err.responseText);
        alert.error(data.msg);
    }
};

//自定义customPromise, 用于设定一个默认错误处理器
//此处用到ES6, 默认参数的功能
function wrappedPromise(promise) {
    var then = promise.then;
    promise.then = function (resolve, reject) {
        if (typeof reject != 'function') {
            reject = defaultErrorHandler;
        }
        return then.call(this, resolve, reject);
    };
    return promise;
}

let getHeaders = function () {
    "use strict";
    // token参数出现在url仅用于测试开发时使用
    let token = getParameterByName('token');
    if (token) {
        return {'X-AUTH-TOKEN': token};
    } else {
        return {'X-AUTH-TOKEN': security.getToken()};
    }
};


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


class Ajax {
    static get(url, data) {
        if (data == null || data == undefined) {
            data = {};
        }
        console.log('Get: ' + JSON.stringify(data));
        return wrappedPromise($.ajax({
            url: host + url, method: 'GET',
            data: data, headers: getHeaders()
        }));
    }

    static postFile(url, data, progressFnt) {
        if (data == null || data == undefined) {
            data = new FormData();
        }

        return wrappedPromise($.ajax({
            url: host + url, method: 'POST', contentType: false,
            processData: false,
            data: data, headers: getHeaders(),
            xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(event) {
                    if(event.lengthComputable) {
                        var percentComplete = Math.round(event.loaded / event.total * 100);
                        if(typeof progressFnt === 'function') {
                            progressFnt(percentComplete);
                        }
                    }
                }, false);
                return xhr;
            }
        }));
    }

    static post(url, data) {
        if (data == null || data == undefined) {
            data = {};
        }
        console.log('Post: ' + JSON.stringify(data));
        return wrappedPromise($.ajax({
            url: host + url, method: 'POST', contentType: 'application/json',
            data: JSON.stringify(data), headers: getHeaders()
        }));
    }
}

export default Ajax;

