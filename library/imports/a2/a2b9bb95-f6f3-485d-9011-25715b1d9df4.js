"use strict";
cc._RF.push(module, 'a2b9buV9vNIXZARJXFbHZ30', 'KeyWordCellScript');
// Script/ViewScript/KeyWordCellScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var WordModel_1 = require("../Model/WordModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KeyWordCellScript = /** @class */ (function (_super) {
    __extends(KeyWordCellScript, _super);
    function KeyWordCellScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labWord = null;
        _this.spLight = null;
        _this.word = "";
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    KeyWordCellScript.prototype.start = function () {
        EventUtil_1.default.addEvent(GameEvent_1.default.WORD_COMPLETE, this.checkComplete, this);
    };
    KeyWordCellScript.prototype.setWord = function (word) {
        this.word = word;
        this.labWord.string = this.word;
        this.checkComplete(null);
    };
    KeyWordCellScript.prototype.checkComplete = function (event) {
        this.spLight.node.active = WordModel_1.default.getInstance().isComplete(this.word);
        this.spLight.node.width = this.labWord.node.width;
    };
    KeyWordCellScript.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Label)
    ], KeyWordCellScript.prototype, "labWord", void 0);
    __decorate([
        property(cc.Sprite)
    ], KeyWordCellScript.prototype, "spLight", void 0);
    KeyWordCellScript = __decorate([
        ccclass
    ], KeyWordCellScript);
    return KeyWordCellScript;
}(cc.Component));
exports.default = KeyWordCellScript;

cc._RF.pop();