"use strict";
cc._RF.push(module, '48673Xpe3BPSYEUGJCYpkTF', 'SwitchViewData');
// Script/Common/SwitchViewData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Enum_1 = require("../Const/Enum");
/**
 * Switch View Data
 */
var SwitchViewData = /** @class */ (function () {
    function SwitchViewData(prefabPath, switchType) {
        this.prefabPath = prefabPath;
        this.switchType = switchType || Enum_1.Enum.SWITCH_TYPE.View;
    }
    return SwitchViewData;
}());
exports.default = SwitchViewData;

cc._RF.pop();