"use strict";
cc._RF.push(module, '533c74GSUNLw7L/0RUJLjkD', 'UpdateVersion');
// Script/Common/UpdateVersion.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Update
 *      let update:UpdateVersion = new UpdateVersion();
 *      update.updateHandler = this.upload.bind(this);
 *      update.completeHandler = this.uploadComplete.bind(this);
 *      this.pro.progress = 0.5;
 *      update.start();
 *      this.up = update;
 *  }
 *
 *  upload(p:number, sum:number):void{
 *      if(p == NaN)
 *      {
 *          cc.log("The update progress value is nan");
 *          return;
 *      }
 *      this.pro.progress = p;
 *  }
 *
 *  uploadComplete():void
 *  {
 *      this.pro.progress = 1;
 *  }
 */
var UpdateVersion = /** @class */ (function () {
    function UpdateVersion() {
    }
    UpdateVersion.prototype.start = function () {
        if (!cc || !cc.sys.isNative) {
            cc.log("NON APP");
            this.completeHandler && this.completeHandler();
            return;
        }
        var url = "http://192.168.1.185/app/cdn/niu9/project.manifest";
        var search = jsb.fileUtils.getWritablePath() + "upload";
        console.log("Search path:", search);
        // Create AssetsManager
        this.assetsManager = new jsb.AssetsManager("project.manifest", search);
        this.assetsEventListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.event.bind(this));
        cc.eventManager.addListener(this.assetsEventListener, 1);
        this.assetsManager.update();
        // Set search path
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths');
        if (!hotUpdateSearchPaths) {
            // Initialised AssetsManager's local manifest is the cache directory's  manifest
            hotUpdateSearchPaths = search;
            // The default search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            // hotUpdateSearchPaths Pre-positioning searchPaths at the beginning of the array
            searchPaths.unshift(hotUpdateSearchPaths);
            for (var _i = 0, searchPaths_1 = searchPaths; _i < searchPaths_1.length; _i++) {
                var v = searchPaths_1[_i];
                cc.log(v);
            }
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
        }
    };
    UpdateVersion.prototype.event = function (e) {
        console.log("**** event", e.getEventCode(), e.getMessage());
        switch (e.getEventCode()) {
            case UpdateVersion.ERROR_NO_LOCAL_MANIFEST:
                break;
            case UpdateVersion.ERROR_DOWNLOAD_MANIFEST:
                break;
            case UpdateVersion.ERROR_PARSE_MANIFEST:
                break;
            case UpdateVersion.NEW_VERSION_FOUND:
                break;
            case UpdateVersion.ALREADY_UP_TO_DATE:
                cc.log("Already the latest version ");
                this.completeHandler != null && this.completeHandler();
                break;
            case UpdateVersion.UPDATE_PROGRESSION:
                cc.log("Download: ", e.getPercent(), e.getTotalBytes(), this.updateHandler);
                if (this.updateHandler != null) {
                    this.updateHandler(e.getPercent(), e.getTotalBytes());
                }
                break;
            case UpdateVersion.ASSET_UPDATED:
                break;
            case UpdateVersion.ERROR_UPDATING:
                break;
            case UpdateVersion.UPDATE_FINISHED:
                cc.log("Update completed！！");
                this.restart();
                break;
            case UpdateVersion.UPDATE_FAILED:
                break;
            case UpdateVersion.ERROR_DECOMPRES:
                break;
        }
    };
    UpdateVersion.prototype.restart = function () {
        cc.audioEngine.stopAll();
        this.destory();
        cc.game.restart();
    };
    UpdateVersion.prototype.destory = function () {
        cc.eventManager.removeListener(this.assetsEventListener);
        this.assetsManager = null;
        this.assetsEventListener = null;
    };
    UpdateVersion.ERROR_NO_LOCAL_MANIFEST = 0;
    UpdateVersion.ERROR_DOWNLOAD_MANIFEST = 1;
    UpdateVersion.ERROR_PARSE_MANIFEST = 2;
    UpdateVersion.NEW_VERSION_FOUND = 3;
    /** Already the latest version */
    UpdateVersion.ALREADY_UP_TO_DATE = 4;
    /** Download a selected file */
    UpdateVersion.UPDATE_PROGRESSION = 5;
    UpdateVersion.ASSET_UPDATED = 6;
    UpdateVersion.ERROR_UPDATING = 7;
    UpdateVersion.UPDATE_FINISHED = 8;
    UpdateVersion.UPDATE_FAILED = 9;
    UpdateVersion.ERROR_DECOMPRES = 10;
    return UpdateVersion;
}());
exports.default = UpdateVersion;

cc._RF.pop();