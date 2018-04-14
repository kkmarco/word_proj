import Const from "../Const/Const";
import Util from "../Util/Util";
import ViewBase from "../Common/ViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginViewScript extends ViewBase {

    @property(cc.EditBox)
    edbAccount : cc.EditBox = null;
    @property(cc.EditBox)
    edbPassword : cc.EditBox = null;

    @property(cc.Button)
    btnAutoLogin : cc.Button = null;
    @property(cc.Button)
    btnRemPwd : cc.Button = null;
    @property(cc.Button)
    btnLogin : cc.Button = null;
    @property(cc.Button)
    btnMissPwd : cc.Button = null;
    @property(cc.Button)
    btnRegist : cc.Button = null;

    @property(cc.Sprite)
    spAutoLogin : cc.Sprite = null;
    @property(cc.Sprite)
    spRemPwd : cc.Sprite = null;

    private autoLogin : boolean = false;
    private remPwd : boolean = false;
    private account : string = "";
    private password : string = "";

    // onLoad () {}

    start () {
        super.start();
        let userData = Util.loadItem(Const.USER_DEFAULT);
        console.log(userData);
        if (userData){
            this.autoLogin = userData["autoLogin"] || false;
            this.remPwd = userData["remPwd"] || false;
            this.account = userData["account"] || "";
            this.password = userData["password"] || "";
        }
        this.spAutoLogin.node.active = this.autoLogin;
        this.spRemPwd.node.active = this.remPwd;
    }

    btnAutoLoginHandler(event : cc.Event.EventCustom){
        this.autoLogin = !this.autoLogin;
        this.spAutoLogin.node.active = this.autoLogin;
        console.log("btnAutoLoginHandler");
    }

    btnRemPwdHandler(event : cc.Event.EventCustom){
        this.remPwd = !this.remPwd;
        this.spRemPwd.node.active = this.remPwd;
        console.log("btnRemPwdHandler");
    }

    btnLoginHandler(event : cc.Event.EventCustom){
        console.log("btnLoginHandler");
        let userData : {[key : string] : any} = {};
        userData["autoLogin"] = this.autoLogin;
        userData["remPwd"] = this.remPwd;
        userData["account"] = this.account;
        userData["password"] = this.password;
        console.log(userData);
        Util.saveItem(Const.USER_DEFAULT,userData);
    }

    btnMissPwdHandler(event : cc.Event.EventCustom){
        console.log("btnMissPwdHandler");
    }

    btnRegistHandler(event : cc.Event.EventCustom){
        console.log("btnRegistHandler");
    }

    // update (dt) {}
}
