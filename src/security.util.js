//import commonService from '../service/common.service';

/**
 * 存储用户登录信息（fullName, token）
 * 其中token存放在cookie
 */
class Store {
    constructor() {
        this.fullName = null;
    }

    isLogin() {
        return this.fullName != null;
    }

    //设置登录用户
    login(token, fullName) {
        $.cookie('yj_token', token);
        this.fullName = fullName;

        //登录后初始化数据
        //commonService.initLeanCloud();
        //commonService.initServerConfig();
    }

    logout() {
        $.removeCookie('yj_token');
        this.fullName = null;
    }

    getFullName() {
        return this.fullName;
    }

    getToken() {
        return $.cookie('token');
    }
}

var store = new Store();
export default store;
