import { handleNavjump } from './navjump';
import gsap from 'gsap'


export function initNavbar() {
    const navbar = document.getElementById('navbar')
    const hamburger = document.querySelector('.nav-hamburger')
    const navLinks = document.querySelector('.nav-links')

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 80){
            navbar.classList.add('scrolled')
        }else{
            navbar.classList.remove('scrolled')
        }
    })

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e)=>{
            const href = link.getAttribute('href');
            if(href && href.startsWith('#')){
                e.preventDefault();
                const target = document.querySelector(href)
                if(target){
                    handleNavjump(target);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                // if(navLinks) navLinks.style.display= '';
            }
        })
    })
    if(hamburger){
        hamburger.addEventListener('click', ()=> {
            navLinks.classList.toggle('open')
            hamburger.classList.toggle('active')
        })
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // if(hamburger && navLinks){
    //     hamburger.addEventListener('click', ()=>{
    //         navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    //     })
    // }

}
