import BaseScene from "../Common/BaseScene";

const {ccclass, property} = cc._decorator;

/**
 * Game main scene
 */
@ccclass
export default class RoomScene extends BaseScene {

    @property(cc.Button)
    btnTest: cc.Button = null;

    start () {
    }

    onBtnTest():void{
        cc.log("on btn test");
        // let msg:MessageBox = new MessageBox();
        // this.addComponent(MessageBox);
    }

    onDestroy(){

        super.onDestroy();
    }
}
