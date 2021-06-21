import { Viewport } from 'pixi-viewport';
import { Application, Graphics, Sprite, Ticker } from 'pixi.js';
import { Mass, MovementSpeed } from '../../constants/ShipData';
import { Images } from '../../constants/Resources';
import { Ship } from './GameObjects/Ship';
import { RendererConsts } from '../../constants';
import { DaytonaEngine } from '../Daytona';
import { Asteroid } from './GameObjects';
import { Math } from 'phaser';

export class MainScene {
    public app: Application;
    public parentContainer: Viewport;
    public cache: any;
    protected activeObjects: any[] = [];
    public game: DaytonaEngine;

    constructor(game: DaytonaEngine, app: Application, parentContainer: Viewport, cache: any) {
        this.game = game;
        this.app = app;

        this.parentContainer = parentContainer;

        this.cache = cache;
    }

    public start(): void {
        this.create();
        Ticker.shared.add(this.update.bind(this));
    }

    private create(): void {
        // const renderer = this.app.renderer;

        // const bg = this.createAmbientBG();

        // this.parentContainer.addChild(bg);
        const rotationDeltaMax = window.Math.PI * 0.5;
        
        for (let ix = 0; ix < 25; ix++) {
            const cloud = new Sprite(this.cache[Images.CLOUD].texture);

            cloud.position.set(Math.Between(-RendererConsts.WIDTH * 0.1, RendererConsts.WIDTH * 1.1), Math.Between(-RendererConsts.HEIGHT * 0.1, RendererConsts.HEIGHT * 1.1));

            cloud.rotation = Math.FloatBetween(-rotationDeltaMax * 0.5, rotationDeltaMax * 0.5);

            cloud.alpha = 0.7;
            cloud.scale.set(7);

            this.parentContainer.addChild(cloud);
        }

        for (let ix = 0; ix < window.Math.round(window.Math.random() * 20); ix++) {
            const asteroid = new Asteroid(this, this.cache[Images.ASTEROID_LARGE].texture);

            asteroid.position.set(window.Math.random() * RendererConsts.WIDTH, window.Math.random() * RendererConsts.HEIGHT);

            asteroid.rotation = (window.Math.PI * 2) * window.Math.random();

            this.parentContainer.addChild(asteroid);
        }

        const ship = this.addShip();

        // this.parentContainer.snap(ship.toGlobal(this.parentContainer).x, ship.toGlobal(this.parentContainer).y);
        this.parentContainer.follow(ship);
        // this.parentContainer.follow();
        
        ship.position.set(RendererConsts.WIDTH * 0.5, RendererConsts.HEIGHT * 0.5);
        // this.parentContainer.moveCenter(ship.x, ship.y);
    }

    private addShip(): Ship {
        const ship = new Ship(this, this.cache[Images.SHIP].texture, Mass.CRUISER, MovementSpeed.CRUISER);

        this.activeObjects.push(ship);

        return ship;
    }

    private update(deltaTime: number): void {
        // Runs each frame
        if (this.activeObjects) {
            this.activeObjects.forEach(gameObject => {
                if (gameObject.update) {
                    gameObject.update(deltaTime);
                }
            });
        }
    }
}