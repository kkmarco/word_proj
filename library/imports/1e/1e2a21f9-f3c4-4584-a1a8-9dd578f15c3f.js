"use strict";
cc._RF.push(module, '1e2a2H588RFhKGondV48Vw/', 'WordCellScript');
// Script/ViewScript/WordCellScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.row = 0;
        _this.col = 0;
        _this.posx = 0;
        _this.posy = 0;
        _this.word = "";
        _this.isAction = false;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.shakeAction = function () {
        var _this = this;
        if (this.isAction) {
            return;
        }
        this.node.x = this.posx;
        this.node.y = this.posy;
        this.isAction = true;
        var moveToAction = cc.moveBy(0.3, 0, 5);
        moveToAction.easing = cc.easeBounceInOut;
        var moveToAction2 = cc.moveBy(0.3, 0, -5);
        moveToAction2.easing = cc.easeBounceInOut;
        var callback = cc.callFunc(function () {
            _this.isAction = false;
        });
        var action = cc.sequence(moveToAction, moveToAction2, callback);
        this.node.runAction(action);
    };
    NewClass.prototype.chageWordAction = function (str) {
        var _this = this;
        this.node.stopAllActions();
        this.node.x = this.posx;
        this.node.y = this.posy;
        this.isAction = true;
        var act1 = cc.skewBy(0.3, 90, 0);
        var act2 = cc.callFunc(function () {
            _this.node.skewX = 0;
            var lab = _this.node.getComponent(cc.Label);
            lab.string = str;
            _this.word = str;
        });
        var act3 = cc.callFunc(function () {
            _this.isAction = false;
        });
        var action = cc.sequence(act1, act2, act3);
        this.node.runAction(action);
    };
    __decorate([
        property
    ], NewClass.prototype, "row", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();