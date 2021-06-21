import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { RendererConsts } from './constants';
import { Images } from './constants/Resources';
import { DaytonaEngine } from './Game/Daytona';
import { Loader } from './utils/Loader';

(window as any).PIXI = PIXI;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0
});

const GALAXY_WIDTH = 4;
const GALAXY_HEIGHT = 3;

// create viewport
const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: RendererConsts.WIDTH,
  worldHeight: RendererConsts.HEIGHT,

  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

const resources: [string, string][] = [
  [Images.SHIP, 'assets/img/ship.png'],
  [Images.ASTEROID, 'assets/img/asteroid.png'],
  [Images.ASTEROID_LARGE, 'assets/img/asteroid large.png'],
  [Images.CLOUD, 'assets/img/cloud.png'],
];

// load the texture we need
const loader = new Loader(resources, app.loader);

loader.load((loader, resources) => {
  const game = new DaytonaEngine(resources, app, viewport);


  // Show main menu
  (document.getElementById('main-menu') as HTMLDivElement).style.display = '';
  (document.getElementById('start') as HTMLDivElement).onclick = () => {
    game.startGame();
  };

  // (window as any).cache = ;
  
  // // This creates a texture from a 'bunny.png' image
  // const bunny = new PIXI.Sprite(resources.bunny.texture);

  // // Setup the position of the bunny
  // bunny.x = app.renderer.width / 2;
  // bunny.y = app.renderer.height / 2;

  // // Rotate around the center
  // bunny.anchor.x = 0.5;
  // bunny.anchor.y = 0.5;

  // // Add the bunny to the scene we are building
  // app.stage.addChild(bunny);

  // // Listen for frame updates
  // app.ticker.add(() => {
  //   // each frame we spin the bunny around a bit
  //   bunny.rotation += 0.01;
  // });
});