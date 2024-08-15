const start = document.querySelector("#start")
const reset = document.querySelector("#reset")
const restart = document.querySelector("#restart")
const help = document.querySelector("#help");
const popup = document.querySelector("#popup");

const mistakeCounter = document.querySelector("#mistakes")
const attemptsCounter = document.querySelector("#attempts")
const timerSecs = document.querySelector("#seconds")
const timerMins = document.querySelector("#minutes")
let setTimer;


const color_palette = ["rgb(132, 159, 178)", "rgb(220, 202, 175)", "rgb(195, 194, 165)", "rgb(195, 165, 165)", "rgb(236, 157, 157)", "rgb(192, 224, 224)", "bisque", "azure", "rgb(195, 165, 190)"]
let ongoinSecs = 0
let ongoinMins = 0


function shuffleColors() {


}

// Intialize sudoku
const sudo = init_sudoku()
const sudo_permanent = JSON.parse(JSON.stringify(sudo))// clone of a filled in sudoku
console.log(sudo_permanent)
sudo.removeValues(50)
const sudo_pop = populate_sudoku(sudo)

// Initialize js actions(event listeners, formatting, interactions)
__init__()



function Timer() {


    timerSecs.innerText = formatTime(ongoinSecs)
    timerMins.innerText = formatTime(ongoinMins)

    ongoinSecs++

    if (ongoinSecs == 60) {
        ongoinSecs = 0
        ongoinMins++
    }
}

function formatTime(time) {

    return (String(time).length < 2) ? "0" + String(time) : String(time)
}


function stopTimer() {
    timerSecs.innerText = formatTime(ongoinSecs)
    timerMins.innerText = formatTime(ongoinMins)

}


function initSudolisteners() {
    sudoEntries = document.querySelectorAll(".sudo_entry")
    for (let sudoEntry of sudoEntries) {
        sudoEntry.addEventListener("keyup", () => {
            if (["", " "].includes(sudoEntry.value) || isNaN(Number(sudoEntry.value)) || sudoEntry.value.length > 1) { // accounts for enter, backspace, NaNs (i.e., letters) and single-digit numbers
                sudoEntry.value = ""
            }
            else {

                attemptsCounter.innerText = Number(attemptsCounter.innerText) + 1
                checkMistake(sudoEntry)
            }
        })
    }
}



function checkMistake(sudoEntry) {
    const originalSudo = sudo_permanent.grid.flat()
    const ongoinSudo = getOngoingSudo()

    if (Number(sudoEntry.value) == originalSudo[Number(sudoEntry.name)]) {
        console.log(`Correct entry, there are still ${checkMissing(ongoinSudo)} elements in the grid`)

        if (checkMissing(ongoinSudo) == 0) {
            alert(`You won this game with ${attemptsCounter.innerText} attempts`)
        }
    }
    else {
        console.log("Incorrect entry")
        mistakeCounter.innerText = Number(mistakeCounter.innerText) + 1


    }

}

function getTotalMistakes() {
    const originalSudo = sudo_permanent.grid.flat()
    const originalHiddenSudo = sudo.grid.flat()

    let suMax = 0
    originalSudo.forEach((row, i) => {
        if (row != originalHiddenSudo[i]) {
            suMax += 1;
        }
    })

    return suMax;

}


function getOngoingSudo() { //gets sudoku state from html DOM and creates an array of values
    const sudoEntries = document.querySelectorAll(".sudo_entry")
    const ongoinSudo = []
    for (let sudoEntry of sudoEntries) {
        ongoinSudo.push(sudoEntry.value)

    }
    return ongoinSudo
}



function checkMissing(ongoinSudo) {
    let sum = 0
    ongoinSudo.forEach((element) => {
        if (element == "") {
            sum++
        }
    })

    return sum;
}



function getSudokuBlocks() {
    const sudo_length = getOngoingSudo().length
    let im_arr = Array.apply(null, Array(sudo_length)).map((el, ind) => ind)

    let colorMap = new Object()
    let tempCount = 0
    for (let k = 0; k < 81; k += 27) {

        for (let j = 0; j < 9; j += 3) {
            let empt_arr = new Array()

            i = j + k
            while (empt_arr.length < 9) {
                empt_arr.push(...im_arr.slice(i, i + 3))
                i += 9

            }

            colorMap[color_palette[tempCount]] = empt_arr
            tempCount++
        }
    }

    return colorMap


}


function updateBackColor() {
    const sudoEntries = document.querySelectorAll(".sudo_entry")
    const colorMap = getSudokuBlocks()

    for (let sudoEntry of sudoEntries) {

        Object.entries(colorMap).forEach((el) => {
            if (el[1].includes(Number(sudoEntry.name))) {
                sudoEntry.style.backgroundColor = el[0]
            }
        })

    }


}

function resetCounters() {
    mistakeCounter.innerText = 0;
    attemptsCounter.innerText = 0;
}


function blockEntries() {
    sudoEntries = document.querySelectorAll(".sudo_entry")
    for (let sudoEntry of sudoEntries) {

        sudoEntry.disabled = true 
    }
}

function unBlockEntries() {
    sudoEntries = document.querySelectorAll(".sudo_entry")
    for (let sudoEntry of sudoEntries) {

        sudoEntry.disabled = (sudoEntry.classList.contains('toFill')) ? false :true
    }
}


function __init__() {

    initSudolisteners()
    updateBackColor()


    start.addEventListener("click", () => {

        if (["Start", "Resume"].includes(start.innerText)) {
            setTimer = setInterval(Timer, 1000)
            start.innerText = "Pause"
            unBlockEntries()


        }
        else {
            clearInterval(setTimer)
            setInterval(stopTimer, 1000)
            start.innerText = "Resume"
            blockEntries()


        }


    })


    help.addEventListener("click", () => {

        if (["hidden", ""].includes(popup.style.visibility)) {
            popup.style.visibility = "visible"
        }
        else {
            popup.style.visibility = "hidden"
        }

    })


    reset.addEventListener("click", () => {
        resetCounters()
        populate_sudoku(sudo)
        initSudolisteners()
        unBlockEntries()
        updateBackColor()

    })

    restart.addEventListener("click", (e) => {
        console.log("Restarting sudoku")
        location.reload()
        resetCounters()
        initSudolisteners()
        blockEntries()
        resetButtons()
        updateBackColor()

    })


}


function resetButtons() {
    start.innerText = "Start"

}











