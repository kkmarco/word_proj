"use strict";
cc._RF.push(module, '149a8U3M3lFM5F9Q57K0KWy', 'BaseScene');
// Script/Common/BaseScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var SwitchViewData_1 = require("./SwitchViewData");
var ViewStack_1 = require("./ViewStack");
var Util_1 = require("../Util/Util");
var Enum_1 = require("../Const/Enum");
/**
 * BaseScene
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preFabMap = {}; // All views in current Scene
        _this.activatePreFab = null; // Current activate view
        return _this;
    }
    BaseScene_1 = BaseScene;
    BaseScene.prototype.start = function () {
        EventUtil_1.default.addEvent(GameEvent_1.default.SWITCH_VIEW, this.onSwitchView, this);
        EventUtil_1.default.addEvent(GameEvent_1.default.POP_VIEW, this.onPopView, this);
    };
    // When initialising all scenes，must set the default view
    BaseScene.prototype.setDefaultView = function (defaultViewName) {
        this.defaultViewName = defaultViewName;
    };
    /**Switch View，can only switch prefab document's prefab */
    BaseScene.prototype.onSwitchView = function (event) {
        var _this = this;
        var detail = event.detail[0];
        if (!detail) {
            return;
        }
        console.log("Switch view, The view name is" + detail.prefabPath);
        var isPopup = detail.switchType == Enum_1.Enum.SWITCH_TYPE.Popup;
        if (this.activatePreFab && this.activatePreFab.name == detail.prefabPath) {
            console.log("The switching interface is the same as the current interface");
            return;
        }
        // Buffered interface
        if (this.preFabMap[detail.prefabPath]) {
            this.switch(detail.prefabPath, true, isPopup);
            return;
        }
        // All cc.loader.loadRes can only be under resources folder, No suffix is ​​required.
        cc.loader.loadRes("prefab/" + detail.prefabPath, function (err, prefab) {
            if (err) {
                console.log("load prefab error，prefab name is：" + detail.prefabPath);
                return;
            }
            var view = cc.instantiate(prefab);
            _this.preFabMap[detail.prefabPath] = view;
            _this.node.addChild(view);
            _this.node.x = 0;
            _this.node.y = 0;
            _this.switch(detail.prefabPath, true, isPopup);
        });
    };
    /**Switch view by Name */
    BaseScene.prototype.switch = function (viewName, push, isPopup) {
        if (!this.preFabMap[viewName]) {
            return;
        }
        this.preFabMap[viewName].active = true;
        if (this.activatePreFab) {
            // active will cause the view to disappear
            this.activatePreFab.active = isPopup;
            this.activatePreFab.setLocalZOrder(BaseScene_1.DEACTIVATE_ZORDER);
            if (push) {
                // Be careful，the name here is prefab's name，not script name
                ViewStack_1.default.Push(this.activatePreFab.name);
            }
        }
        this.activatePreFab = this.preFabMap[viewName];
        Util_1.default.addTouchLayer(this.activatePreFab);
        this.activatePreFab.setLocalZOrder(BaseScene_1.ACTIVATE_ZORDER);
    };
    /**Pop-out View */
    BaseScene.prototype.onPopView = function (event) {
        var viewName = ViewStack_1.default.Pop();
        // pop-out current view
        console.log("Pop-out View,Pop-out View is:" + viewName);
        var detail = event.detail;
        if (detail && detail.destoryView) {
            this.destoryCurView();
        }
        if (viewName) {
            this.switch(viewName);
        }
        else {
            this.switchDefaultView();
        }
    };
    /** Delete view */
    BaseScene.prototype.destoryCurView = function () {
        if (this.activatePreFab) {
            console.log("destory view");
            this.preFabMap[this.activatePreFab.name] = null;
            this.activatePreFab.destroy();
            this.activatePreFab.removeFromParent();
            this.activatePreFab = null;
        }
    };
    BaseScene.prototype.switchDefaultView = function () {
        if (this.defaultViewName) {
            var switchViewData = new SwitchViewData_1.default(this.defaultViewName);
            EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewData);
        }
        else {
            this.destoryCurView();
        }
    };
    BaseScene.prototype.onDestroy = function () {
        EventUtil_1.default.removeEvent(GameEvent_1.default.SWITCH_VIEW, this.onSwitchView, this);
        EventUtil_1.default.removeEvent(GameEvent_1.default.POP_VIEW, this.onPopView, this);
        this.preFabMap = null;
        this.activatePreFab = null;
    };
    BaseScene.ACTIVATE_ZORDER = 10000; // Zorder of the view
    BaseScene.DEACTIVATE_ZORDER = 1; // All Deactive zoder
    BaseScene = BaseScene_1 = __decorate([
        ccclass
    ], BaseScene);
    return BaseScene;
    var BaseScene_1;
}(cc.Component));
exports.default = BaseScene;

cc._RF.pop();