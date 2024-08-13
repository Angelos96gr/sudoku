restart = document.querySelector("#restart")
reset = document.querySelector("#reset")
mistakeCounter = document.querySelector("#mistakes")
mistakes_counter = 0

function initSudolisteners() {

    sudo_entries = document.querySelectorAll(".sudo_entry")
    for (let sudo_entry of sudo_entries) {
        sudo_entry.addEventListener("keyup", () => {
            if (isNaN(Number(sudo_entry.value)) || sudo_entry.value.length > 1) {
                console.log("Clearing field")
                sudo_entry.value = ""
            }
            else {
                checkMistake()
            }

        })

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

    console.log("Total mistakes", suMax)
    return suMax;

}




function checkMistake() {
    const originalSudo = sudo_permanent.grid.flat()
    const ongoinSudo = getOngoingSudo()

    let sum = 0
    originalSudo.forEach((row, i) => {
        if (row != ongoinSudo[i]) {
            sum += 1;
        }
    })
    console.log("Total mistakes: ", suMax)
    if (suMax = sum) {
        mistakes_counter += 1
        mistakeCounter.innerText = mistakes_counter

    }
    else if (sum < suMax) {
        suMax = sum;
    }
    else if (sum == 0) {
        alert("You won this game")

    }
    console.log("Mistakes currently: ", sum)

}

function getOngoingSudo() {
    const sudo_entries = document.querySelectorAll(".sudo_entry")
    const ongoinSudo = []
    for (let sudo_entry of sudo_entries) {
        ongoinSudo.push(sudo_entry.value)

    }
    return ongoinSudo
}

function equalCheck(a, b) {
    console.log("Checking equality")
    return JSON.stringify(a) === JSON.stringify(b)
}




function __init__() {
    initSudolisteners()

    restart.addEventListener("click", (e) => {
        console.log("Restarting sudoku")

        const sudo = init_sudoku()
        const sudo_permanent = JSON.parse(JSON.stringify(sudo))
        console.log(sudo_permanent)
        sudo.removeValues(30)
        const sudo_pop = populate_sudoku(sudo)
        mistakes_counter = 0;
        mistakeCounter.innerTexter = mistakes_counter

        initSudolisteners();

    })

    reset.addEventListener("click", (e) => {
        mistakes_counter = 0
        mistakeCounter.innerText = mistakes_counter

        populate_sudoku(sudo)

    })

    suMax = getTotalMistakes()
    return suMax;
}


__init__()

