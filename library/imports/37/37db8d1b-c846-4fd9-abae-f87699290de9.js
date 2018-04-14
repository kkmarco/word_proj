"use strict";
cc._RF.push(module, '37db80byEZP2auu+HaZKQ3p', 'ViewBase');
// Script/Common/ViewBase.ts

/**
 * View base class
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewBase.prototype.start = function () {
        var labs = this.getComponentsInChildren(cc.Label);
        for (var _i = 0, labs_1 = labs; _i < labs_1.length; _i++) {
            var lab = labs_1[_i];
            var str = lab.string;
            // TODO Set language package
        }
    };
    ViewBase = __decorate([
        ccclass
    ], ViewBase);
    return ViewBase;
}(cc.Component));
exports.default = ViewBase;

cc._RF.pop();