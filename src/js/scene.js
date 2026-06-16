import * as THREE from 'three';
import { getModel } from './model.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let controls, scene, camera, renderer;

export const modelState = {
  x: 2,
  y: 0,
  z: 0,
  rotationY: 0,
  scale: 1,
  opacity: 1,
  passiveRotation: true
};
export const mouse = { x: 0, y: 0 };


export function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.5, 6)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  document.getElementById('canvas-container').appendChild(renderer.domElement)

  window.addEventListener('resize', onResize);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 1.5;
  controls.minDistance = 3;
  controls.maxDistance = 12
  controls.enablePan = false;
  controls.enabled = false
  // controls.enableZoom = false;


  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  return { scene, camera, renderer };
}

export function enableOrbitControls(active){
  if(controls) {
    controls.enabled = active;
    controls.enableZoom = false;
  }
  const container = document.getElementById('canvas-container')
  const app = document.getElementById('app');
  if(container) container.style.pointerEvents = active ? 'auto' : 'none'
  if(app) {
    app.style.pointerEvents = active ? 'none' : 'auto'

    document.querySelectorAll('.hotspot-dot').forEach(dot => {
      dot.style.pointerEvents = active ? 'auto' : 'none'
    })
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }


const timer = new THREE.Timer()

export function startRenderLoop() {
  function animate() {
    requestAnimationFrame(animate);
    timer.update();
    const elapsedTime = timer.getElapsed();

    const model = getModel();

    if (model) {
      model.visible = modelState.opacity > 0.01;
      if (model.visible) {
        model.position.x = modelState.x;

        if (modelState.passiveRotation) {
        
          model.position.y = modelState.y + Math.sin(elapsedTime * 0.4) * 0.005 + mouse.y * 0.03;
          model.position.x = modelState.x + mouse.x * 0.03;
          model.rotation.y += 0.003;
        } else {
          model.position.y = modelState.y;
          model.rotation.y = modelState.rotationY;
        }

        if (model.userData.baseScale !== undefined) {
          model.scale.setScalar(model.userData.baseScale * modelState.scale);
        }

        model.traverse((child) => {
          if (child.isMesh && child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((mat) => {
              const fullyOpaque = modelState.opacity >= 0.999;
              mat.transparent = fullyOpaque ? mat.userData.origTransparent : true;
              mat.depthWrite = fullyOpaque ? mat.userData.origDepthWrite : false;
              mat.opacity = modelState.opacity;
            });
          }
        });
      }
    }

    if(controls) controls.update();

    renderer.render(scene, camera);
  }
  animate();
}