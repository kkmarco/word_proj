import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";
import WordModel from "../Model/WordModel";
import SwitchViewData from "../Common/SwitchViewData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopInfoScript extends cc.Component {

    @property(cc.Label)
    labTime: cc.Label = null;
    @property(cc.Label)
    labFound: cc.Label = null;

    @property(cc.Button)
    btnPause: cc.Button = null;

    private time = 0;

    // onLoad () {}

    start () {
        this.labTime.string = "00:00";
        EventUtil.addEvent(GameEvent.WORD_COMPLETE,this.updateComplete,this);
        EventUtil.addEvent(GameEvent.RESUME_GAME,this.resumeGame,this);
    }

    private btnPauseHandler(event : cc.Event.EventCustom){
        this.node.pauseAllActions();
        let switchViewData = new SwitchViewData("PauseView");
        EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewData);
    }

    private updateComplete(){
        let allCount = WordModel.getInstance().getShowWordCount();
        let completeCount = WordModel.getInstance().getCompleteCount();
        this.labFound.string = `${completeCount} / ${allCount}`;
        let totalCount = WordModel.getInstance().getWordLstCount();
        console.log(totalCount);
        if (completeCount >= totalCount){
            let switchViewData = new SwitchViewData("GameEnd");
            EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewData);
        }
    }

    public restart(){
        this.node.stopAllActions();
        this.updateComplete();
        this.time = 0;
        let act1 = cc.delayTime(1);
        let act2 = cc.callFunc(()=>{
            this.time++;
            let min = Math.floor(this.time / 60);
            let minStr = min >= 10 ? min : "0" + min;
            let sec = this.time % 60;
            let secStr = sec >= 10 ? sec : "0" + sec;
            this.labTime.string = `${minStr}:${secStr}`;
        });
        this.node.runAction(cc.repeatForever(cc.sequence(act1,act2)));
    }

    private resumeGame(event : cc.Event.EventCustom){
        this.node.resumeAllActions();
    }

    // update (dt) {}
}
