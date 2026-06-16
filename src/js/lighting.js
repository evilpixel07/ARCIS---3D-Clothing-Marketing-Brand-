import * as THREE from 'three';

import { getScene } from './scene.js'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

export function initLighting(){
    const scene = getScene();
    const hdrLoader = new HDRLoader();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.4)
    keyLight.position.set(-2, 4, 2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xecf3ff, 0.8);
    rimLight.position.set(2.5, 0, -3)
    scene.add(rimLight)

    hdrLoader.load(
        '/textures/monochrome_studio_03_2k.hdr',
        (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
        },
        undefined,
        (err) => {
            console.error('HDRI failed to load:', err);
        }
    )
    
}