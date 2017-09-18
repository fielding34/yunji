'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertUtil = function () {
    function AlertUtil() {
        _classCallCheck(this, AlertUtil);

        this.vm = undefined;
    }

    _createClass(AlertUtil, [{
        key: 'register',
        value: function register(vm) {
            this.vm = vm;
        }
    }, {
        key: 'success',
        value: function success(msg) {
            this.vm.$notify({ message: msg, type: 'success' });
        }
    }, {
        key: 'error',
        value: function error(msg) {
            this.vm.$notify({ message: msg, type: 'error' });
        }
    }]);

    return AlertUtil;
}();

exports.default = new AlertUtil();