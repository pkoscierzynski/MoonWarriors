var GameOver = cc.Layer.extend({
    _ship:null,
    _lbScore:0,
    init:function () {
        var bRet = false;
        if (this._super) {
            var sp = cc.Sprite.create(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(s_gameOver);
            logo.setAnchorPoint(cc.ccp(0,0));
            logo.setPosition(cc.ccp(0,300));
            this.addChild(logo,10,1);

            var playAgainNormal = cc.Sprite.create(s_menu, cc.RectMake(378, 0, 126, 33));
            var playAgainSelected = cc.Sprite.create(s_menu, cc.RectMake(378, 33, 126, 33));
            var playAgainDisabled = cc.Sprite.create(s_menu, cc.RectMake(378, 33 * 2, 126, 33));

            var cocos2dhtml5 = cc.Sprite.create(s_cocos2dhtml5);
            cocos2dhtml5.setPosition(cc.ccp(160,150))
            this.addChild(cocos2dhtml5,10)
            var playAgain = cc.MenuItemSprite.create(playAgainNormal, playAgainSelected, playAgainDisabled, this, function(){
                flareEffect(this,this,this.onPlayAgain);
            });

            var menu = cc.Menu.create(playAgain);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.ccp(winSize.width / 2, 220));

            var lbScore = cc.LabelTTF.create("Your Score:"+global.score,"Arial Bold",16);
            lbScore.setPosition(cc.ccp(160,280));
            lbScore.setColor(cc.ccc3(250,179,0));
            this.addChild(lbScore,10);

            var b1 = cc.LabelTTF.create("Download Cocos2d-html5","Arial",14);
            var b2 = cc.LabelTTF.create("Download This Sample","Arial",14);
            var menu1 = cc.MenuItemLabel.create(b1,this,function(){
                window.location.href = "http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Cocos2d-html5";
            })
            var menu2 = cc.MenuItemLabel.create(b2,this,function(){
                window.location.href = "https://github.com/ShengxiangChen/MoonWarriors";
            })
            var cocos2dMenu = cc.Menu.create(menu1,menu2);
            cocos2dMenu.alignItemsVerticallyWithPadding(10);
            cocos2dMenu.setPosition(cc.ccp(160,80));
            this.addChild(cocos2dMenu);

            this.schedule(this.update,0.1);

                if(global.sound){
                    cc.AudioManager.sharedEngine().playBackgroundMusic(s_mainMainMusic)
                }

            bRet = true;
        }
        return bRet;
    },
    onPlayAgain:function (pSender) {
        global.score = 0;
        global.life = 4;
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

GameOver.create = function () {
    var sg = new GameOver();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameOver.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameOver.create();
    scene.addChild(layer);
    return scene;
};