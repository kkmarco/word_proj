"use strict";
cc._RF.push(module, '20d64uRMitCza+vms2aH3OJ', 'Enum');
// Script/Const/Enum.ts

/**
 * Enumerate
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Enum;
(function (Enum) {
    var STATUS;
    (function (STATUS) {
        STATUS[STATUS["ready"] = 1] = "ready";
        STATUS[STATUS["notReady"] = 2] = "notReady";
    })(STATUS = Enum.STATUS || (Enum.STATUS = {}));
    ;
    var CARD;
    (function (CARD) {
        CARD[CARD["Ace"] = 1] = "Ace";
        CARD[CARD["Two"] = 2] = "Two";
    })(CARD = Enum.CARD || (Enum.CARD = {}));
    ;
    var SWITCH_TYPE;
    (function (SWITCH_TYPE) {
        SWITCH_TYPE[SWITCH_TYPE["View"] = 1] = "View";
        SWITCH_TYPE[SWITCH_TYPE["Popup"] = 2] = "Popup";
    })(SWITCH_TYPE = Enum.SWITCH_TYPE || (Enum.SWITCH_TYPE = {}));
})(Enum = exports.Enum || (exports.Enum = {}));

cc._RF.pop();