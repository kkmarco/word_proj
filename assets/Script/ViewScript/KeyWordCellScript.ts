import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";
import Util from "../Util/Util";
import WordModel from "../Model/WordModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KeyWordCellScript extends cc.Component {

    @property(cc.Label)
    labWord: cc.Label = null;

    @property(cc.Sprite)
    spLight : cc.Sprite = null;

    private word = "";

    // onLoad () {}

    start () {
        EventUtil.addEvent(GameEvent.WORD_COMPLETE,this.checkComplete,this);
    }

    public setWord(word){
        this.word = word;
        this.labWord.string = this.word;
        this.checkComplete(null);
    }

    private checkComplete(event : cc.Event.EventCustom){
        this.spLight.node.active = WordModel.getInstance().isComplete(this.word);
        this.spLight.node.width = this.labWord.node.width;
    }

    onDestroy(){
    }

    // update (dt) {}
}
