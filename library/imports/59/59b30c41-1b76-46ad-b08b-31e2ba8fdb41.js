"use strict";
cc._RF.push(module, '59b30xBG3ZGrbCLMeK6j9tB', 'WordUtil');
// Script/Util/WordUtil.ts

/**
 * 测试
 */
Object.defineProperty(exports, "__esModule", { value: true });
var WordUtil = /** @class */ (function () {
    function WordUtil() {
    }
    WordUtil.initWordGrid = function (wordLst, addWordLst) {
        // Word length sorting
        wordLst.sort(function (stringA, stringB) {
            if (stringA.length == stringB.length) {
                return 0;
            }
            return stringA.length > stringB.length ? 1 : -1;
        });
        var wordGrid = {};
        var insertLst = new Array();
        var addInsertLst = new Array();
        var addInfo = {};
        for (var _i = 0, wordLst_1 = wordLst; _i < wordLst_1.length; _i++) {
            var word = wordLst_1[_i];
            var info = this.insertWord(wordGrid, insertLst, addInsertLst, addInfo, word, false);
            wordGrid = info.wordGrid;
            insertLst = info.insertLst;
            addInsertLst = info.addInsertLst;
            addInfo = info.addInfo;
        }
        for (var _a = 0, addWordLst_1 = addWordLst; _a < addWordLst_1.length; _a++) {
            var word = addWordLst_1[_a];
            var info = this.insertWord(wordGrid, insertLst, addInsertLst, addInfo, word, true);
            wordGrid = info.wordGrid;
            insertLst = info.insertLst;
            addInsertLst = info.addInsertLst;
            addInfo = info.addInfo;
        }
        for (var row = 0; row < this.ROW; row++) {
            wordGrid[row] = wordGrid[row] || {};
            for (var col = 0; col < this.COL; col++) {
                var k = wordGrid[row][col];
                if (!k || k == "") {
                    var key = Math.floor(Math.random() * 26);
                    wordGrid[row][col] = String.fromCharCode(97 + key);
                }
            }
        }
        return { wordGrid: wordGrid, insertLst: insertLst, addInsertLst: addInsertLst, addInfo: addInfo };
    };
    WordUtil.insertWord = function (wordGrid, insertLst, addInsertLst, addInfo, word, isAdd) {
        var index = 1;
        do {
            index++;
            var type = this.getDirection();
            var opposite = false; //Math.random() <= this.oppositeOdd; // check opposite or not
            var minStartRow = opposite ? word.length : 0;
            var minStartCol = opposite ? word.length : 0;
            var maxStartRow = opposite ? this.ROW : Math.max(0, this.ROW - word.length);
            var maxStartCol = opposite ? this.COL : Math.max(0, this.COL - word.length);
            var startRow = -1;
            var startCol = -1;
            startRow = minStartRow + Math.floor(Math.random() * (maxStartRow - minStartRow));
            startCol = minStartCol + Math.floor(Math.random() * (maxStartCol - minStartCol));
            var intersection = this.getIntersection(wordGrid, word, startRow, startCol, type, opposite);
            if (isAdd && intersection == 1) {
            }
            else if (!isAdd && intersection <= 0) {
            }
            else {
                continue;
            }
            var row = startRow;
            var col = startCol;
            var intersectionRow = 0;
            var intersectionCol = 0;
            var rowAdd = type == this.vertical ? 0 : (opposite ? -1 : 1);
            var colAdd = type == this.horizon ? 0 : (opposite ? -1 : 1);
            if (type == this.slope) {
                rowAdd = opposite ? -1 : 1;
                colAdd = opposite ? -1 : 1;
            }
            for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
                var k = word_1[_i];
                wordGrid[row] = wordGrid[row] || {};
                if (!wordGrid[row][col] || wordGrid[row][col] == "") {
                    wordGrid[row][col] = k;
                }
                else {
                    intersectionRow = row;
                    intersectionCol = col;
                    addInfo[word] = { row: intersectionRow, col: intersectionCol, letter: k };
                }
                row += rowAdd;
                col += colAdd;
            }
            if (isAdd) {
                addInsertLst.push(word);
            }
            else {
                insertLst.push(word);
            }
            break;
        } while (index < (isAdd ? 30 : 10));
        return { wordGrid: wordGrid, insertLst: insertLst, addInsertLst: addInsertLst, addInfo: addInfo };
    };
    WordUtil.getIntersection = function (wordGrid, word, startRow, startCol, type, opposite) {
        var intersection = 0;
        var row = startRow;
        var col = startCol;
        var rowAdd = type == this.vertical ? 0 : (opposite ? -1 : 1);
        var colAdd = type == this.horizon ? 0 : (opposite ? -1 : 1);
        if (type == this.slope) {
            rowAdd = opposite ? -1 : 1;
            colAdd = opposite ? -1 : 1;
        }
        for (var _i = 0, word_2 = word; _i < word_2.length; _i++) {
            var k = word_2[_i];
            if (wordGrid[row] && wordGrid[row][col] && wordGrid[row][col] != "") {
                intersection++;
            }
            row += rowAdd;
            col += colAdd;
        }
        return intersection;
    };
    WordUtil.getDirection = function () {
        var odd = Math.random();
        if (odd <= this.verticalOdd) {
            return this.vertical;
        }
        else if (odd <= this.verticalOdd + this.horizonOdd) {
            return this.horizon;
        }
        return this.slope;
    };
    WordUtil.getWordRowColLst = function (startRow, startCol, endRow, endCol) {
        var addRow = endRow > startRow ? 1 : (endRow == startRow ? 0 : -1);
        var addCol = endCol > startCol ? 1 : (endCol == startCol ? 0 : -1);
        var row = startRow;
        var col = startCol;
        var rowArray = new Array();
        var colArray = new Array();
        rowArray.push(row);
        colArray.push(col);
        do {
            row += addRow;
            col += addCol;
            rowArray.push(row);
            colArray.push(col);
        } while (row != endRow || col != endCol);
        return { rowArray: rowArray, colArray: colArray };
    };
    WordUtil.ROW = 12; // row
    WordUtil.COL = 12; // colume
    // Probability
    WordUtil.verticalOdd = 0.35; // vertical
    WordUtil.horizonOdd = 0.35; // horizontal
    WordUtil.slopeOdd = 0.3; // oblique
    WordUtil.oppositeOdd = 0.3; // opposite
    WordUtil.vertical = 1;
    WordUtil.horizon = 2;
    WordUtil.slope = 3;
    return WordUtil;
}());
exports.default = WordUtil;

cc._RF.pop();