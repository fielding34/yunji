'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _securityUtil = require('./security.util.js');

var _securityUtil2 = _interopRequireDefault(_securityUtil);

var _alertUtil = require('./alert.util.js');

var _alertUtil2 = _interopRequireDefault(_alertUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//ajax相关方法封装
//let host = 'http://localhost:9000/mgt';
var host = '/mgt';
//服务器出错时,默认的处理方式,即现实错误信息
var defaultErrorHandler = function defaultErrorHandler(err) {
    console.error('err: ' + JSON.stringify(err));
    if (err.responseText == undefined) {
        _alertUtil2.default.error('跨域访问失败');
    } else {
        var data = JSON.parse(err.responseText);
        _alertUtil2.default.error(data.msg);
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

var getHeaders = function getHeaders() {
    "use strict";
    // token参数出现在url仅用于测试开发时使用

    var token = getParameterByName('token');
    if (token) {
        return { 'X-AUTH-TOKEN': token };
    } else {
        return { 'X-AUTH-TOKEN': _securityUtil2.default.getToken() };
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

var Ajax = function () {
    function Ajax() {
        _classCallCheck(this, Ajax);
    }

    _createClass(Ajax, null, [{
        key: 'get',
        value: function get(url, data) {
            if (data == null || data == undefined) {
                data = {};
            }
            console.log('Get: ' + JSON.stringify(data));
            return wrappedPromise($.ajax({
                url: host + url, method: 'GET',
                data: data, headers: getHeaders()
            }));
        }
    }, {
        key: 'postFile',
        value: function postFile(url, data, progressFnt) {
            if (data == null || data == undefined) {
                data = new FormData();
            }

            return wrappedPromise($.ajax({
                url: host + url, method: 'POST', contentType: false,
                processData: false,
                data: data, headers: getHeaders(),
                xhr: function xhr() {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function (event) {
                        if (event.lengthComputable) {
                            var percentComplete = Math.round(event.loaded / event.total * 100);
                            if (typeof progressFnt === 'function') {
                                progressFnt(percentComplete);
                            }
                        }
                    }, false);
                    return xhr;
                }
            }));
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            if (data == null || data == undefined) {
                data = {};
            }
            console.log('Post: ' + JSON.stringify(data));
            return wrappedPromise($.ajax({
                url: host + url, method: 'POST', contentType: 'application/json',
                data: JSON.stringify(data), headers: getHeaders()
            }));
        }
    }]);

    return Ajax;
}();

exports.default = Ajax;