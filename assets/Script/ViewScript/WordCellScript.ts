const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    row:number = 0;
    col:number = 0;
    posx = 0;
    posy = 0;
    word:string = "";
    private isAction : boolean = false;

    // onLoad () {}

    start () {
    }

    public shakeAction(){
        if (this.isAction){return;}
        this.node.x = this.posx;
        this.node.y = this.posy;
        this.isAction = true;
        let moveToAction = cc.moveBy(0.3,0,5);
        moveToAction.easing = cc.easeBounceInOut;
        let moveToAction2 = cc.moveBy(0.3,0,-5);
        moveToAction2.easing = cc.easeBounceInOut;
        let callback = cc.callFunc(()=>{
            this.isAction = false;
        })
        let action = cc.sequence(moveToAction,moveToAction2,callback);
        this.node.runAction(action);
    }

    public chageWordAction(str : string){
        this.node.stopAllActions();
        this.node.x = this.posx;
        this.node.y = this.posy;
        this.isAction = true;
        let act1 = cc.skewBy(0.3,90,0);
        let act2 = cc.callFunc(()=>{
            this.node.skewX = 0;
            let lab = this.node.getComponent(cc.Label);
            lab.string = str;
            this.word = str;
        });
        let act3 = cc.callFunc(()=>{
            this.isAction = false;
        });
        let action = cc.sequence(act1,act2,act3);
        this.node.runAction(action);
    }

    // update (dt) {}
}
