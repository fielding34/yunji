class AlertUtil {
    constructor() {
        this.vm = undefined;
    }

    register(vm) {
        this.vm = vm;
    }

    success(msg) {
        this.vm.$notify({message: msg, type: 'success'});
    };

    error(msg) {
        this.vm.$notify({message: msg, type: 'error'});
    };

    //close() {
    //    this.alert.close();
    //}
}

export default new AlertUtil();
