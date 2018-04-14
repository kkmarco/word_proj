import BaseScene from "../Common/BaseScene";
import UpdateVersion from "../Common/UpdateVersion";
import GameConfig from "../mode/GameConfig";

const {ccclass, property} = cc._decorator;

/**
 * Start game preflight area
 */
@ccclass
export default class UpdateScene extends BaseScene {

    @property(cc.ProgressBar)
    proLoading: cc.ProgressBar = null;

    protected uploadVersion:UpdateVersion = null;

    start () {
        this.proLoading.progress = 0;

        cc.loader.loadRes("config/game.json", this.loadComplete.bind(this));
    }

    loadComplete(err, result):void{
        if (err) {
            cc.log("No game.json setting file");
            return;
        }

        var gameConfig:GameConfig = GameConfig.parse(result);

        if(cc && cc.sys.isNative)
        {
            if(gameConfig.debug)
            {
                cc.log("Testing mode. No checking for update.");
            }else{
                this.checkUpload();
                return;
            }
        }

        this.next();
    }

    checkUpload():void{
        let update:UpdateVersion = new UpdateVersion();
        update.updateHandler = this.upload.bind(this);
        update.completeHandler = this.uploadComplete.bind(this);
        update.start();

        this.uploadVersion = update;
    }

    upload(p:number, sum:number):void{
        if(p == NaN)
        {
            cc.log("Update value is nan");
            return;
        }
        this.proLoading.progress = p;
    }

    uploadComplete():void
    {
        this.proLoading.progress = 1;
        this.next();
    }

    next():void{
        cc.director.loadScene("StartScene")
    }

    onDestroy(){
        // this.uploadVersion.destory();

        // super.onDestroy();
    }
}
