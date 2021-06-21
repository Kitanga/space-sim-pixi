import { Application } from "@pixi/app";
import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import gsap from "gsap";
import { DaytonaEngine } from "../../Daytona";
import { Mass } from "./../../../constants/ShipData";
import { MainScene } from "./../MainScene";

export class Rotatable extends Sprite {
    protected app: Application;
    protected mouse: any;

    protected mass = Mass.FREIGHTER;

    protected currentTween: gsap.core.Tween;
    protected targetPos: any;
    protected _2PI: number = Math.PI * 2;
    protected scene: MainScene;
    public game: DaytonaEngine;
    protected parentContainer: Container;

    constructor(scene: MainScene, texture: Texture, mass: Mass) {
        super(texture);

        this.mass = mass;

        this.scene = scene;
        this.game = scene.game;

        this.parentContainer = scene.parentContainer.addChild(this);

        this.anchor.set(0.5);

        this.app = scene.app;
        this.mouse = this.app.renderer.plugins.interaction.mouse;
    }

    protected turnToTarget(): Promise<void> {
        // Rotate towards mouse

        const mousePos = this.targetPos;

        const targetRotation = this.rotateToPoint(mousePos.x, mousePos.y, this.x, this.y);

        return new Promise(resolve => {
            // So it will take an object with a mass of 1000, 4 seconds to do a full 360. Hence the calculations below.
            const duration = (targetRotation / this._2PI) * (this.mass / Mass.FREIGHTER) * 4000;

            this.createTweenAsync({ rotation: targetRotation }, Math.abs(duration)).then(resolve);
        });
    }

    protected async createTweenAsync(to: any, duration: number, delay = 0, easing?: Function): Promise<void> {
        await new Promise(resolve => {
            this.currentTween = gsap.to(this, {
                ...to,
                duration: duration * 0.001,
                delay: delay * 0.001,
                onComplete: () => {
                    resolve(null);
                }
            });
        });
    }

    private rotateToPoint(mx: number, my: number, px: number, py: number) {
        // var self = this;
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y, dist_X);
        //var degrees = angle * 180/ Math.PI;
        return angle;
    }

    public update(deltaTime: number): void {
        // this.turnToTarget();
    }
}