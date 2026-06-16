import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCamera, modelState } from './scene.js';
import { getMaterialPlane } from './material.js';
import { enableOrbitControls } from './scene.js';

let materialPlane;

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {

    const camera = getCamera();
    materialPlane = getMaterialPlane();

    gsap.from('.hero-title .line', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
    });

    gsap.from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.0,
        ease: 'power3.out'
    });

    gsap.from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.out',
    });

    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        opacity: 0,
        y: -60,
        ease: 'none',
    });

    gsap.fromTo(modelState,
        { opacity: 1, x: 2 },
        {
            scrollTrigger: {
                trigger: '#philosophy',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            },
            opacity: 0,
            x: 3,
            ease: 'power1.inOut'
        }
    );

    gsap.from('.philosophy-text p', {
        scrollTrigger: {
            trigger: '#philosophy',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
    });

    const storyTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#scroll-story',
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 1.5,
        },
    });

    storyTimeline
        .to(modelState, { passiveRotation: false, duration: 0.1 }, 0)
        .fromTo(modelState, { opacity: 0, x: 3, rotationY: 0 }, { opacity: 1, x: -1.2, rotationY: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, 0)
        .fromTo(modelState, { y: -1.0 }, { y: -2.0, duration: 0.6, ease: 'power1.inOut', immediateRender: false }, 0)
        .fromTo(camera.position, { y: 0.0, z: 6 }, { y: 0.8, z: 4.5, duration: 0.7, ease: 'power2.out' }, 0)

        // Beat 0 — The Seams
        .to('.story-panel[data-beat="0"]', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2)
        .to('.story-panel[data-beat="0"]', { opacity: 0, duration: 0.35, ease: 'power2.in' }, 1.0)

        // Transition to Beat 1 — The Linen
        .to(modelState, { rotationY: Math.PI * 0.4, duration: 0.8, ease: 'power1.inOut' }, 1.2)
        .to(camera.position, { y: 1.7, z: 5.2, duration: 0.8, ease: 'power1.inOut' }, 1.2)
        .to('.story-panel[data-beat="1"]', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.3)
        .to('.story-panel[data-beat="1"]', { opacity: 0, duration: 0.35, ease: 'power2.in' }, 2.1)

        // Transition to Beat 2 — The Pattern
        .to(modelState, { rotationY: Math.PI * 0.8, duration: 0.8, ease: 'power1.inOut' }, 2.3)
        .to(camera.position, { y: 1.3, z: 6.0, duration: 0.8, ease: 'power1.inOut' }, 2.3)
        .to('.story-panel[data-beat="2"]', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 2.4)


        // .to(modelState, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 2.8)
        .to({}, { duration: 0.6 }, 2.9);

    gsap.fromTo(modelState,
        { opacity: 1, x: -1.2 },
        {
            scrollTrigger: {
                trigger: '#material-study',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                onLeave: () => { modelState.passiveRotation = true; },
                onEnterBack: () => { modelState.passiveRotation = false; }
            },
            opacity: 0,
            x: -2,
            ease: 'power1.inOut'
        }
    );

    gsap.fromTo(camera.position,
        { y: 1.0, z: 6.0 },
        {
            scrollTrigger: {
                trigger: '#material-study',
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            },
            y: 0.5,
            z: 7,
            ease: 'power1.inOut'
        }
    );

    //n outro reveal

    gsap.from('.outro-title', {
        scrollTrigger: {
            trigger: '#outro',
            start: 'top 80%', 
            toggleActions: 'play none none none',
            
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    gsap.from('.outro-sub, .outro-availability, .outro-links', {
        scrollTrigger: {
            trigger: '#outro',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out'
    });


    // lookbook reveal
    gsap.from('.lookbook-card', {
        scrollTrigger: {
            trigger: '#lookbook',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Explore fade
    gsap.to('.explore-hint', {
        scrollTrigger: {
            trigger: '#explore',
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
        },
        opacity: 0,
        duration: 0.8,
        ease: 'none'
    });

    //interaction
    const hotspots = document.querySelectorAll('.hotspot');
    let hintFaded = false;
    hotspots.forEach((dot) => {
        dot.addEventListener('mouseenter', () => {
            const label = dot.querySelector('.hotspot-label');
            if (label) label.style.opacity = '1';
        });
        dot.addEventListener('mouseleave', () => {
            const label = dot.querySelector('.hotspot-label');
            if (label) label.style.opacity = '0.7';
        });
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const label = dot.querySelector('.hotspot-label');
            if(!hintFaded){
                gsap.to('.explore-hint', { opacity: 0, duration: 0.5});
                hintFaded = true;
            }
            if (label) {
                const wasVisible = label.style.opacity === '1';
            
                hotspots.forEach(h => {
                    const l = h.querySelector('.hotspot-label');
                    if (l) l.style.opacity = '0';
                });
            
                label.style.opacity = wasVisible ? '0' : '1';
            }
    });
    });

        

   

    

    // ScrollTrigger.create({
    //     trigger: '#explore',
    //     start: 'top 80%',
    //     onEnter: () => { enableOrbitControls(true); modelState.passiveRotation = false; },
    //     onLeave: () => { enableOrbitControls(false); modelState.passiveRotation = true; },
    //     onEnterBack: () => { enableOrbitControls(true); modelState.passiveRotation = false; },
    //     onLeaveBack: () => { enableOrbitControls(false); modelState.passiveRotation = true; }
    // });
        
    
    // // model back for Explore section
    
    
    // gsap.to(modelState, {
    //     scrollTrigger: {
    //         trigger: '#explore',
    //         start: 'top bottom',
    //         end: 'top top',
    //         scrub: true,
    //     },
    //     opacity: 1,
    //     x: 0,
    //     ease: 'power1.inOut'
    // });

    // Bring model back for Explore (reaches full opacity earlier)
    gsap.to(modelState, {
        scrollTrigger: {
            trigger: '#explore',
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
        },
        opacity: 1,
        x: 0,
        ease: 'power1.inOut'
    });

    // Fade model out after Explore (into Outro/Footer)
    gsap.to(modelState, {
        scrollTrigger: {
            trigger: '#explore',
            start: 'bottom top',
            end: 'bottom bottom',
            scrub: true,
        },
        opacity: 0,
        ease: 'power1.inOut'
    });

    ScrollTrigger.create({
        trigger: '#explore',
        start: 'top 30%',
        onEnter: () => { enableOrbitControls(true); modelState.passiveRotation = false; },
        onLeave: () => { enableOrbitControls(false); modelState.passiveRotation = true; },
        onEnterBack: () => { enableOrbitControls(true); modelState.passiveRotation = false; },
        onLeaveBack: () => { enableOrbitControls(false); modelState.passiveRotation = true; }
    });

    if (materialPlane) {
        materialPlane.material.opacity = 0;
        materialPlane.material.displacementScale = 0;

            const materialTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#material-study',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });

        materialTimeline
            .to(materialPlane.material, { opacity: 1, displacementScale: 0.25, duration: 0.15, ease: 'power2.out' })
            .to(materialPlane.material, { opacity: 1, displacementScale: 0.25, duration: 0.7, ease: 'none' })
            .to(materialPlane.material, { opacity: 0, displacementScale: 0, duration: 0.15, ease: 'power2.in' });
        
    // gsap.to(materialPlane.material, {
    //     scrollTrigger: {
    //         trigger: '#material-study',
    //         start: 'top bottom',
    //         end: 'center 60%',
    //         scrub: 1,
    //     },
    //     opacity: 1,
    //     displacementScale: 0.25,
    //     ease: 'power1.inOut'
    // });

    // gsap.to(materialPlane.material, {
    //     scrollTrigger: {
    //         trigger: '#material-study',
    //         start: 'center 60%',
    //         end: 'bottom top',
    //         scrub: 1,
    //     },
    //     opacity: 0,
    //     displacementScale: 0,
        // ease: 'power1.inOut'
    // });
    }
}

