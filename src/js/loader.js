export function initLoader(){
    const loader = document.getElementById('loader')
    const barFill = loader.querySelector('.loader-bar-fill')
    const percentText = loader.querySelector('.loader-percent')

    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() *3 + 1;
        if(progress >= 100){
            progress = 100;
            clearInterval(interval);
        }

        barFill.style.width = progress + '%';
        percentText.textContent = Math.floor(progress) + '%';

        if(progress === 100){
            setTimeout(()=>{
                loader.classList.add('loaded');

                const removeLoader = () => loader.remove();
                loader.addEventListener('transitionend', removeLoader, {once : true});
                setTimeout(removeLoader, 1500);
            }, 400);
        }
    },40);

}