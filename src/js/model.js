import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getScene, modelState } from "./scene.js";
import gsap from 'gsap';

let model;

export function initModel() {
    const scene = getScene();

    const loader = new GLTFLoader();
    loader.load(
        '/models/sherlock.glb',
        (gltf) => {
            model = gltf.scene
            console.log(gltf);


            //Centre
            const box = new THREE.Box3().setFromObject(model)
            const centre = box.getCenter(new THREE.Vector3())
            model.position.set(-centre.x, -centre.y, -centre.z)

            //Scale — 1.3x for hero presence
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.6 / maxDim;
            model.scale.setScalar(scale);
            model.userData.baseScale = scale;

            model.position.x += 2

            scene.add(model);

            // Save original material states so render loop can restore them
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach((mat) => {
                        mat.userData.origTransparent = mat.transparent;
                        mat.userData.origDepthWrite = mat.depthWrite;
                    });
                }
            });

            // Entrance animation: rise and scale in
            modelState.x = 2
            modelState.scale = 0;
            modelState.y = 0;
            gsap.to(modelState, {
                scale: 1,
                y: -1.0,
                duration: 1.8,
                ease: 'power3.out'
            });

        },
        (xhr) => {
            const percent = (xhr.loaded / xhr.total) * 100;
            console.log(percent.toFixed(0) + '% loaded');

        },
        (error) => {
            console.error('Error loading model: ', error);
        }
    );
}

export function getModel() {
    return model;
}