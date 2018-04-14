const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    labDiff: cc.Label = null;

    private diff = null;

    // onLoad () {}

    start () {

    }

    public setDiff(diff){
        this.diff = diff;
        this.labDiff.string = diff.name;
    }

    public getDiff(){
        return  this.diff;
    }

    // update (dt) {}
}
