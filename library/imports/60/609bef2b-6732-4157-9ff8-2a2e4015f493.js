"use strict";
cc._RF.push(module, '609be8rZzJBV5/4Ki5AFfST', 'GameSceneScript');
// Script/ViewScript/GameSceneScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseScene_1 = require("../Common/BaseScene");
var WordModel_1 = require("../Model/WordModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameSceneScript = /** @class */ (function (_super) {
    __extends(GameSceneScript, _super);
    function GameSceneScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // onLoad () {}
    GameSceneScript.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        WordModel_1.default.loadWord(function () {
            _this.setDefaultView("MainView");
            _this.switchDefaultView();
        });
    };
    GameSceneScript = __decorate([
        ccclass
    ], GameSceneScript);
    return GameSceneScript;
}(BaseScene_1.default));
exports.default = GameSceneScript;

cc._RF.pop();