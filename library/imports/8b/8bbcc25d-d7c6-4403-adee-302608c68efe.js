"use strict";
cc._RF.push(module, '8bbccJd18ZEA63uMCYIxo7+', 'EventUtil');
// Script/Util/EventUtil.ts

/**
 * Event Center
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EventUtil = /** @class */ (function () {
    function EventUtil() {
    }
    EventUtil.dispatchEvent = function (eventName) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        EventUtil.eventCenter.emit(eventName, param);
    };
    EventUtil.addEvent = function (eventName, callback, thisObj) {
        EventUtil.eventCenter.on(eventName, callback, thisObj);
    };
    EventUtil.removeEvent = function (eventName, callback, thisObj) {
        EventUtil.eventCenter.off(eventName, callback, thisObj);
    };
    EventUtil.eventCenter = new cc.EventTarget();
    return EventUtil;
}());
exports.default = EventUtil;

cc._RF.pop();