import SwitchViewData from "../Common/SwitchViewData";
import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    btnStart: cc.Button = null;
    @property(cc.Button)
    btnExit: cc.Button = null;


    // onLoad () {}

    start () {
    }

    private btnStartHandler(){
        let switchViewData = new SwitchViewData("DiffSelect");
        EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewData);
    }

    private btnExitHandler(){
        if (cc.sys.isNative){
            cc.director.end();
        }else{
        }
    }

    // update (dt) {}
}
