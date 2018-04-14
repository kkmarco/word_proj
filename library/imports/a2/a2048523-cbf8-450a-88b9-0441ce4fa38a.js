"use strict";
cc._RF.push(module, 'a2048Ujy/hFCoi5BEHOT6OK', 'LoginViewScript');
// Script/ViewScript/LoginViewScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Const_1 = require("../Const/Const");
var Util_1 = require("../Util/Util");
var ViewBase_1 = require("../Common/ViewBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoginViewScript = /** @class */ (function (_super) {
    __extends(LoginViewScript, _super);
    function LoginViewScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.edbAccount = null;
        _this.edbPassword = null;
        _this.btnAutoLogin = null;
        _this.btnRemPwd = null;
        _this.btnLogin = null;
        _this.btnMissPwd = null;
        _this.btnRegist = null;
        _this.spAutoLogin = null;
        _this.spRemPwd = null;
        _this.autoLogin = false;
        _this.remPwd = false;
        _this.account = "";
        _this.password = "";
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    LoginViewScript.prototype.start = function () {
        _super.prototype.start.call(this);
        var userData = Util_1.default.loadItem(Const_1.default.USER_DEFAULT);
        console.log(userData);
        if (userData) {
            this.autoLogin = userData["autoLogin"] || false;
            this.remPwd = userData["remPwd"] || false;
            this.account = userData["account"] || "";
            this.password = userData["password"] || "";
        }
        this.spAutoLogin.node.active = this.autoLogin;
        this.spRemPwd.node.active = this.remPwd;
    };
    LoginViewScript.prototype.btnAutoLoginHandler = function (event) {
        this.autoLogin = !this.autoLogin;
        this.spAutoLogin.node.active = this.autoLogin;
        console.log("btnAutoLoginHandler");
    };
    LoginViewScript.prototype.btnRemPwdHandler = function (event) {
        this.remPwd = !this.remPwd;
        this.spRemPwd.node.active = this.remPwd;
        console.log("btnRemPwdHandler");
    };
    LoginViewScript.prototype.btnLoginHandler = function (event) {
        console.log("btnLoginHandler");
        var userData = {};
        userData["autoLogin"] = this.autoLogin;
        userData["remPwd"] = this.remPwd;
        userData["account"] = this.account;
        userData["password"] = this.password;
        console.log(userData);
        Util_1.default.saveItem(Const_1.default.USER_DEFAULT, userData);
    };
    LoginViewScript.prototype.btnMissPwdHandler = function (event) {
        console.log("btnMissPwdHandler");
    };
    LoginViewScript.prototype.btnRegistHandler = function (event) {
        console.log("btnRegistHandler");
    };
    __decorate([
        property(cc.EditBox)
    ], LoginViewScript.prototype, "edbAccount", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginViewScript.prototype, "edbPassword", void 0);
    __decorate([
        property(cc.Button)
    ], LoginViewScript.prototype, "btnAutoLogin", void 0);
    __decorate([
        property(cc.Button)
    ], LoginViewScript.prototype, "btnRemPwd", void 0);
    __decorate([
        property(cc.Button)
    ], LoginViewScript.prototype, "btnLogin", void 0);
    __decorate([
        property(cc.Button)
    ], LoginViewScript.prototype, "btnMissPwd", void 0);
    __decorate([
        property(cc.Button)
    ], LoginViewScript.prototype, "btnRegist", void 0);
    __decorate([
        property(cc.Sprite)
    ], LoginViewScript.prototype, "spAutoLogin", void 0);
    __decorate([
        property(cc.Sprite)
    ], LoginViewScript.prototype, "spRemPwd", void 0);
    LoginViewScript = __decorate([
        ccclass
    ], LoginViewScript);
    return LoginViewScript;
}(ViewBase_1.default));
exports.default = LoginViewScript;

cc._RF.pop();