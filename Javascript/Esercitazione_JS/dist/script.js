
const tween1 = KUTE.fromTo('#selector1', { rotate: 0 }, { rotate: -720 }, { duration: 2000 });
const tween2 = KUTE.fromTo('#selector2', { rotateX: 0 }, { rotateX: 200 }, { duration: 2000 });
const tween3 = KUTE.fromTo('#selector3', { rotateY: 0 }, { rotateY: 200 }, { duration: 2000 });
const tween4 = KUTE.fromTo('#selector4', { rotateZ: 0 }, { rotateZ: 360 }, { duration: 2000 });

const btn = document.getElementById('startBtn');

btn.onclick = function() {
    tween1.start();
    tween2.start();
    tween3.start();
    tween4.start();
}