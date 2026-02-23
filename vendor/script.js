const startBtn = document.getElementById('startBtn'); //cerca l'elemetno StartBtn in HTML (CLick bottone)
const wrapper = document.querySelector('.wrapper'); // selezione il primo elemento con classe .wrapper (Cerchi)
const boxes = document.querySelectorAll('.box'); //seleziona tutti gli elementi con classe .box
const intro = document.querySelector('.intro'); //Cerca nella pagina l'elemento che ha la classe 'intro' 

let animationPlayed = false; //evita che l'animazione parta più volte (un solo click sul bottone e parte)


startBtn.addEventListener('click', function () { //mette il bottone in ascolto 
    if (animationPlayed) return;  //se l'animazione è partita esci senza fare niente

    intro.style.transition = 'all 1s ease'; // titolo più fluido (transizione)
    intro.style.opacity = '0'; // titolo trasparente 
    intro.style.transform = 'scale(0.8)'; // effetto che rimpicciolisce il titol omentre svanisce

    startBtn.style.transition = 'all 1s ease'; //stessa cosa del titolo ma con lo start botton
    startBtn.style.opacity = '0';
    startBtn.style.transform = 'scale(0.8)';

    setTimeout(() => { //aspetta un secondo prima di attivare il codice qui dentro (fa sparire prima il titolo)
        intro.style.display = 'none'; // dopo un secondo rimuove il titolo del layout e il bottone
        startBtn.style.display = 'none'; // stessa cosa per il bottone
        wrapper.style.opacity = '1'; //iniziano a vedersi le palline
        wrapper.classList.add('active'); //attiva la classe del CSS che rende le palline cliccabili 


        boxes.forEach((box, index) => { // il ciclo che segue ognuna delle 4 palline
            const centerX = window.innerWidth / 2 - 60; //calcola il centro dello schermo (Larg)
            const centerY = window.innerHeight / 2 - 60; //idem (Alt)

            box.style.left = centerX + 'px'; //posiziona la pallina al centro prima che appaia (X)
            box.style.top = centerY + 'px'; //Idem (Y)
            box.style.opacity = '0';
            box.style.transform = 'scale(0)';

            setTimeout(() => { // fa si che le palline appaiano una alla volta, a cascata

                const appearTween = KUTE.fromTo( // la libreria anima la pallina (parte invisibile e piccola e arriva ad ingrandirsi in 0,8 S (800 ms))
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
                        easing: 'easingCubicOut' // effetto che fa decelerare la velocità dell'animazione verso la fine
                    }
                );

                appearTween.start(); // avvia l'animazione Kute


                setTimeout(() => {
                    moveBoxFreely(box);
                }, 800); //dopo 800ms (0,8s) avvia il movimento libero delle palline (quando l'animazione di apparizione finisce)

            }, index * 150); //150ms è il tempo della cascata che fa ingrandire gradualmente le palline
        });
    }, 1000);

    animationPlayed = true; // fa ricordare che l'animazinoe è partita, così un secondo click non fa danni.
});


function moveBoxFreely(box) { //gestisce il movimento continuo della pallina (infinito su se stessa)

    const maxX = window.innerWidth - 120; //dimensione massima occupabile X
    const maxY = window.innerHeight - 120; //idem Y

    const randomX = Math.random() * maxX; //genera una posizione X casuale entro i bordi dello schermo
    const randomY = Math.random() * maxY; //Idem per la Y


    const duration = 4000 + Math.random() * 3000; //durata casuale tra i 4 e i 7 secondi (palline si muovono in modo diverso)


    const currentX = parseInt(box.style.left) || 0; // significa: se non c'è valore, usa 0 
    const currentY = parseInt(box.style.top) || 0; //se eliminamo queste righe le palline rimangono ferme al centro


    const moveTween = KUTE.fromTo( //la libreria Kute, muove la pallina in una nuova posizioen casuale animando X e Y
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
            easing: 'easingCubicInOut' //accelera e decelera come un elemento reale
        }
    );

    moveTween.start();


    setTimeout(() => {  // Quando il movimento finisce aggiorna le cordinate della pallina e fa ripartire il movimento casuale come un loop infinito 

        box.style.left = randomX + 'px';
        box.style.top = randomY + 'px';
        box.style.transform = 'translateX(0) translateY(0)';


        moveBoxFreely(box);
    }, duration);
}


boxes.forEach((box) => { // aggiunge un Listener al click di ognuna delle palline 
    box.addEventListener('click', function (e) { // fa si che la pallina aspetti il Click prima di accendersi 
        e.stopPropagation(); // blocca la propagazione del clich agli elementi gentori, no effetti indesiderati


        box.classList.add('shining'); // la brillantezza che viene data dop il click (nel CSS si attiva)


        const pulseTween = KUTE.fromTo(
            box,// Kute.js ingrandisce le palline da 1 a 1.15 quando clicco 
            { scale: 1 },
            { scale: 1.15 },
            {
                duration: 400, // durata 400ms (0,4s) 
                easing: 'easingCubicOut', // solita decelerazione finale
                yoyo: true, // l'effetto di scatto che fanno le palline
                repeat: 1 // un'andata e un ritorno 
            }
        );

        pulseTween.start();


        setTimeout(() => {
            box.classList.remove('shining');
        }, 800); // dopo 800ms (0,8s) rimuove il bagliore dalla pallina 
    });
});


window.addEventListener('resize', () => { // capisce quando l'utente sta ridimensionando la finestra 
    if (animationPlayed) { //esegue il codice solo se le palline sono già apparse 
        boxes.forEach(box => {
            const currentX = parseInt(box.style.left);
            const currentY = parseInt(box.style.top);
            const maxX = window.innerWidth - 120; // calcola i nuovi limiti dello schermo
            const maxY = window.innerHeight - 120;

            if (currentX > maxX) box.style.left = maxX + 'px'; //se una pallina è finita fuori dallo schermo dopo il ridimensionamento la riporta dentro
            if (currentY > maxY) box.style.top = maxY + 'px';
        });
    }
});