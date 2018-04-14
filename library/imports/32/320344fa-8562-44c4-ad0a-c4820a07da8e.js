"use strict";
cc._RF.push(module, '32034T6hWJExK0KxIIKB9qO', 'DiffSelectScript');
// Script/ViewScript/DiffSelectScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WordModel_1 = require("../Model/WordModel");
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var SwitchViewData_1 = require("../Common/SwitchViewData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.diffCell = new Array();
        _this.touchBeginX = 0;
        _this.touchBeginY = 0;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.onTouchHandler, this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_END, this.onTouchHandler, this);
        this.initDiff();
    };
    NewClass.prototype.initDiff = function () {
        var _this = this;
        var diffLst = new Array();
        for (var diff in WordModel_1.default.DDiffMap) {
            diffLst.push({ index: diff, name: WordModel_1.default.DDiffMap[diff] });
        }
        diffLst.sort(function (diffA, diffB) {
            return diffA.index > diffB.index ? 1 : -1;
        });
        cc.loader.loadRes("prefab/DiffCell", function (err, prefab) {
            if (err) {
                console.log("加载perfab失败, err = " + err);
                return;
            }
            var y = _this.scrollView.content.height;
            for (var _i = 0, diffLst_1 = diffLst; _i < diffLst_1.length; _i++) {
                var data = diffLst_1[_i];
                var node = cc.instantiate(prefab);
                _this.scrollView.content.addChild(node);
                node.x = _this.scrollView.node.width / 2;
                node.y = y - node.height / 2;
                y = y - node.height;
                var script = node.getComponent("DiffCellScript");
                script.setDiff(data);
                _this.diffCell.push(node);
            }
        });
    };
    NewClass.prototype.onTouchHandler = function (event) {
        if (event.type == cc.Node.EventType.TOUCH_START) {
            this.touchBeginX = event.getLocationX();
            this.touchBeginY = event.getLocationY();
        }
        else if (event.type == cc.Node.EventType.TOUCH_END) {
            var x = event.getLocationX();
            var y = event.getLocationY();
            if (Math.abs(x - this.touchBeginX) > 50 || Math.abs(y - this.touchBeginY) > 50) {
                return;
            }
            else {
                var wp = new cc.Vec2(x, y);
                for (var _i = 0, _a = this.diffCell; _i < _a.length; _i++) {
                    var diffCell = _a[_i];
                    var np = diffCell.convertToNodeSpace(wp);
                    if (np.x >= 0 && np.x <= diffCell.width &&
                        np.y >= 0 && np.y <= diffCell.height) {
                        var script = diffCell.getComponent("DiffCellScript");
                        var diff = script.getDiff().index;
                        WordModel_1.default.getInstance().setDiff(diff);
                        var switchViewDat = new SwitchViewData_1.default("GameView");
                        EventUtil_1.default.dispatchEvent(GameEvent_1.default.SWITCH_VIEW, switchViewDat);
                        EventUtil_1.default.dispatchEvent(GameEvent_1.default.RESTART_GAME);
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.ScrollView)
    ], NewClass.prototype, "scrollView", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();