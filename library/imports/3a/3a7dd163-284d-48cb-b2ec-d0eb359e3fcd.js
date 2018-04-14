"use strict";
cc._RF.push(module, '3a7ddFjKE1Iy7Ls0Os1nj/N', 'GameEndScript');
// Script/ViewScript/GameEndScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SwitchViewData_1 = require("../Common/SwitchViewData");
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var WordModel_1 = require("../Model/WordModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnYes = null;
        _this.btnNo = null;
        _this.labWord = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.labWord.string = "You Complete Word:\n";
        var completeWord = WordModel_1.default.getInstance().getCompleteWord();
        var index = 1;
        for (var word in completeWord) {
            if (completeWord[word]) {
                this.labWord.string = this.labWord.string + word + "\t";
                if (index % 3 == 0) {
                    this.labWord.string = this.labWord.string + "\n";
                }
                index++;
            }
        }
    };
    NewClass.prototype.btnYesHandler = function () {
        var switchViewData = new SwitchViewData_1.default("GameView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.RESTART_GAME);
    };
    NewClass.prototype.btnNoHandler = function () {
        var switchViewData = new SwitchViewData_1.default("MainView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
    };
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "btnYes", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "btnNo", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "labWord", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();