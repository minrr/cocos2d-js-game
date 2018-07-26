/*var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Hello World", "", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        this.addChild(helloLabel);

        return true;
    }
});*/

var StartLayer = cc.Layer.extend({
   ctor:function (){
       this._super();

       var size = cc.winSize;

       var helloLabel = new cc.LabelTTF("hello world", "",38);
       helloLabel.x = size.width / 2;
       helloLabel.y = size.height / 2;
       this.addChild(helloLabel);

       //添加背景色
       /*this.bgSprite = new cc.Sprite(res.BackGround_png);
       this.bgSprite.attr({
           x: size.width / 2,
           y: size.height / 2,
       });
       this.addChild(this.bgSprite, 0);*/
       this.bgSprite = new cc.Sprite(res.BackGround_png);
       this.bgSprite.attr({
           x: size.width / 2,
           y: size.height / 2,
       });
       this.addChild(this.bgSprite,0);

       //添加开始按钮
       /*var startItem = new cc.MenuItemImage(
           res.Start_N_png,
           res.Start_S_png,
           function () {
               cc.log("Menu is clicked!");
           }, this);
       startItem.attr({
           x: size.width/2,
           y: size.height/2,
           anchorX: 0.5,
           anchorY: 0.5
       });

       var menu = new cc.Menu(startItem);
       menu.x = 0;
       menu.y = 0;
       this.addChild(menu, 1);*/
       var startItem = new cc.MenuItemImage(
         res.Start_N_png,
         res.Start_S_png,
         function (){
             cc.log("Menu is clicked!");
             //cc.director.replaceScene(cc.TransitionPageTurn(1, new PlayScene(),false));方法改变了
             //cc.director.runScene( cc.TransitionPageTurn(1, new PlayScene(), false) ); 浏览器不支持，会报错
             cc.director.runScene( new PlayScene() );
         },this);
       startItem.attr({
           x: size.width/2,
           y: size.height/2,
           anchorX: 0.5,
           anchorY: 0.5
       });

       var menu = new cc.Menu(startItem);
       menu.x = 0;
       menu.y = 0;
       this.addChild(menu,1);

       return true;
}
});

var StartScene = cc.Scene.extend({
   onEnter:function (){
       this._super();
       var layer = new StartLayer();
       this.addChild(layer);
   }
});


/*
var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});*/
