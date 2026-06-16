import * as THREE from 'three'
import { getScene } from './scene'

let materialPlane;

export function initMaterial(){
    const scene = getScene()

    const geometry = new THREE.PlaneGeometry(4,4,128,128);

    // textures
    const textureLoader = new THREE.TextureLoader();
    const diffuseMap = textureLoader.load('/textures/leather/fabric_leather_02_diff_1k.jpg')
    const normalMap = textureLoader.load('/textures/leather/fabric_leather_02_nor_gl_1k.jpg')
    const armMap = textureLoader.load('/textures/leather/fabric_leather_02_arm_1k.jpg')
    const displacementMap = textureLoader.load('/textures/leather/fabric_leather_02_disp_1k.jpg');

    const textureMaps = [diffuseMap, normalMap, armMap, displacementMap];
    textureMaps.forEach((tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
    })

    const material = new THREE.MeshStandardMaterial({
        map: diffuseMap,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1.0, 1.0),
        roughnessMap: armMap,
        metalness: 0.0,
        aoMap: armMap,
        displacementMap: displacementMap,
        displacementScale: 0,          
        displacementBias: 0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
    })

    materialPlane = new THREE.Mesh(geometry, material);
    // materialPlane.rotation.x = - Math.PI / 2;
    materialPlane.position.set(0,0,0)
    // materialPlane.visible = false


    scene.add(materialPlane)
}

export function getMaterialPlane(){
    return materialPlane;
}