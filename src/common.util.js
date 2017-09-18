import ajax from './ajax.util';

const MAX_SIZE = 5 * 1024 * 1024;
var serverUrl;

export default class Util {

    // ============ Template ==================
    // imageType
    static getImageTpl() {
        return {
            url: null,
            format: null,
            width: 0,
            height: 0
        };
    };

    // audioType
    static getAudioTpl() {
        return {
            origin: null,
            aac: null,
            duration: 0,
            size: 0
        };
    }

    // mixUser
    static getMixUserTpl() {
        return {
            id: null,
            name: null,
            org: null,
            isAnonymous: false,
            type: null
        }
    }

    static getTupleTpl() {
        return {key: null, value: null};
    }


    //================ function ===============
    static setServerUrl(url) {
        serverUrl = url;
    }

    static getServerUrl() {
        return serverUrl;
    }

    //copy to clipboard
    static copyToClipboard(event) {
        let temp = $("<input>");

        let copyContent = $(event.target).attr('data-clipboard-text');
        $(event.target).after(temp);
        temp.val(copyContent).select();
        let result = document.execCommand('copy');
        temp.remove();
        return result;
    }

    /**
     * 拷贝页面上可见的内容到剪贴板
     */
    static copyToClipboard2(el) {
        var body = document.body, range, sel;
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
    static isNullOrEmpty(str) {
        return !!(str == undefined || str == null || (typeof str == 'string' && str.trim() == ''));
    }

    static isNullOrUndefined(obj) {
        return !!(obj == null || obj == undefined);
    }

    //文件必须要是图片(jpg, png, gif)
    //文件大小不超过5M
    static validateImg(file) {
        return (file.size < MAX_SIZE) && (file.type == 'image/jpeg' || file.type == 'image/png');
    }

    //拷贝复制对象
    static clone(obj) {
        return $.extend(true, {}, obj);
    }

    static saveFileToQiniu(file, progressFnt) {
        var formData = new FormData();
        formData.append("file", file);
        formData.append("usage", file.name);
        return ajax.postFile("/upload", formData, progressFnt);
    }

    //新图片上传接口, 上传图片后, 获取图片地址,长宽等相关信息
    static uploadImage(file, progressFnt) {
        var formData = new FormData();
        formData.append("file", file);
        formData.append("usage", file.name);
        return ajax.postFile('/upload/image', formData, progressFnt);
    }

    static formatTime(time) {
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm');
    }

    static compressImg(src, size, degree) {
        degree = degree | 0;
        if (src != null && src != undefined && src != '') {
            return src + '?imageMogr2/auto-orient/rotate/' + degree + '/thumbnail/' + size + 'x';
        } else {
            return null;
        }
    }

    //把fromObj和toObj共有的字段,从fromObj拷贝到toObj
    static copySameProperties(fromObj, toObj) {
        if (toObj == null || toObj == undefined) {
            return;
        }

        for (let prop in fromObj) {
            if (toObj.hasOwnProperty(prop)) {
                if (typeof fromObj[prop] == 'object') {
                    if (fromObj[prop] == null) {
                        continue;
                    }

                    if (fromObj[prop] instanceof Array) {
                        toObj[prop] = fromObj[prop]
                    } else {
                        Util.copySameProperties(fromObj[prop], toObj[prop]);
                    }
                } else {
                    toObj[prop] = fromObj[prop];
                }
            }
        }
    }
}
