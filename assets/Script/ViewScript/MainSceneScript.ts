import UpdateVersion from "../Common/UpdateVersion";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.ProgressBar)
    pro:cc.ProgressBar = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public up:UpdateVersion;

    start () {
        if(false && cc && cc.sys.isNative)
        {
            this.checkUpload();
        }
        else
        {
            this.next();
        }
    }

    checkUpload():void{
        let update:UpdateVersion = new UpdateVersion();
        update.updateHandler = this.upload.bind(this);
        update.completeHandler = this.uploadComplete.bind(this);
        this.pro.progress = 0.5;
        update.start();

        this.up = update;
    }

    upload(p:number, sum:number):void{
        if(p == NaN)
        {
            cc.log("The update progress value is nan");
            return;
        }
        this.pro.progress = p;
    }

    uploadComplete():void
    {
        this.pro.progress = 1;
    }

    next():void{
        this.schedule(this.tick, 1, -1);
    }

    tick():void{
        let size:cc.Size = cc.director.getVisibleSize();
        cc.log("*** size", size, size.width, size.height);
        this.label.string = size.width + "," + size.height;
    }

    // update (dt) {}
}
