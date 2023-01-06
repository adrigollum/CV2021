let phase = -1;
var currentInterval;
var intervalIntro;
var audio = null;

function StartIntervalCredit(){
    let i = 1;

    let intervalTime = 100; //0.1s
    let fadeTime = 10;
    let nullTime = 10;

    let time = 0;
    let intervale = 1/(fadeTime);
    currentInterval = setInterval(
        function() 
        {
            time++;
            if(time >= nullTime)
            {
                if(i <= 0)
                {
                    audio = new Audio("son/mega-man-2-intro-opening-theme-hq.mp3");
                    audio.volume = 0.2;
                    audio.loop = true;
                    audio.play();
                    document.getElementById("credit").remove();
                    clearInterval(currentInterval);
                }
                else
                {
                    i -= intervale;
                    document.getElementById("credit").style.opacity = i;    
                }
            }
        }, intervalTime);
}

function SubtitleInterval(text, awakeTime){
    let timer = 0;
    let op = 0;
    let transTime = 10;
    let opInterval = 1/transTime;
    let intervalTime = 100;
    let SubtitleText = document.getElementById("subtitle");
    SubtitleText.innerHTML = text;
    SubtitleText.style.opacity = 0;
    currentInterval = setInterval(
        function()
        {
            if(timer < transTime){
                SubtitleText.style.opacity = op;
                op+=opInterval;
                op = Math.min(op, 1);
            }
            else if(timer >= awakeTime-transTime && timer<= awakeTime){
                SubtitleText.style.opacity = op;
                op-=opInterval;
                op = Math.max(op, 0);
            }
            else if(timer > awakeTime){

            }
            timer++;
        }, intervalTime);
}

function CamTraveling(phaseCam){

    let intervalTime = 50;
    let timer = 0;

    let ville = document.getElementById("ville");
    let villeTopInit = -116;

    let tour = document.getElementById("tour");
    let tourTopInit = -445;
    let tourSpeed = 1.8;

    let black = document.getElementById("black");

    let mega = document.getElementById("mega");
    let megaInitY = -40;
    let megaSpeed = 1;

    let titre = document.getElementById("titre");
    let titreInitX = -23;

    let cv = document.getElementById("cv");
    let cvInitY = -14;
    let cvSpeed = 1.5;

    let pf = document.getElementById("pf");
    let pfDecal = 19;

    ville.style.top = villeTopInit+"vh";
    tour.style.top = tourTopInit+"vh";
    mega.style.right = megaInitY+"vw"
    cv.style.left = cvInitY+"vw";
    pf.style.left = (cvInitY-pfDecal)+"vw";
    titre.style.top = titreInitX+"vw";

    currentInterval = setInterval(
        function() 
        {
            if(phaseCam == 0)
            {
                black.style.bottom = -timer + "vh";
                ville.style.top = (villeTopInit+timer)+"vh";
                tour.style.top = (tourTopInit+(timer*tourSpeed))+"vh";
                if(tourTopInit+(timer*tourSpeed) > -50){
                    timer = 0;
                    phaseCam++;
                }
            }
            else if(phaseCam == 1)
            {
                if(timer == 0){
                    phase = 8;
                    audio.pause();
                    audio = new Audio("son/fin.mp3");
                    audio.volume = 0.2;
                    audio.loop = true;
                    audio.play();
                    tour.style.top = -50 + "vh";
                    ville.style.top = 104+"vh";
                    black.style.bottom = -220+"vh";    
                }
                else if (timer == 1){
                    phase = 8;
                }
            
                let finished = true;

                if((megaInitY+timer*megaSpeed) < -17){
                    finished = false;
                    mega.style.right = (megaInitY+timer*megaSpeed)+"vw"
                }
                if((titreInitX+timer) < -1)
                {
                    finished = false;
                    titre.style.top = (titreInitX+timer)+"vw";
                }
                if(finished){
                    timer = 0;
                    phaseCam++;
                }
            }
            else if (phaseCam == 2){
                mega.setAttribute("src", "img/magadri1.gif");
                phaseCam++;
            }
            else if(phaseCam == 3)
            {
                let finished = true;
                if((cvInitY+timer*cvSpeed) < 12)
                {
                    cv.style.left = (cvInitY+timer*cvSpeed)+"vw";
                    finished = false;
                }
                if((cvInitY-pfDecal+timer*cvSpeed) < 12)
                {
                    pf.style.left = (cvInitY-pfDecal+timer*cvSpeed)+"vw";
                    finished = false;
                }
                if(finished)
                {
                    pf.style.left = cv.style.left;
                    timer = 0;
                    phaseCam++;
                }
            }
            else
            {
                clearInterval(currentInterval);
            }
            timer++;
        }, intervalTime);
}

