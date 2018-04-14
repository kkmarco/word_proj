"use strict";
cc._RF.push(module, '5a3263ijUJMZYjA4uPgMTAj', 'TopInfoScript');
// Script/ViewScript/TopInfoScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var WordModel_1 = require("../Model/WordModel");
var SwitchViewData_1 = require("../Common/SwitchViewData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TopInfoScript = /** @class */ (function (_super) {
    __extends(TopInfoScript, _super);
    function TopInfoScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labTime = null;
        _this.labFound = null;
        _this.btnPause = null;
        _this.time = 0;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    TopInfoScript.prototype.start = function () {
        this.labTime.string = "00:00";
        EventUtil_1.default.addEvent(GameEvent_1.default.WORD_COMPLETE, this.updateComplete, this);
        EventUtil_1.default.addEvent(GameEvent_1.default.RESUME_GAME, this.resumeGame, this);
    };
    TopInfoScript.prototype.btnPauseHandler = function (event) {
        this.node.pauseAllActions();
        var switchViewData = new SwitchViewData_1.default("PauseView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
    };
    TopInfoScript.prototype.updateComplete = function () {
        var allCount = WordModel_1.default.getInstance().getShowWordCount();
        var completeCount = WordModel_1.default.getInstance().getCompleteCount();
        this.labFound.string = completeCount + " / " + allCount;
        var totalCount = WordModel_1.default.getInstance().getWordLstCount();
        console.log(totalCount);
        if (completeCount >= totalCount) {
            var switchViewData = new SwitchViewData_1.default("GameEnd");
            EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        }
    };
    TopInfoScript.prototype.restart = function () {
        var _this = this;
        this.node.stopAllActions();
        this.updateComplete();
        this.time = 0;
        var act1 = cc.delayTime(1);
        var act2 = cc.callFunc(function () {
            _this.time++;
            var min = Math.floor(_this.time / 60);
            var minStr = min >= 10 ? min : "0" + min;
            var sec = _this.time % 60;
            var secStr = sec >= 10 ? sec : "0" + sec;
            _this.labTime.string = minStr + ":" + secStr;
        });
        this.node.runAction(cc.repeatForever(cc.sequence(act1, act2)));
    };
    TopInfoScript.prototype.resumeGame = function (event) {
        this.node.resumeAllActions();
    };
    __decorate([
        property(cc.Label)
    ], TopInfoScript.prototype, "labTime", void 0);
    __decorate([
        property(cc.Label)
    ], TopInfoScript.prototype, "labFound", void 0);
    __decorate([
        property(cc.Button)
    ], TopInfoScript.prototype, "btnPause", void 0);
    TopInfoScript = __decorate([
        ccclass
    ], TopInfoScript);
    return TopInfoScript;
}(cc.Component));
exports.default = TopInfoScript;

cc._RF.pop();