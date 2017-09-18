'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('../service/common.service');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 存储用户登录信息（fullName, token）
 * 其中token存放在cookie
 */
var Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        this.fullName = null;
    }

    _createClass(Store, [{
        key: 'isLogin',
        value: function isLogin() {
            return this.fullName != null;
        }

        //设置登录用户

    }, {
        key: 'login',
        value: function login(token, fullName) {
            $.cookie('token', token);
            this.fullName = fullName;

            //登录后初始化数据
            _common2.default.initLeanCloud();
            _common2.default.initServerConfig();
        }
    }, {
        key: 'logout',
        value: function logout() {
            $.removeCookie('token');
            this.fullName = null;
        }
    }, {
        key: 'getFullName',
        value: function getFullName() {
            return this.fullName;
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return $.cookie('token');
        }
    }]);

    return Store;
}();

var store = new Store();
exports.default = store;