import WordModel from "../Model/WordModel";
import EventUtil from "../Util/EventUtil";
import GameEvent from "../Const/GameEvent";
import SwitchViewData from "../Common/SwitchViewData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    private diffCell : Array<cc.Node> = new Array();
    private touchBeginX = 0;
    private touchBeginY = 0;

    // onLoad () {}

    start () {
        this.scrollView.node.on(cc.Node.EventType.TOUCH_START,this.onTouchHandler,this);
        this.scrollView.node.on(cc.Node.EventType.TOUCH_END,this.onTouchHandler,this);
        this.initDiff();   
    }

    private initDiff(){
        let diffLst = new Array();
        for (let diff in WordModel.DDiffMap){
            diffLst.push({index : diff, name : WordModel.DDiffMap[diff]});
        }
        diffLst.sort((diffA,diffB)=>{
            return diffA.index > diffB.index ? 1 : -1;
        });
        cc.loader.loadRes("prefab/DiffCell",(err,prefab)=>{
            if (err){
                console.log("加载perfab失败, err = " + err);
                return ;
            }
            let y = this.scrollView.content.height;
            for (let data of diffLst){
                let node = cc.instantiate(prefab);
                this.scrollView.content.addChild(node);
                node.x = this.scrollView.node.width / 2;
                node.y = y - node.height / 2;
                y = y - node.height;
                let script = node.getComponent("DiffCellScript");
                script.setDiff(data);
                this.diffCell.push(node);
            }
        });
    }

    private onTouchHandler(event : cc.Event.EventTouch){
        if (event.type == cc.Node.EventType.TOUCH_START){
            this.touchBeginX = event.getLocationX();
            this.touchBeginY = event.getLocationY();
        }else if (event.type == cc.Node.EventType.TOUCH_END){
            let x = event.getLocationX();
            let y = event.getLocationY();
            if (Math.abs(x - this.touchBeginX) > 50 || Math.abs(y - this.touchBeginY) > 50){
                return ;
            }else{
                let wp = new cc.Vec2(x,y);
                for(let diffCell of this.diffCell){
                    let np = diffCell.convertToNodeSpace(wp);
                    if(np.x >= 0 && np.x <= diffCell.width && 
                        np.y >= 0 && np.y <= diffCell.height){
                        let script = diffCell.getComponent("DiffCellScript");
                        let diff = script.getDiff().index;
                        WordModel.getInstance().setDiff(diff);
                        let switchViewDat = new SwitchViewData("GameView");
                        EventUtil.dispatchEvent(GameEvent.SWITCH_VIEW,switchViewDat);
                        EventUtil.dispatchEvent(GameEvent.RESTART_GAME);
                        return ;
                    }
                }
            }
        }
    }

    // update (dt) {}
}
