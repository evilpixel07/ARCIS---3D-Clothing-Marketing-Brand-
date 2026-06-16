import { modelState, getCamera } from "./scene";

export function handleNavjump(href){
    if(href === '#scroll-story'){
        modelState.passiveRotation = false;
        modelState.opacity = 1;
        modelState.x = -1.5;
        modelState.y = -2.0;
        modelState.rotationY = 0;

        const camera = getCamera()
        if(camera){
            camera.position.y = 0.8
            camera.position.z = 4.5
        }
    }
}