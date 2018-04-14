import SwitchViewData from "../Common/SwitchViewData";
import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";
import WordModel from "../Model/WordModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    btnYes: cc.Button = null;
    @property(cc.Button)
    btnNo: cc.Button = null;
    @property(cc.Label)
    labWord : cc.Label = null;

    // onLoad () {}

    start () {
        this.labWord.string = "You Complete Word:\n"
        let completeWord = WordModel.getInstance().getCompleteWord();
        let index = 1;
        for(let word in completeWord){
            if (completeWord[word]){
                this.labWord.string = this.labWord.string + word + "\t";
                if (index % 3 == 0){
                    this.labWord.string = this.labWord.string + "\n";
                }
                index++;
            }
        }
    }

    private btnYesHandler(){
        let switchViewData = new SwitchViewData("GameView");
        EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewData);
        EventUtil.dispatchEvent(GameEvent.RESTART_GAME);
    }

    private btnNoHandler(){
        let switchViewData = new SwitchViewData("MainView");
        EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewData);
    }

    // update (dt) {}
}
