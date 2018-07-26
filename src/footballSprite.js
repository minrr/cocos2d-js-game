var footballSprite = cc.Sprite.extend({
    disappearAction:null,
    onEnter: function(){
        //cc.log("onEnter");
        this._super();
        this.addTouchEventListener();

        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
    },
    onExit: function(){
        //cc.log("onExit");
        this.disappearAction.release();
        this._super();
    },
    //添加触摸事件
    addTouchEventListener: function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    cc.log("touched");
                    target.stopAllActions();
                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create( ac, cc.CallFunc.create(function () {
                        cc.log("callfun........");
                        target.removeFromParent();

                    },target) );
                    target.runAction(seqAc);
                    //计数加分
                    //cc.log(cc.director.getRunningScene().getChildByTag(2));
                    //通过tag获取layer
                    cc.director.getRunningScene().getChildByTag(2).addScore();
                    //playLayer.addScore();

                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },

    createDisappearAction: function(){
        var frames = [];
        for(var i = 0;i<11;i++){
            var str = "sushi_1n_"+i+".png";
            //cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.02);
        var action = new cc.Animate(animation);

        //cc.log(frames);

        return action;
    }
});

var SushiSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("onExit");
    }

});

for(var i = 0;i< 12;i++){
    var sushi = new SushiSprite(res.Sushi_png+"i");
}
