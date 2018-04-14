import Util from "../Util/Util";
import WordUtil from "../Util/WordUtil";
import WordModel from "../Model/WordModel";
import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameViewScript extends cc.Component {

    @property(cc.Layout)
    wordLayout: cc.Layout = null;

    @property(cc.Label)
    labWord: cc.Label = null;

    private line:cc.Node = null;
    private topInfo : cc.Node = null;

    private wordNodeLst: Array<cc.Node> = new Array();
    private keyWordNodeLst : Array<cc.Node> = new Array();
    private wordSize:cc.Size = null;
    private touchStartRow = 0;
    private touchStartCol = 0;
    private touchEndRow = 0;
    private touchEndCol = 0;
    private preTouchRow = 0;
    private preTouchCol = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.loader.loadRes("prefab/TopInfo",(err,prefab)=>{
            if (err){
                return;
            }
            let node = cc.instantiate(prefab);
            this.node.addChild(node);
            this.topInfo = node;
            this.initWord();
        });
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchHandle,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchHandle,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchHandle,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchHandle,this);
        EventUtil.addEvent(GameEvent.RESTART_GAME,this.initWord,this);
        EventUtil.addEvent(GameEvent.WORD_ADD_FIND,this.updateWordMap,this);
    }

    private initWord(){
        for (let node of this.wordNodeLst){
            node.removeFromParent();
        }
        this.wordNodeLst = new Array();
        WordModel.getInstance().init();
        let script = this.topInfo.getComponent("TopInfoScript");
        script.restart();
        let wordGrid = WordModel.getInstance().getWordGrid();
        let gapX = this.wordLayout.node.width / WordUtil.COL;
        let gapY = this.wordLayout.node.height / WordUtil.ROW;
        this.wordSize = new cc.Size(gapY,gapX);
        // 初始化字母
        cc.loader.loadRes("prefab/WordCell",(err,prefab)=>{
            if(err){
                console.log("加载prefab失败"+err);
                return ;
            }
            for (let i in wordGrid){
                let word = wordGrid[i];
                for (let k in word){
                    let color = new cc.Color(0,0,0,0xff);
                    let node : cc.Node = cc.instantiate(prefab);
                    let script = node.getComponent("WordCellScript");
                    script.row = Number(i);
                    script.col = Number(k);
                    script.word = word[k];
                    let lab = node.getComponent(cc.Label);
                    lab.string = word[k];
                    this.wordLayout.node.addChild(node);
                    node.x = Number(k) * gapX + gapX / 2;
                    node.y = -Number(i) * gapY - gapY / 2;
                    script.posx = node.x;
                    script.posy = node.y;
                    this.wordNodeLst.push(node)
                }
            }
        });
        this.updateWordMap(null);
    }

    private updateWordMap(event : cc.Event.EventCustom){
        for (let node of this.keyWordNodeLst){
            node.removeFromParent();
        }
        this.keyWordNodeLst = new Array();
        // 初始化单词
        cc.loader.loadRes("prefab/KeyWordCell",(err,prefab)=>{
            if(err){
                console.log("加载prefab失败"+err);
                return ;
            }
            let wordLst = WordModel.getInstance().getWordLst();
            let gapX = this.wordLayout.node.width / 3;
            let gapY = 80;
            let y = -280;
            for (let i in wordLst){
                let index = Number(i);
                if (index % 3 == 0){
                    y -= gapY
                }
                let node : cc.Node = cc.instantiate(prefab);
                this.node.addChild(node);
                node.x = -this.wordLayout.node.width / 2 + gapX * (index % 3 + 0.5);
                node.y = y;
                let script = node.getComponent("KeyWordCellScript");
                script.setWord(wordLst[i]);
                this.keyWordNodeLst.push(node);
            }
        });
    }

    private onTouchHandle(event : cc.Event.EventTouch){
        let wp = event.getLocation()
        let node = this.getTouchNode(wp);
        if (!node){
            if (event.type == cc.Node.EventType.TOUCH_CANCEL || event.type == cc.Node.EventType.TOUCH_END){
                this.removeLine();
            }
            return;
        }
        let script = node.getComponent("WordCellScript");
        script.shakeAction();
        let row = script.row;
        let col = script.col;
        if (event.type == cc.Node.EventType.TOUCH_START){
            this.touchStartRow = row;
            this.touchStartCol = col;
            this.touchEndRow = 0;
            this.touchEndCol = 0;
            this.preTouchRow = row;
            this.preTouchCol = col;
            this.drawLine(row,col);
            this.labWord.string = WordModel.getInstance().getLetter(row,col);
        }
        if (row == this.preTouchRow && col == this.preTouchCol){return;}
        if(this.touchStartRow == row && this.touchStartCol == col){return;}
        if (row == this.touchStartRow || col == this.touchStartCol ||
            Math.abs(row - this.touchStartRow) == Math.abs(col - this.touchStartCol)){
                this.drawLine(row,col);
                this.showWord(row,col);
                this.touchEndRow = row;
                this.touchEndCol = col;
        }else{
        }
        if (event.type == cc.Node.EventType.TOUCH_END || 
        event.type == cc.Node.EventType.TOUCH_CANCEL){
            this.removeLine();
            this.checkWord(this.touchEndRow,this.touchEndCol);
        }
        return true;
    }

    private drawLine(endRow,endCol){
        let startNode = this.wordNodeLst[this.touchStartRow * WordUtil.COL + this.touchStartCol];
        let endNode = this.wordNodeLst[endRow * WordUtil.COL + endCol];
        let length = Math.pow(Math.pow(startNode.x - endNode.x,2) + Math.pow(startNode.y - endNode.y,2),0.5) + 80;
        let rotation = 0;
        if(endRow == this.touchStartRow){
            rotation = 90;
        }else if(endCol == this.touchStartCol){
            rotation = 0;
        }else{
            if (endCol > this.touchStartCol){
                rotation = endRow > this.touchStartRow ? 135 : 45;
            }else{
                rotation = endRow > this.touchStartRow ? 45 : 135;
            }
        }
        // console.log(rotation);
        if (!this.line){
            let sp = Util.sprite9("resources/game/yellow.png",20,40,20,40,null,length);
            this.wordLayout.node.addChild(sp,-100);
            this.line = sp;
            this.line.rotation = rotation
        }else{
            this.line.active = true;
            this.line.height = length;
            this.line.rotation = rotation;
        }
        this.line.x = (startNode.x + endNode.x) / 2;
        this.line.y = (startNode.y + endNode.y) / 2;
    }

    private showWord(endRow,endCol){
        let str = WordModel.getInstance().getShowWord(this.touchStartRow,this.touchStartCol,
        endRow,endCol);
        this.labWord.string = str;
    }

    private removeLine(){
        if (this.line){
            this.line.active = false;
        }
    }

    private getTouchNode(wp : cc.Vec2){
        for (let node of this.wordNodeLst){
            let np = node.convertToNodeSpaceAR(wp);
            let script = node.getComponent("WordCellScript");
            if (np.x >= -this.wordSize.width / 2 && np.x <= this.wordSize.width / 2
            && np.y >= -this.wordSize.height / 2 && np.y <= this.wordSize.height / 2){
                return node;
            }
        }
    }

    private checkWord(endRow,endCol){
        if (!endRow && !endCol){return ;}
        let word = this.labWord.string;
        let complete = WordModel.getInstance().checkComplete(word);
        if(complete){
            // The letters match successfully
            WordModel.getInstance().resetCompleteArea(this.touchStartRow,
            this.touchStartCol,endRow,endCol);
            let array = WordUtil.getWordRowColLst(this.touchStartRow,this.touchStartCol,
                endRow,endCol);
            let rowArray = array.rowArray;
            let colArray = array.colArray;
            for (let i in rowArray){
                let row = rowArray[i];
                let col = colArray[i];
                let node = this.wordNodeLst[row * WordUtil.COL + col];
                let script = node.getComponent("WordCellScript");
                script.chageWordAction(WordModel.getInstance().getLetter(row,col));
            }
        }
    }

    private btnResetHandler(event : cc.Event.EventCustom){
        WordModel.destoryInstance();
        this.initWord();
        this.labWord.string = "";
    }

    // update (dt) {}
}
