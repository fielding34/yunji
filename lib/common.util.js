'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = require('./ajax.util');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_SIZE = 5 * 1024 * 1024;
var serverUrl;

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'getImageTpl',


        // ============ Template ==================
        // imageType
        value: function getImageTpl() {
            return {
                url: null,
                format: null,
                width: 0,
                height: 0
            };
        }
    }, {
        key: 'getAudioTpl',


        // audioType
        value: function getAudioTpl() {
            return {
                origin: null,
                aac: null,
                duration: 0,
                size: 0
            };
        }

        // mixUser

    }, {
        key: 'getMixUserTpl',
        value: function getMixUserTpl() {
            return {
                id: null,
                name: null,
                org: null,
                isAnonymous: false,
                type: null
            };
        }
    }, {
        key: 'getTupleTpl',
        value: function getTupleTpl() {
            return { key: null, value: null };
        }

        //================ function ===============

    }, {
        key: 'setServerUrl',
        value: function setServerUrl(url) {
            serverUrl = url;
        }
    }, {
        key: 'getServerUrl',
        value: function getServerUrl() {
            return serverUrl;
        }

        //copy to clipboard

    }, {
        key: 'copyToClipboard',
        value: function copyToClipboard(event) {
            var temp = $("<input>");

            var copyContent = $(event.target).attr('data-clipboard-text');
            $(event.target).after(temp);
            temp.val(copyContent).select();
            var result = document.execCommand('copy');
            temp.remove();
            return result;
        }

        /**
         * 拷贝页面上可见的内容到剪贴板
         */

    }, {
        key: 'copyToClipboard2',
        value: function copyToClipboard2(el) {
            var body = document.body,
                range,
                sel;
            if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                    range.selectNodeContents(el);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(el);
                    sel.addRange(range);
                }
            } else if (body.createTextRange) {
                range = body.createTextRange();
                range.moveToElementText(el);
                range.select();
            }
            document.execCommand("copy");
            sel.removeAllRanges();
            return true;
        }

        //check str is null, undefined or empty

    }, {
        key: 'isNullOrEmpty',
        value: function isNullOrEmpty(str) {
            return !!(str == undefined || str == null || typeof str == 'string' && str.trim() == '');
        }
    }, {
        key: 'isNullOrUndefined',
        value: function isNullOrUndefined(obj) {
            return !!(obj == null || obj == undefined);
        }

        //文件必须要是图片(jpg, png, gif)
        //文件大小不超过5M

    }, {
        key: 'validateImg',
        value: function validateImg(file) {
            return file.size < MAX_SIZE && (file.type == 'image/jpeg' || file.type == 'image/png');
        }

        //拷贝复制对象

    }, {
        key: 'clone',
        value: function clone(obj) {
            return $.extend(true, {}, obj);
        }
    }, {
        key: 'saveFileToQiniu',
        value: function saveFileToQiniu(file, progressFnt) {
            var formData = new FormData();
            formData.append("file", file);
            formData.append("usage", file.name);
            return _ajax2.default.postFile("/upload", formData, progressFnt);
        }

        //新图片上传接口, 上传图片后, 获取图片地址,长宽等相关信息

    }, {
        key: 'uploadImage',
        value: function uploadImage(file, progressFnt) {
            var formData = new FormData();
            formData.append("file", file);
            formData.append("usage", file.name);
            return _ajax2.default.postFile('/upload/image', formData, progressFnt);
        }
    }, {
        key: 'formatTime',
        value: function formatTime(time) {
            return moment(new Date(time)).format('YYYY-MM-DD HH:mm');
        }
    }, {
        key: 'compressImg',
        value: function compressImg(src, size, degree) {
            degree = degree | 0;
            if (src != null && src != undefined && src != '') {
                return src + '?imageMogr2/auto-orient/rotate/' + degree + '/thumbnail/' + size + 'x';
            } else {
                return null;
            }
        }

        //把fromObj和toObj共有的字段,从fromObj拷贝到toObj

    }, {
        key: 'copySameProperties',
        value: function copySameProperties(fromObj, toObj) {
            if (toObj == null || toObj == undefined) {
                return;
            }

            for (var prop in fromObj) {
                if (toObj.hasOwnProperty(prop)) {
                    if (_typeof(fromObj[prop]) == 'object') {
                        if (fromObj[prop] == null) {
                            continue;
                        }

                        if (fromObj[prop] instanceof Array) {
                            toObj[prop] = fromObj[prop];
                        } else {
                            Util.copySameProperties(fromObj[prop], toObj[prop]);
                        }
                    } else {
                        toObj[prop] = fromObj[prop];
                    }
                }
            }
        }
    }]);

    return Util;
}();

exports.default = Util;