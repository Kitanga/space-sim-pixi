import { Application } from "@pixi/app";
import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Point } from "@pixi/math";
import { Viewport } from "pixi-viewport";
import { Mass, MovementSpeed } from "./../../../constants/ShipData";
import { Rotatable } from "./Rotatable";
import { MainScene } from "./../MainScene";

export enum Actions {
    NONE,
    MOVE_ACTION,
    ATTACK_ACTION,
    PATROL_ACTION
}

export class Ship extends Rotatable {
    protected mouse: any;

    protected ui = {
        infoPanelShown: false
    };
    protected isMoving = false;
    protected isAttacking = false;
    protected isPatrolling = false;
    protected actionSelected = Actions.NONE;

    protected topSpeed = MovementSpeed.FREIGHTER;

    constructor(scene: MainScene, texture: Texture, mass: Mass, topSpeed: MovementSpeed) {
        super(scene, texture, mass);

        this.topSpeed = topSpeed;
        this.mouse = this.app.renderer.plugins.interaction.mouse;

        this.interactive = true;

        this.on('click', () => {
            this.ui.infoPanelShown = !this.ui.infoPanelShown;

            const infoOverlay = document.getElementById('info-overlay') as HTMLDivElement;

            this.ui.infoPanelShown ? (infoOverlay.style.display = '') : (infoOverlay.style.display = 'none');
        });

        this.setupUI();
    }

    private setupUI(): void {
        const moveBtn = document.getElementById('move-action') as HTMLButtonElement;
        const attackBtn = document.getElementById('attack-action') as HTMLButtonElement;
        const patrolBtn = document.getElementById('patrol-action') as HTMLButtonElement;

        moveBtn.onclick = () => {
            this.actionSelected = Actions.MOVE_ACTION;
            this.parent.once('clicked', () => {
                // Move the ship to this target
                this.moveToTarget();
            })
        };
        attackBtn.onclick = () => {
            this.actionSelected = Actions.ATTACK_ACTION;
            this.parent.once('clicked', () => {
                // Move the ship to this target
                this.moveToTarget();
            })
        };
        patrolBtn.onclick = () => {
            this.actionSelected = Actions.PATROL_ACTION;
            this.parent.once('clicked', () => {
                // Move the ship to this target
                this.moveToTarget();
            })
        };
    }

    private moveToTarget(): Promise<void> {
        this.currentTween?.kill();
        this.targetPos = this.getMousePos();
        return this.turnToTarget().then(() => {
            // When that animation is done, start tweening to new position
            return this.moveToPosition();
        })
            .then(() => {
                this.actionSelected = Actions.NONE;
                this.targetPos = null;
            });
    }

    private moveToPosition(): Promise<void> {
        const mousePos = this.targetPos || new Point(this.mouse.global.x, this.mouse.global.y);

        const distance = Math.abs(this.getDistance(mousePos, this.position));

        return this.createTweenAsync({
            x: mousePos.x,
            y: mousePos.y
        },
        (distance / this.topSpeed) * 1000);
    }

    private getDistance(a: any, b: any) {
        return Math.hypot(b.x - a.x, b.y - a.y);
    }

    private getMousePos(): Point {
        const globalMousePos = this.mouse.global;

        return (this.parent as Viewport).toWorld(globalMousePos);
    }

    public update(deltaTime: number): void {
        // this.turnToTarget();
    }
}