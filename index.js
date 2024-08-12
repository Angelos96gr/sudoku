restart = document.querySelector("#restart")




function initialise_event_listeners() {
    sudo_entries = document.querySelectorAll(".sudo_entry")
    console.log("Initialising event listeners for sudo entries")
    for (let sudo_entry of sudo_entries) {
        sudo_entry.addEventListener("keyup", () => {
            let entered_num = sudo_entry.value
            console.log(Number(sudo_entry.value))
            if (isNaN(Number(sudo_entry.value))) {
                console.log("Clearing field")
                sudo_entry.value = ""
            }
            setTimeout(()=>{},5000);
            check_mistake(sudoku)
        })

    }
}

restart.addEventListener("click", (e) => {
    console.log("Restarting sudoku")
    const sudo = init_sudoku()
    sudo.printSudoku()
    const sudoku = populate_sudoku(sudo)

    initialise_event_listeners();

})





initialise_event_listeners()



