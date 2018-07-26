var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    footballSprites:null,
    score: 0,
    timeout: 15,
    ctor:function(){
        this._super();
        var size = cc.winSize;
        this.footballSprites = [];
        //添加得分
        this.scoreLabel = new cc.LabelTTF("score:0","Arial",20);
        this.scoreLabel.attr({
            x:size.width / 2 + 260,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);
        //添加计时
        this.timeoutLabel = cc.LabelTTF.create("" + this.timeout,"Arial",30);
        this.timeoutLabel.x = 200;
        this.timeoutLabel.y = size.height - 20;
        this.addChild(this.timeoutLabel, 5);

        //加载图片到缓存addSpriteFrames
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist);
        //添加背景
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width/2,
            y: size.height/2,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);

        this.schedule(this.update,1,16*1024,1)
        //this.addFootball();

        this.schedule(this.timer,1,this.timeout,1);
        return true;
    },
    addFootball:function(){
        //var football = new cc.Sprite(res.Football_png);
        var football = new footballSprite(res.Football_png);
        var size = cc.winSize;
        var x = football.width*1.5 + size.width/2*cc.random0To1();
        //football.setScale(0.1);
        football.attr({
            x: x,
            y: size.height - 30,
        });

        var dropAction = cc.MoveTo.create(4, cc.p(football.x,-30));
        football.runAction(dropAction);

        this.addChild(football,5);
        this.footballSprites.push(football);
    },
    removeFootball:function(){
        for(var i = 0;i<this.footballSprites.length;i++){
            //cc.log("removeFootball.........");
            if(0 >=this.footballSprites[i].y){
                this.footballSprites[i].removeFromParent();
                this.footballSprites[i] = undefined;
                this.footballSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    update:function(){
        this.addFootball();
        this.removeFootball();
    },
    //更新游戏得分
    addScore:function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    },
    //倒计时
    timer:function(){
        //游戏结束的显示
        if(this.timeout == 0) {
            var gameOver = new cc.LayerColor(cc.color(225, 225, 225, 100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
            titleLabel.attr({
                x: size.width / 2,
                y: size.height / 2
            });
            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    var transition = cc.TransitionFade(1, new PlayScene(), cc.color(255, 255, 255, 255));
                    cc.director.runScene(transition);
                }, this);
            TryAgainItem.attr({
                x: size.width / 2,
                y: size.height / 2 - 60,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var menu = new cc.Menu(TryAgainItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu, 1);
            this.getParent().addChild(gameOver);

            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }
        this.timeout -=1;
        this.timeoutLabel.setString("" + this.timeout);
    }
});




var PlayScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var  layer = new PlayLayer();
        this.addChild(layer, 0, 2);
    } 
});