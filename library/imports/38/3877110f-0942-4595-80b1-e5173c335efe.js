"use strict";
cc._RF.push(module, '38771EPCUJFlYCx5Rc8M17+', 'WordModel');
// Script/Model/WordModel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WordUtil_1 = require("../Util/WordUtil");
var EventUtil_1 = require("../Util/EventUtil");
var GameEvent_1 = require("../Const/GameEvent");
var Const_1 = require("../Const/Const");
/**
 * word model
 */
var WordModel = /** @class */ (function () {
    function WordModel() {
        this.diff = "1";
        this.wordGrid = {};
        this.wordLst = null;
        this.wordComplete = {};
        this.addWordLst = null;
        this.addInfo = {};
    }
    WordModel.getInstance = function () {
        if (!this.instance) {
            this.instance = new WordModel();
        }
        return this.instance;
    };
    WordModel.destoryInstance = function () {
        this.instance = null;
    };
    WordModel.prototype.setDiff = function (diff) {
        this.diff = diff;
    };
    WordModel.prototype.setWordGrid = function (wordGrid) {
        this.wordGrid = wordGrid;
    };
    WordModel.prototype.getWordGrid = function () {
        return this.wordGrid;
    };
    WordModel.prototype.getWordLst = function () {
        return this.wordLst;
    };
    WordModel.prototype.getLetter = function (row, col) {
        return this.wordGrid[row] && this.wordGrid[row][col] || "";
    };
    WordModel.loadWord = function (rhand) {
        var _this = this;
        cc.loader.loadResArray(["data/DDiff", "data/DWord"], function (err, assert) {
            if (err) {
                console.log("Read array error,err = " + err);
                return;
            }
            for (var _i = 0, _a = assert[0]; _i < _a.length; _i++) {
                var diff = _a[_i];
                _this.DDiffMap[diff.diff] = diff.name;
                _this.DWordMap[diff.diff] = {};
                _this.DWordMap[diff.diff]["0"] = new Array(); // Simple word
                _this.DWordMap[diff.diff]["1"] = new Array(); // Extra word
            }
            for (var _b = 0, _c = assert[1]; _b < _c.length; _b++) {
                var word = _c[_b];
                _this.DWordMap[word.diff][word.isAdd].push(word);
            }
            if (rhand) {
                rhand();
            }
        });
    };
    WordModel.initWord = function (diff) {
        if (!WordModel.DDiffMap[diff]) {
            diff = "1";
        }
        var wordMap = {};
        wordMap = WordModel.DWordMap[diff];
        console.log(wordMap);
        var wordLst = ["test", "word", "password", "baby", "lady", "nobody"];
        var addWordLst = ["love", "world", "dispatch"];
        if (!wordMap) {
            return { wordLst: wordLst, addWordLst: addWordLst };
        }
        wordLst = new Array();
        addWordLst = new Array();
        for (var index = 1; index <= Const_1.default.WORD_COUNT; index++) {
            if (wordMap["0"].length <= 0) {
                break;
            }
            var i = Math.floor((Math.random() * wordMap["0"].length));
            wordLst.push(wordMap["0"][i].word);
            wordMap["0"].splice(i, 1);
        }
        for (var index = 1; index <= Const_1.default.ADD_WORD_COUNT; index++) {
            if (wordMap["1"].length <= 0) {
                break;
            }
            var i = Math.floor((Math.random() * wordMap["1"].length));
            addWordLst.push(wordMap["1"][i].word);
            wordMap["1"].splice(i, 1);
        }
        WordModel.loadWord(null);
        return { wordLst: wordLst, addWordLst: addWordLst };
    };
    WordModel.prototype.init = function () {
        this.wordComplete = {};
        this.addInfo = {};
        var data = WordModel.initWord(this.diff);
        this.wordLst = data.wordLst;
        this.addWordLst = data.addWordLst;
        var info = WordUtil_1.default.initWordGrid(this.wordLst, this.addWordLst);
        this.wordGrid = info.wordGrid;
        this.wordLst = info.insertLst;
        this.addWordLst = info.addInsertLst;
        this.addInfo = info.addInfo;
        for (var _i = 0, _a = this.wordLst; _i < _a.length; _i++) {
            var word = _a[_i];
            this.wordComplete[word] = false;
        }
    };
    WordModel.prototype.resetCompleteArea = function (startRow, startCol, endRow, endCol) {
        console.log("endRow = " + endRow);
        console.log("endCol = " + endCol);
        var addRow = endRow > startRow ? 1 : (endRow == startRow ? 0 : -1);
        var addCol = endCol > startCol ? 1 : (endCol == startCol ? 0 : -1);
        var row = startRow;
        var col = startCol;
        this.wordGrid[row][col] = this.findIntersectionLetter(row, col);
        do {
            row += addRow;
            col += addCol;
            this.wordGrid[row][col] = this.findIntersectionLetter(row, col);
        } while (row != endRow || col != endCol);
    };
    WordModel.prototype.findIntersectionLetter = function (row, col) {
        for (var word in this.addInfo) {
            var data = this.addInfo[word];
            if (this.wordComplete[word] != undefined) {
                continue;
            }
            if (data.row == row && data.col == col) {
                this.wordLst.push(word);
                this.wordComplete[word] = false;
                EventUtil_1.default.dispatchEvent(GameEvent_1.default.WORD_ADD_FIND, word);
                EventUtil_1.default.dispatchEvent(GameEvent_1.default.WORD_COMPLETE);
                return data.letter;
            }
        }
        return this.getRandomLetter();
    };
    WordModel.prototype.getRandomLetter = function () {
        var key = Math.floor(Math.random() * 26);
        return String.fromCharCode(97 + key);
    };
    WordModel.prototype.getShowWord = function (startRow, startCol, endRow, endCol) {
        var array = WordUtil_1.default.getWordRowColLst(startRow, startCol, endRow, endCol);
        var rowArray = array.rowArray;
        var colArray = array.colArray;
        var str = "";
        for (var i in rowArray) {
            var row = rowArray[i];
            var col = colArray[i];
            if (this.wordGrid[row] && this.wordGrid[row][col]) {
                str += this.wordGrid[row][col];
            }
        }
        return str;
    };
    WordModel.prototype.checkComplete = function (str) {
        if (this.wordComplete[str] == false || this.wordComplete[str]) {
            this.wordComplete[str] = true;
            EventUtil_1.default.dispatchEvent(GameEvent_1.default.WORD_COMPLETE);
            return true;
        }
        return false;
    };
    WordModel.prototype.getCompleteCount = function () {
        var count = 0;
        for (var key in this.wordComplete) {
            if (this.wordComplete[key]) {
                count++;
            }
        }
        return count;
    };
    WordModel.prototype.getShowWordCount = function () {
        var count = 0;
        for (var key in this.wordComplete) {
            count++;
        }
        return count;
    };
    WordModel.prototype.getWordLstCount = function () {
        var count = 0;
        for (var key in this.wordLst) {
            count++;
        }
        return count;
    };
    WordModel.prototype.isComplete = function (word) {
        return this.wordComplete[word];
    };
    WordModel.prototype.getCompleteWord = function () {
        return this.wordComplete;
    };
    WordModel.instance = null;
    WordModel.DWordMap = {};
    WordModel.DDiffMap = {};
    return WordModel;
}());
exports.default = WordModel;

cc._RF.pop();