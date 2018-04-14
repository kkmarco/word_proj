"use strict";
cc._RF.push(module, '6790b1zgLBN7LNp+qBdimK8', 'Util');
// Script/Util/Util.ts

/**
 * Tools
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.fileExist = function (path) {
        return false;
    };
    Util.saveItem = function (key, data) {
        var jsonObj = JSON.stringify(data);
        cc.sys.localStorage.setItem(key, jsonObj);
    };
    Util.loadItem = function (key) {
        return JSON.parse(cc.sys.localStorage.getItem(key));
    };
    Util.removeItem = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    Util.sprite = function (path) {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        // sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        // Need to set SpriteFrame on sprite to set texture
        var spFrame = new cc.SpriteFrame();
        sp.spriteFrame = spFrame;
        // 可以用cc.SpriteFrame(cc.url.raw(path))
        if (cc.textureCache.getTextureForKey(cc.url.raw(path))) {
            sp.spriteFrame.setTexture(cc.textureCache.getTextureForKey(cc.url.raw(path)));
        }
        else {
            var texture = cc.textureCache.addImage(cc.url.raw(path), null, null);
            sp.spriteFrame.setTexture(texture);
        }
        return node;
    };
    Util.sprite9 = function (path, left, bottom, right, top, width, height) {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        sp.type = cc.Sprite.Type.SLICED;
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        var spriteFrame = new cc.SpriteFrame();
        sp.spriteFrame = spriteFrame;
        spriteFrame.insetBottom = bottom;
        spriteFrame.insetLeft = left;
        spriteFrame.insetRight = right;
        spriteFrame.insetTop = top;
        if (cc.textureCache.getTextureForKey(cc.url.raw(path))) {
            sp.spriteFrame.setTexture(cc.textureCache.getTextureForKey(cc.url.raw(path)));
        }
        else {
            cc.textureCache.addImage(cc.url.raw(path), function (texture) {
                sp.spriteFrame.setTexture(texture);
                if (width) {
                    node.width = width;
                }
                if (height) {
                    node.height = height;
                }
            }, null);
        }
        return node;
    };
    Util.grayChild = function (sp) {
        var vert = "\n         attribute vec4 a_position;\n         attribute vec2 a_texCoord;\n         attribute vec4 a_color;\n         varying vec4 v_fragmentColor; \n         varying vec2 v_texCoord; \n         void main() \n         { \n             gl_Position = CC_PMatrix * a_position;\n             v_fragmentColor = a_color; \n             v_texCoord = a_texCoord; \n         }\n         ";
        var frag = "\n         #ifdef GL_ES\n         precision lowp float;\n         #endif\n         \n         varying vec4 v_fragmentColor;\n         varying vec2 v_texCoord;\n         void main()\n         {\n             vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n             gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n             gl_FragColor.w = c.w;\n         }\n         ";
        if (this.originalGlProgram == null) {
            this.originalGlProgram = sp._sgNode.getShaderProgram();
        }
        if (this.grayGlProgram == null) {
            this.grayGlProgram = new cc.GLProgram();
            if (cc.sys.isNative) {
                this.grayGlProgram.initWithString(vert, frag);
            }
            else {
                this.grayGlProgram.initWithVertexShaderByteArray(vert, frag);
                this.grayGlProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                this.grayGlProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                this.grayGlProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            }
            this.grayGlProgram.link();
            this.grayGlProgram.updateUniforms();
        }
        sp._sgNode.setShaderProgram(this.grayGlProgram);
    };
    Util.gray = function (node) {
        var spLst = node.getComponents(cc.Sprite);
        for (var _i = 0, spLst_1 = spLst; _i < spLst_1.length; _i++) {
            var sp = spLst_1[_i];
            this.grayChild(sp);
        }
        var childLst = node.children;
        for (var _a = 0, childLst_1 = childLst; _a < childLst_1.length; _a++) {
            var node_1 = childLst_1[_a];
            this.gray(node_1);
        }
    };
    Util.unGray = function (node) {
        var spLst = node.getComponents(cc.Sprite);
        for (var _i = 0, spLst_2 = spLst; _i < spLst_2.length; _i++) {
            var sp = spLst_2[_i];
            if (this.originalGlProgram == null) {
                return;
            }
            sp._sgNode.setShaderProgram(this.originalGlProgram);
        }
        var childLst = node.children;
        for (var _a = 0, childLst_2 = childLst; _a < childLst_2.length; _a++) {
            var node_2 = childLst_2[_a];
            this.unGray(node_2);
        }
    };
    Util.label = function (text, fontSize, color, width, lineHeight, align, valign) {
        if (align === void 0) { align = cc.Label.HorizontalAlign.LEFT; }
        if (valign === void 0) { valign = cc.Label.VerticalAlign.TOP; }
        var node = new cc.Node();
        var label = node.addComponent(cc.Label);
        label.string = text;
        label.fontSize = fontSize;
        label.node.color = color || (new cc.Color(255, 255, 255, 255));
        if (width) {
            label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            node.width = width;
            label.lineHeight = lineHeight || label.lineHeight;
        }
        label.horizontalAlign = align;
        label.verticalAlign = valign;
        return node;
        // 设置字体方法为
        //  cc.loader.loadRes("FZZYJT",(err,font)=>{
        //     label.font = font;
        // });
    };
    Util.labelOutline = function (text, fontSize, color, width, lineHeight, align, valign, outlineColor, outlineWidth) {
        if (align === void 0) { align = cc.Label.HorizontalAlign.LEFT; }
        if (valign === void 0) { valign = cc.Label.VerticalAlign.TOP; }
        var node = Util.label(text, fontSize, color, width, lineHeight, align, valign);
        var labelOutline = node.addComponent(cc.LabelOutline);
        labelOutline.color = outlineColor || new cc.Color(0, 0, 0, 255);
        labelOutline.width = outlineWidth | 2;
        return node;
    };
    Util.number = function (value, filePath) {
        var node = Util.label(value, 20);
        cc.loader.loadRes(filePath, function (err, font) {
            if (err) {
                console.log("Can't find the artistic font, please confirm path = ");
                return;
            }
            var label = node.getComponent(cc.Label);
            console.log(font);
            label.fontSize = font.fontSize;
            label.font = font;
        });
        return node;
    };
    Util.addTouchLayer = function (view) {
        var node = new cc.Node();
        var layout = node.addComponent(cc.Layout);
        node.opacity = 0;
        node.setContentSize(cc.view.getFrameSize());
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log(event);
            return true;
        }, view, true);
        view.addChild(node, this.TOUCH_LAYOUT_ZORDER);
    };
    Util.tickOnce = function (thisObj, callback, interval) {
        cc.director.getScheduler().scheduleCallbackForTarget(thisObj, callback, interval, 0, 0);
    };
    Util.grayGlProgram = null;
    Util.originalGlProgram = null;
    Util.TOUCH_LAYOUT_ZORDER = -1000;
    return Util;
}());
exports.default = Util;

cc._RF.pop();