import { Texture } from "@pixi/core";
import { Sprite } from "@pixi/sprite";
import { MainScene } from "../MainScene";


export class Asteroid extends Sprite {
    protected scene: MainScene;
    amount: number;

    /**
     * 
     * @param scene The scene for this game
     * @param texture The pixi texture to use for this object
     */
    constructor(scene: MainScene, texture: Texture) {
        super(texture);

        this.scene = scene;

        this.registerEvents();
    }

    private registerEvents(): void {
        this.on('click', this.mine.bind(this));
    }

    private mine(): void {
        // 
    }
}