const gameBody = document.getElementById("game-body")
const life = document.getElementById("lives")
let lives = 4

// Iteration 1.2: Add shotgun sound
let gunSound = new Audio("assets/shotgun.wav")
gameBody.addEventListener("click",()=>{
    gunSound.currentTime = 0
    gunSound.play()
})

// Iteration 1.3: Add background sound
let bgMusic = new Audio("assets/bgm.mp3")
bgMusic.play()
bgMusic.loop = true

// Generate zombies
let zombieID = 0
let zombie
function zombieGen(){
    let num = numGen(1,7)
    gameBody.innerHTML += `<img class="zombie-image" id="zombie${zombieID}" src="assets/zombie-${num}.png"></img>`

    zombie = document.getElementById(`zombie${zombieID}`)

    let speed = numGen(2,6)
    zombie.style.animationDuration = `${speed}s`

    let position = numGen(10,80)
    zombie.style.transform = `translateX(${position}vw)`

    zombie.onclick = () => {
        destroyZombie(zombie)
    } 
}
zombieGen()

// Generate random number
function numGen(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

// Destroy zombie function
function destroyZombie(ghost){
    ghost.style.display = "none"
    zombieID ++
    zombieGen()
}

// To check if zombie reached the top
let width = 100
function zombieEscape(zombie){
    if(zombie.getBoundingClientRect().top <= 0){
        lives -- 
        width -= 25
        document.getElementById("lives").style.width = `${width}%`
        if (lives<=0){
            window.open("game-over.html","_self")
        }else{
            destroyZombie(zombie)
        }
    }
}

// timer function
let time = 60
setInterval(timer,1000)

function timer(){
    const clock = document.getElementById("timer")
    if (time <= 0){
        window.open("win.html","_self")
    }else{
        time -- 
        clock.innerText = time
        zombieEscape(zombie)
    }
}