const startBtn = document.getElementById('startBtn');
const wrapper = document.querySelector('.wrapper');
const boxes = document.querySelectorAll('.box');
const intro = document.querySelector('.intro');

let animationPlayed = false;
let floatingIntervals = [];

startBtn.addEventListener('click', function() {
    if (animationPlayed) return;
    
    intro.style.transition = 'all 1s ease';
    intro.style.opacity = '0';
    intro.style.transform = 'scale(0.8)';
    
    startBtn.style.transition = 'all 1s ease';
    startBtn.style.opacity = '0';
    startBtn.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        intro.style.display = 'none';
        startBtn.style.display = 'none';
        wrapper.style.opacity = '1';
        wrapper.classList.add('active');
        
    
        boxes.forEach((box, index) => {
            const centerX = window.innerWidth / 2 - 60; 
            const centerY = window.innerHeight / 2 - 60;
            
            box.style.left = centerX + 'px';
            box.style.top = centerY + 'px';
            box.style.opacity = '0';
            box.style.transform = 'scale(0)';
            
            setTimeout(() => {
                
                const appearTween = KUTE.fromTo(
                    box,
                    { 
                        opacity: 0,
                        scale: 0
                    },
                    { 
                        opacity: 1,
                        scale: 1
                    },
                    { 
                        duration: 800,
                        easing: 'easingCubicOut'
                    }
                );
                
                appearTween.start();
                
            
                setTimeout(() => {
                    moveBoxFreely(box);
                }, 800);
                
            }, index * 150);
        });
    }, 1000);
    
    animationPlayed = true;
});


function moveBoxFreely(box) {
    
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    
    const duration = 4000 + Math.random() * 3000;
    
   
    const currentX = parseInt(box.style.left) || 0;
    const currentY = parseInt(box.style.top) || 0;
    

    const moveTween = KUTE.fromTo(
        box,
        { 
            translateX: 0,
            translateY: 0
        },
        { 
            translateX: randomX - currentX,
            translateY: randomY - currentY
        },
        { 
            duration: duration,
            easing: 'easingCubicInOut'
        }
    );
    
    moveTween.start();
    

    setTimeout(() => {
        
        box.style.left = randomX + 'px';
        box.style.top = randomY + 'px';
        box.style.transform = 'translateX(0) translateY(0)';
        

        moveBoxFreely(box);
    }, duration);
}


boxes.forEach((box) => {
    box.addEventListener('click', function(e) {
        e.stopPropagation();
        

        box.classList.add('shining');
        

        const pulseTween = KUTE.fromTo(
            box,
            { scale: 1 },
            { scale: 1.15 },
            { 
                duration: 400,
                easing: 'easingCubicOut',
                yoyo: true,
                repeat: 1
            }
        );
        
        pulseTween.start();
        
    
        setTimeout(() => {
            box.classList.remove('shining');
        }, 800);
    });
});


window.addEventListener('resize', () => {
    if (animationPlayed) {
        boxes.forEach(box => {
            const currentX = parseInt(box.style.left);
            const currentY = parseInt(box.style.top);
            const maxX = window.innerWidth - 120;
            const maxY = window.innerHeight - 120;
            
            if (currentX > maxX) box.style.left = maxX + 'px';
            if (currentY > maxY) box.style.top = maxY + 'px';
        });
    }
});