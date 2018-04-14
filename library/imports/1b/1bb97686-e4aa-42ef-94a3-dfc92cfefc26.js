"use strict";
cc._RF.push(module, '1bb97aG5KpC75Sj38ks/vwm', 'PauseViewScript');
// Script/ViewScript/PauseViewScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var SwitchViewData_1 = require("../Common/SwitchViewData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PauseViewScript = /** @class */ (function (_super) {
    __extends(PauseViewScript, _super);
    function PauseViewScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnResume = null;
        _this.btnRestart = null;
        _this.btnLobby = null;
        _this.btnClose = null;
        _this.labResume = null;
        _this.labRestart = null;
        _this.labLobby = null;
        _this.touchLab = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    PauseViewScript.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchHandler, this);
    };
    PauseViewScript.prototype.btnResumeHandler = function () {
        var switchViewData = new SwitchViewData_1.default("GameView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.RESUME_GAME);
        console.log("btnResume");
    };
    PauseViewScript.prototype.btnRestartHandler = function () {
        var switchViewData = new SwitchViewData_1.default("GameView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.RESTART_GAME);
        console.log("btnRestar");
    };
    PauseViewScript.prototype.btnLobbyHandler = function () {
        var switchViewData = new SwitchViewData_1.default("MainView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        console.log("btnLobby");
    };
    PauseViewScript.prototype.btnCloseHandler = function () {
        console.log("btnClose");
        var switchViewData = new SwitchViewData_1.default("GameView");
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        EventUtil_1.default.dispatchEvent(GameEvent_1.default.RESUME_GAME);
    };
    PauseViewScript.prototype.onTouchHandler = function (event) {
        var wp = new cc.Vec2(event.getLocationX(), event.getLocationY());
        if (event.type == cc.Node.EventType.TOUCH_START) {
            this.touchLab = null;
            this.touchLab = this.getTouchLab(wp);
        }
        else if (event.type == cc.Node.EventType.TOUCH_END) {
            var lab = this.getTouchLab(wp);
            if (lab == this.touchLab) {
                switch (lab) {
                    case this.labResume:
                        this.btnResumeHandler();
                        break;
                    case this.labRestart:
                        this.btnRestartHandler();
                        break;
                    case this.labLobby:
                        this.btnLobbyHandler();
                        break;
                }
            }
        }
    };
    PauseViewScript.prototype.getTouchLab = function (wp) {
        var lab = null;
        var labLst = [this.labResume, this.labLobby, this.labRestart];
        for (var _i = 0, labLst_1 = labLst; _i < labLst_1.length; _i++) {
            var lab_1 = labLst_1[_i];
            var np = lab_1.node.convertToNodeSpace(wp);
            if (np.x >= -lab_1.node.width / 2 && np.x <= lab_1.node.width / 2 &&
                np.y >= -lab_1.node.height / 2 && np.y <= lab_1.node.height / 2) {
                return lab_1;
            }
        }
        return lab;
    };
    __decorate([
        property(cc.Button)
    ], PauseViewScript.prototype, "btnResume", void 0);
    __decorate([
        property(cc.Button)
    ], PauseViewScript.prototype, "btnRestart", void 0);
    __decorate([
        property(cc.Button)
    ], PauseViewScript.prototype, "btnLobby", void 0);
    __decorate([
        property(cc.Button)
    ], PauseViewScript.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Label)
    ], PauseViewScript.prototype, "labResume", void 0);
    __decorate([
        property(cc.Label)
    ], PauseViewScript.prototype, "labRestart", void 0);
    __decorate([
        property(cc.Label)
    ], PauseViewScript.prototype, "labLobby", void 0);
    PauseViewScript = __decorate([
        ccclass
    ], PauseViewScript);
    return PauseViewScript;
}(cc.Component));
exports.default = PauseViewScript;

cc._RF.pop();