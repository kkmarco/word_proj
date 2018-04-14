"use strict";
cc._RF.push(module, 'b5f14otix9IRZVcr9bIuqH4', 'MainSceneScript');
// Script/ViewScript/MainSceneScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateVersion_1 = require("../Common/UpdateVersion");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.pro = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        if (false && cc && cc.sys.isNative) {
            this.checkUpload();
        }
        else {
            this.next();
        }
    };
    NewClass.prototype.checkUpload = function () {
        var update = new UpdateVersion_1.default();
        update.updateHandler = this.upload.bind(this);
        update.completeHandler = this.uploadComplete.bind(this);
        this.pro.progress = 0.5;
        update.start();
        this.up = update;
    };
    NewClass.prototype.upload = function (p, sum) {
        if (p == NaN) {
            cc.log("The update progress value is nan");
            return;
        }
        this.pro.progress = p;
    };
    NewClass.prototype.uploadComplete = function () {
        this.pro.progress = 1;
    };
    NewClass.prototype.next = function () {
        this.schedule(this.tick, 1, -1);
    };
    NewClass.prototype.tick = function () {
        var size = cc.director.getVisibleSize();
        cc.log("*** size", size, size.width, size.height);
        this.label.string = size.width + "," + size.height;
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], NewClass.prototype, "pro", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();