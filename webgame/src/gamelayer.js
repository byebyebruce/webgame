var GameLayer = cc.Layer.extend(
{
    snake:null,
    controllayer:null,
    map:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();

        this.snake = cc.Sprite.create(res.CloseNormal_png);
        var pos = utility.mapPos2ScreenPos(Math.floor(g_Tile.Column/2), Math.floor(10/2));
        this.snake.attr(
        {                
           x: pos.x,
           y: pos.y,
           scale:2.0
        });
        this.addChild(this.snake, 0);
       
        this.map = new MapLayer();
        this.addChild(this.map,-1);

        this.controllayer = new ControlLayer();
        this.controllayer.gamelayer = this;
        this.addChild(this.controllayer);

        this.schedule(this.update, 1 / 60);

        this.setupUI();

        return true;
    },

    setupUI:function()
    {
        var size = cc.director.getWinSize();

        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");

                var pos = utility.mapPos2ScreenPos(Math.floor(g_Tile.Column/2), Math.floor(10/2));
                this.snake.attr(
                {                
                   x: pos.x,
                   y: pos.y
                });

            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    },

    update:function(dt)
    {
        this.map.update();
    },

    onControl:function (dir)
    {
        if(dir == Dir.Right)
        {
            this.snake.x += 50;
        }
        else if(dir == Dir.Left)
        {
            this.snake.x -= 50;
        }
        else if(dir == Dir.Up)
        {
            this.snake.y += 50;
        }
        else if(dir == Dir.Down)
        {
            this.snake.y -= 50;
        }
    },



});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