function IntroInterval(){
    let intervalTime = 1000;

    let timerEventArray = [0, 2, 0, 0, 0, 0, 0];
    let functionEventArray = [StartIntervalCredit, SubtitleInterval, SubtitleInterval,SubtitleInterval,SubtitleInterval,SubtitleInterval, CamTraveling];
    let SubtitleIntervalText = ["En l'an 2021,", "un super monteur/developpeur web", "nommé Adrien Chateau,", "recherche une alternance", "et joue a Megaman"];
    let SubtitleIntervalTime = [40, 40, 40, 40, 45]; //Time = x*0.1s
    for(let j = 0; j < SubtitleIntervalTime.length; j++){
        timerEventArray[j+2] += SubtitleIntervalTime[j]/10;
    }
    intervalIntro = setInterval(
        function()
        {
            if(phase >= timerEventArray.length)
            {
                clearInterval(intervalIntro);
            }
            else if (timerEventArray[phase] <= 0){
                clearInterval(currentInterval);
                if(phase > 0 && phase < functionEventArray.length-1)
                {
                    functionEventArray[phase](SubtitleIntervalText[phase-1], SubtitleIntervalTime[phase-1]);
                }
                else if(phase == timerEventArray.length-1)
                {
                    functionEventArray[phase](0);
                }
                else
                {
                    functionEventArray[phase]();
                }
                phase++;
            }
            else
            {
                timerEventArray[phase]--;
            }
        }, intervalTime);
}

function Press_Start(){

    cv = document.getElementById("cv");
    pf = document.getElementById("pf");
    cv.addEventListener('mouseenter', CVMouseEnter);
    cv.addEventListener('mousedown', CVClick);
    pf.addEventListener('mousedown', PFClick);
    pf.addEventListener('mouseenter', PFMouseEnter);
    cvText = cv.innerHTML;
    pfText = pf.innerHTML;

    let i = 0;
    let intervalTime = 100;
    let StartText = document.getElementById("start");
    currentInterval = setInterval(
        function() 
        {
            i += 0.1;
            i = i%2;
            StartText.style.opacity = Math.abs(i-1);
        }, intervalTime);
}

var intervalInstruction = null;
function InitFunction()
{
    if(phase == -1)
    {
        phase++;
        clearInterval(currentInterval);
        document.getElementById("start").style.opacity = 1;
        var audio = new Audio("son/gameboy-startup-sound.mp3");
        audio.volume = 0.2;
        audio.play();

        IntroInterval();
    }
}

function MouseMove(){
    if(phase > 1 && phase < 8)
    {
        if(intervalInstruction != null){
            clearInterval(intervalInstruction);
            intervalInstruction = null;
        }
        let clickText = document.getElementById("clic");
        clickText.style.op = 1;
        let op = 1;
        let intervalTime = 100;
        intervalInstruction = setInterval(
            function()
            {
                if(op < 0)
                {
                    clickText.style.opacity = 0;
                    clearInterval(intervalInstruction);
                    intervalInstruction = null;
                }
                else
                {
                    clickText.style.opacity = op;
                }
                op -= 0.1;
            }, intervalTime);
    }
}

function MouseDblClick(){
    if(phase > 1 && phase < 8)
    {
        phase = 8;
        clearInterval(currentInterval);
        clearInterval(intervalIntro);
        CamTraveling(1);    
    }
}

let cv;
let pf;
let cvText;
let pfText;

let bip = null;
function CVMouseEnter(){
    if(phase == 8)
    {
        if(bip != null)
        {
            bip.pause();
        }
        bip = new Audio("son/gameboy-startup-sound.mp3");
        bip.volume = 0.2;
        bip.play();

        cv.innerHTML = "> " + cvText;
        pf.innerHTML = pfText;
    }
}
function PFMouseEnter(){
    if(phase == 8)
    {
        if(bip != null)
        {
            bip.pause();
        }
        bip = new Audio("son/gameboy-startup-sound.mp3");
        bip.volume = 0.2;
        bip.play();

        cv.innerHTML = cvText;
        pf.innerHTML = "> " + pfText;    
    }
}

function CVClick(){
    if(phase == 8)
    {
        if(bip != null)
        {
            bip.pause();
        }
        bip = new Audio("son/bip.mp3");
        bip.volume = 0.2;
        bip.play();

        let intervalTime = 500;
        let time = 0;

        let clickInterval = setInterval(
            function()
            {
                if(time > 3){
                    clearInterval(clickInterval);
                    window.location.href = 'menu.html';
                }
                time++;
            }, intervalTime);
    }
}
function PFClick(){
    if(phase == 8)
    {
        if(bip != null)
        {
            bip.pause();
        }
        bip = new Audio("son/bip.mp3");
        bip.volume = 0.2;
        bip.play();

        let intervalTime = 500;
        let time = 0;

        let clickInterval = setInterval(
            function()
            {
                if(time > 3){
                    clearInterval(clickInterval);
                    window.location.href = 'https://www.behance.net/adrienchateau';
                }
                time++;
            }, intervalTime);
    }
}

window.addEventListener('mousemove', MouseMove);
window.addEventListener('dblclick', MouseDblClick);
window.addEventListener('keydown', InitFunction);
window.addEventListener('mousedown', InitFunction);
window.addEventListener('load', Press_Start);