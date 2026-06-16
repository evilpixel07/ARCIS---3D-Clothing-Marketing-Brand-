import '../css/variables.css';
import '../css/style.css';
import { initLoader } from './loader' 
import { initNavbar } from './navbar.js'
import { initScene } from './scene.js'
import { initLighting } from './lighting.js'
import { initModel } from './model.js';
import { startRenderLoop } from './scene.js';
import { initScroll } from './scroll.js';
import { initMaterial } from './material.js';

initLoader();
initNavbar();
initScene();
initLighting();
initModel();
initMaterial();
startRenderLoop();
initScroll();

console.log('ARCIS initialized')