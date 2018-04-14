"use strict";
cc._RF.push(module, '1289a8lSU9JCbvR0BcdciM5', 'Number');
// Script/Common/Number.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Digital controls
 */
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Character mapping order
         */
        _this.charMap = "";
        _this.map = {};
        _this._value = 0;
        return _this;
    }
    Number.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var text = this.charMap;
        var len = text.length;
        for (var i = 0; i < len; i++) {
            var char = text.substr(i, 1);
            this.map[char] = String.fromCharCode(48 + i);
        }
    };
    Object.defineProperty(Number.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
            var show = "";
            var text = v.toString();
            var len = text.length;
            for (var i = 0; i < len; i++) {
                var char = text.substr(i, 1);
                show += this.map[char] || "";
            }
            this.string = show;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property
    ], Number.prototype, "charMap", void 0);
    __decorate([
        property
    ], Number.prototype, "value", null);
    Number = __decorate([
        ccclass
    ], Number);
    return Number;
}(cc.Label));
exports.default = Number;

cc._RF.pop();