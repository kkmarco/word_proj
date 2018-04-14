import BaseScene from "../Common/BaseScene";
import WordModel from "../Model/WordModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSceneScript extends BaseScene {

    // onLoad () {}

    start () {
        super.start();
        WordModel.loadWord(()=>{
            this.setDefaultView("MainView");
            this.switchDefaultView();
        })
    }

    // update (dt) {}
}
