const startButton = document.querySelector(".start-button"),
inputWindow = document.querySelector(".input-window"),
timerWindow = document.querySelector(".timer-window"),
workInput = document.querySelector(".work-timer"),
pauseInput = document.querySelector(".pause-timer"),
counterText = document.querySelector(".counter span"),
resetButton = document.querySelector(".reset-button"),
pauseButton = document.querySelector(".pause-button"),
lofi = document.querySelector(".lofi-audio"),
alarmclock = document.querySelector(".alarm-audio"),
timermode = document.querySelector(".timer-mode")

let startInterval, pauseInterval, isStartRunning = false, isPauseRunning = false, sec1 = 59, min1 = parseInt(workInput.value) - 1, sec2 = 59, min2 = pauseInput.value, isPause = false;

function startTimer(){

    if(workInput.value == "" || pauseInput.value == "") return alert('Você precisa preencher os campos abaixo!')
    if(parseInt(workInput.value) <= 0 || parseInt(workInput.value) > 60) return alert("Os valores do tempo de produção só podem ser entre 1 e 60 minutos!")
    if(parseInt(pauseInput.value) <= 0 || parseInt(pauseInput.value) > 60) return alert("Os valores do tempo de pausa só podem ser entre 1 e 60 minutos!")

    if(isNaN(min1)) min1 = parseInt(workInput.value - 1)
    min2 = parseInt(pauseInput.value - 1)

    if(!isStartRunning) {
        
        if(!isPause && !isPauseRunning) {
            classChange()
        }

        lofi.play()
        lofi.loop = true;
        lofi.volume = 0.01;

        counterText.innerHTML = `${min1}:${sec1}`
    
        startInterval = setInterval(() => {
            --sec1
            sec1 = sec1 < 10 ? "0" + sec1 : "" + sec1

            if(min1 == 0 && sec1 == 0) {
                lofi.pause()
                clearInterval(startInterval)
                pauseTimer()
                return;
            }

            if(sec1 == 0) {
                sec1 = 59
                min1--
            }
    
            counterText.innerHTML = `${min1}:${sec1}`

        }, 1000);
    }
   
    isStartRunning = true
    isPauseRunning = false

}

function pauseTimer() {

    sec1 = 59
    min1 = workInput.value - 1

    if(isNaN(min2)) min2 = parseInt(pauseInput.value - 1)

    alarmclock.play()
    alarmclock.volume = 0.01;
    alarmclock.loop = true;

    setTimeout(() => {
        alarmclock.pause()
        alarmclock.currentTime = 0
    }, 5000);

    timermode.innerHTML = `Tempo de descanso...`
    counterText.innerHTML = `${min2}:${sec2}`

    pauseInterval = setInterval(() => {
        --sec2
        sec2 = sec2 < 10 ? "0" + sec2 : "" + sec2

        if(min2 == 0 && sec2 == 0) {
            lofi.play()
            clearInterval(pauseInterval)
            timermode.innerHTML = `Tempo de produção...`
            startTimer()

            sec2 = 59;
            min2 = pauseInput.value - 1
            return;
        }

        if(sec2 == 0) {
            sec2 = 59
            min2--
        }

        counterText.innerHTML = `${min2}:${sec2}`        
    }, 1000);


    isPauseRunning = true
    isStartRunning = false

}

function classChange() {
    inputWindow.classList.toggle("off")
    timerWindow.classList.toggle("off")
    startButton.classList.toggle("off")
}

function resetTimer() {

    isPauseRunning = false
    isStartRunning = false
    isPause = false
    timermode.innerHTML = `Tempo de produção...`

    lofi.pause()
    lofi.currentTime = 0

    alarmclock.pause()
    alarmclock.currentTime = 0

    clearInterval(startInterval)
    clearInterval(pauseInterval)

    min1 = NaN
    sec1 = 59

    min2 = NaN
    sec2 = 59

    classChange()
}

function pauseTime(){
    if(!isPause) {
        isPause = true
        clearInterval(startInterval)
        isStartRunning = false

        lofi.pause()
        clearInterval(pauseInterval)
    } else {
        startTimer()
        lofi.play()
        isPause = false
    }
}

pauseButton.addEventListener("click", pauseTime)
resetButton.addEventListener("click", resetTimer)
startButton.addEventListener("click", startTimer)