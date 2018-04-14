"use strict";
cc._RF.push(module, '166b0GLCLdGA4cyV2aOURLN', 'GameConfig');
// Script/mode/GameConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Game Setting
 */
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.parse = function (obj) {
        var result = new GameConfig();
        result.debug = obj.debug == 1;
        result.gameName = obj.game_name;
        return result;
    };
    return GameConfig;
}());
exports.default = GameConfig;

cc._RF.pop();