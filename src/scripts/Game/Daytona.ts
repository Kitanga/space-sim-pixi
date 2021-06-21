import { Viewport, DirectionType } from 'pixi-viewport';
import { MainScene } from './Scenes/MainScene';
import { Math } from 'phaser';
import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { Images, RendererConsts } from '../constants';

export class DaytonaEngine {
    protected cache: any;
    protected parentContainer: Container;
    protected app: Application;

    protected mainGame: MainScene;

    private bg: Graphics;

    constructor(resources, app: Application, parentContainer: Container) {
        console.log('Resource cache:', resources);
        this.cache = resources;
        this.app = app;
        this.parentContainer = parentContainer;
    }

    public startGame(): void {
        console.log('Game has started:', this.parentContainer);
        (document.getElementById('main-menu') as HTMLDivElement).style.display = 'none';

        console.log('Asteroid texture:', this.cache[Images.ASTEROID_LARGE]);

        this.app.stage.addChild(this.parentContainer);

        const viewport = (this.parentContainer as Viewport)
            // .drag()
            // .pinch()
            .wheel({
                smooth: 10
            })
            .decelerate()
            .clamp({
                direction: 'all',
            })
            .clampZoom({
                minWidth: window.innerWidth,
                minHeight: window.innerHeight,
                maxWidth: RendererConsts.WIDTH,
                maxHeight: RendererConsts.HEIGHT,
            })
            .decelerate();
        
        viewport.scale.set(0.52);

        viewport.position.set(-RendererConsts.WIDTH * 0.5, -RendererConsts.HEIGHT * 0.5);

        // this.bg = this.createBG();
        viewport.addChild(this.createBG());

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        document.body.appendChild(this.app.view);

        this.mainGame = new MainScene(this, this.app, this.parentContainer as Viewport, this.cache);
        this.mainGame.start();
    }

    private createBG(): Graphics {
        const bg = new Graphics();

        const WIDTH = RendererConsts.WIDTH;
        const HEIGHT = RendererConsts.HEIGHT;

        console.log(WIDTH, HEIGHT);

        bg.beginFill(0x000000, 0);
        bg.drawRect(0, 0, WIDTH, HEIGHT);
        bg.endFill();

        // bg.beginFill(0xFFFFFF);
        // for (let ix = 0, stars = 340; ix < stars; ix++) {
        //     const rndX = Math.Between(0, WIDTH);
        //     const rndY = Math.Between(0, HEIGHT);
        //     const rndR = Math.Between(1, 4);

        //     bg.drawCircle(rndX, rndY, rndR);
        // }
        // bg.endFill();

        

        // bg.pivot.x = 1700 * 0.5;
        // bg.pivot.y = 1700 * 0.5;

        // this.app.stage.addChild(bg);

        return bg;
    }
}