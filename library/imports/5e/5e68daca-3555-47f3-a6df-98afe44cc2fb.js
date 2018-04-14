"use strict";
cc._RF.push(module, '5e68drKNVVH86bfmK/kTML7', 'GameViewScript');
// Script/ViewScript/GameViewScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../Util/Util");
var WordUtil_1 = require("../Util/WordUtil");
var WordModel_1 = require("../Model/WordModel");
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameViewScript = /** @class */ (function (_super) {
    __extends(GameViewScript, _super);
    function GameViewScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wordLayout = null;
        _this.labWord = null;
        _this.line = null;
        _this.topInfo = null;
        _this.wordNodeLst = new Array();
        _this.keyWordNodeLst = new Array();
        _this.wordSize = null;
        _this.touchStartRow = 0;
        _this.touchStartCol = 0;
        _this.touchEndRow = 0;
        _this.touchEndCol = 0;
        _this.preTouchRow = 0;
        _this.preTouchCol = 0;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    GameViewScript.prototype.start = function () {
        var _this = this;
        cc.loader.loadRes("prefab/TopInfo", function (err, prefab) {
            if (err) {
                return;
            }
            var node = cc.instantiate(prefab);
            _this.node.addChild(node);
            _this.topInfo = node;
            _this.initWord();
        });
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchHandle, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchHandle, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchHandle, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchHandle, this);
        EventUtil_1.default.addEvent(GameEvent_1.default.RESTART_GAME, this.initWord, this);
        EventUtil_1.default.addEvent(GameEvent_1.default.WORD_ADD_FIND, this.updateWordMap, this);
    };
    GameViewScript.prototype.initWord = function () {
        var _this = this;
        for (var _i = 0, _a = this.wordNodeLst; _i < _a.length; _i++) {
            var node = _a[_i];
            node.removeFromParent();
        }
        this.wordNodeLst = new Array();
        WordModel_1.default.getInstance().init();
        var script = this.topInfo.getComponent("TopInfoScript");
        script.restart();
        var wordGrid = WordModel_1.default.getInstance().getWordGrid();
        var gapX = this.wordLayout.node.width / WordUtil_1.default.COL;
        var gapY = this.wordLayout.node.height / WordUtil_1.default.ROW;
        this.wordSize = new cc.Size(gapY, gapX);
        // 初始化字母
        cc.loader.loadRes("prefab/WordCell", function (err, prefab) {
            if (err) {
                console.log("加载prefab失败" + err);
                return;
            }
            for (var i in wordGrid) {
                var word = wordGrid[i];
                for (var k in word) {
                    var color = new cc.Color(0, 0, 0, 0xff);
                    var node = cc.instantiate(prefab);
                    var script_1 = node.getComponent("WordCellScript");
                    script_1.row = Number(i);
                    script_1.col = Number(k);
                    script_1.word = word[k];
                    var lab = node.getComponent(cc.Label);
                    lab.string = word[k];
                    _this.wordLayout.node.addChild(node);
                    node.x = Number(k) * gapX + gapX / 2;
                    node.y = -Number(i) * gapY - gapY / 2;
                    script_1.posx = node.x;
                    script_1.posy = node.y;
                    _this.wordNodeLst.push(node);
                }
            }
        });
        this.updateWordMap(null);
    };
    GameViewScript.prototype.updateWordMap = function (event) {
        var _this = this;
        for (var _i = 0, _a = this.keyWordNodeLst; _i < _a.length; _i++) {
            var node = _a[_i];
            node.removeFromParent();
        }
        this.keyWordNodeLst = new Array();
        // 初始化单词
        cc.loader.loadRes("prefab/KeyWordCell", function (err, prefab) {
            if (err) {
                console.log("加载prefab失败" + err);
                return;
            }
            var wordLst = WordModel_1.default.getInstance().getWordLst();
            var gapX = _this.wordLayout.node.width / 3;
            var gapY = 80;
            var y = -280;
            for (var i in wordLst) {
                var index = Number(i);
                if (index % 3 == 0) {
                    y -= gapY;
                }
                var node = cc.instantiate(prefab);
                _this.node.addChild(node);
                node.x = -_this.wordLayout.node.width / 2 + gapX * (index % 3 + 0.5);
                node.y = y;
                var script = node.getComponent("KeyWordCellScript");
                script.setWord(wordLst[i]);
                _this.keyWordNodeLst.push(node);
            }
        });
    };
    GameViewScript.prototype.onTouchHandle = function (event) {
        var wp = event.getLocation();
        var node = this.getTouchNode(wp);
        if (!node) {
            if (event.type == cc.Node.EventType.TOUCH_CANCEL || event.type == cc.Node.EventType.TOUCH_END) {
                this.removeLine();
            }
            return;
        }
        var script = node.getComponent("WordCellScript");
        script.shakeAction();
        var row = script.row;
        var col = script.col;
        if (event.type == cc.Node.EventType.TOUCH_START) {
            this.touchStartRow = row;
            this.touchStartCol = col;
            this.touchEndRow = 0;
            this.touchEndCol = 0;
            this.preTouchRow = row;
            this.preTouchCol = col;
            this.drawLine(row, col);
            this.labWord.string = WordModel_1.default.getInstance().getLetter(row, col);
        }
        if (row == this.preTouchRow && col == this.preTouchCol) {
            return;
        }
        if (this.touchStartRow == row && this.touchStartCol == col) {
            return;
        }
        if (row == this.touchStartRow || col == this.touchStartCol ||
            Math.abs(row - this.touchStartRow) == Math.abs(col - this.touchStartCol)) {
            this.drawLine(row, col);
            this.showWord(row, col);
            this.touchEndRow = row;
            this.touchEndCol = col;
        }
        else {
        }
        if (event.type == cc.Node.EventType.TOUCH_END ||
            event.type == cc.Node.EventType.TOUCH_CANCEL) {
            this.removeLine();
            this.checkWord(this.touchEndRow, this.touchEndCol);
        }
        return true;
    };
    GameViewScript.prototype.drawLine = function (endRow, endCol) {
        var startNode = this.wordNodeLst[this.touchStartRow * WordUtil_1.default.COL + this.touchStartCol];
        var endNode = this.wordNodeLst[endRow * WordUtil_1.default.COL + endCol];
        var length = Math.pow(Math.pow(startNode.x - endNode.x, 2) + Math.pow(startNode.y - endNode.y, 2), 0.5) + 80;
        var rotation = 0;
        if (endRow == this.touchStartRow) {
            rotation = 90;
        }
        else if (endCol == this.touchStartCol) {
            rotation = 0;
        }
        else {
            if (endCol > this.touchStartCol) {
                rotation = endRow > this.touchStartRow ? 135 : 45;
            }
            else {
                rotation = endRow > this.touchStartRow ? 45 : 135;
            }
        }
        // console.log(rotation);
        if (!this.line) {
            var sp = Util_1.default.sprite9("resources/game/yellow.png", 20, 40, 20, 40, null, length);
            this.wordLayout.node.addChild(sp, -100);
            this.line = sp;
            this.line.rotation = rotation;
        }
        else {
            this.line.active = true;
            this.line.height = length;
            this.line.rotation = rotation;
        }
        this.line.x = (startNode.x + endNode.x) / 2;
        this.line.y = (startNode.y + endNode.y) / 2;
    };
    GameViewScript.prototype.showWord = function (endRow, endCol) {
        var str = WordModel_1.default.getInstance().getShowWord(this.touchStartRow, this.touchStartCol, endRow, endCol);
        this.labWord.string = str;
    };
    GameViewScript.prototype.removeLine = function () {
        if (this.line) {
            this.line.active = false;
        }
    };
    GameViewScript.prototype.getTouchNode = function (wp) {
        for (var _i = 0, _a = this.wordNodeLst; _i < _a.length; _i++) {
            var node = _a[_i];
            var np = node.convertToNodeSpaceAR(wp);
            var script = node.getComponent("WordCellScript");
            if (np.x >= -this.wordSize.width / 2 && np.x <= this.wordSize.width / 2
                && np.y >= -this.wordSize.height / 2 && np.y <= this.wordSize.height / 2) {
                return node;
            }
        }
    };
    GameViewScript.prototype.checkWord = function (endRow, endCol) {
        if (!endRow && !endCol) {
            return;
        }
        var word = this.labWord.string;
        var complete = WordModel_1.default.getInstance().checkComplete(word);
        if (complete) {
            // The letters match successfully
            WordModel_1.default.getInstance().resetCompleteArea(this.touchStartRow, this.touchStartCol, endRow, endCol);
            var array = WordUtil_1.default.getWordRowColLst(this.touchStartRow, this.touchStartCol, endRow, endCol);
            var rowArray = array.rowArray;
            var colArray = array.colArray;
            for (var i in rowArray) {
                var row = rowArray[i];
                var col = colArray[i];
                var node = this.wordNodeLst[row * WordUtil_1.default.COL + col];
                var script = node.getComponent("WordCellScript");
                script.chageWordAction(WordModel_1.default.getInstance().getLetter(row, col));
            }
        }
    };
    GameViewScript.prototype.btnResetHandler = function (event) {
        WordModel_1.default.destoryInstance();
        this.initWord();
        this.labWord.string = "";
    };
    __decorate([
        property(cc.Layout)
    ], GameViewScript.prototype, "wordLayout", void 0);
    __decorate([
        property(cc.Label)
    ], GameViewScript.prototype, "labWord", void 0);
    GameViewScript = __decorate([
        ccclass
    ], GameViewScript);
    return GameViewScript;
}(cc.Component));
exports.default = GameViewScript;

cc._RF.pop();