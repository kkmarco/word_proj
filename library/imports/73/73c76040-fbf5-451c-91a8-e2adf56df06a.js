"use strict";
cc._RF.push(module, '73c76BA+/VFHJGo4q31bfBq', 'Language');
// Script/Common/Language.ts

/**
 * Language list
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language() {
    }
    Language.init = function () {
        var _this = this;
        cc.loader.loadRes("data/TLanguage", function (err, json) {
            if (err) {
                console.log("List read error," + err);
                return;
            }
            console.log(json);
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var detail = json_1[_i];
                _this.LANG[detail.key] = detail.data;
            }
            console.log(_this.LANG);
        });
    };
    Language.getLang = function (key) {
        var str = key;
        if (this.LANG[key]) {
            str = this.LANG[key];
        }
        return str;
    };
    Language.LANG = {};
    return Language;
}());
exports.default = Language;

cc._RF.pop();