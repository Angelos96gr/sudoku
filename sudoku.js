//Copyrights to https://github.com/Udbhav-regadamilli/Sudoku/blob/main/sudoku.js

class Sudoku {

    /**
     * To intialize the 9x9 2D array grid with ' '.
     */
    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(' '));
    }

    /**
     * To print the 2D array grid.
     */
    printSudoku() {
        console.log(" -----------------------------")
        for (let i = 0; i < this.grid.length; i++) {
            if (i != 0 && i % 3 == 0) {
                console.log(" -----------------------------")
            }
            let string = ""
            for (let j = 0; j < this.grid[i].length; j++) {
                if (j % 3 == 0) {
                    string += "|"
                }
                string += " " + this.grid[i][j] + " "
            }
            console.log(string + "|")
        }
        console.log(" -----------------------------")
    }

    /**
     * This function checks if the given value exists in paticular row or not.
     * @param {Number} val The value which we want to check.
     * @param {Number} index In which row we want to check.
     * @returns true if the 'val' exists in the row 'index'.
     */
    rowCheck(val, index) {
        return this.grid[index].includes(val)
    }

    /**
     * This function checks if the given value exists in paticular column or not.
     * @param {Number} val The value we need to check.
     * @param {Number} index In which column we need to check.
     * @returns true if the 'val' exists in the column 'index'.
     */
    colCheck(val, index) {
        for (let i = 0; i < 9; i++) {
            if (this.grid[i][index] == val) {
                return true
            }
        }
        return false
    }

    /**
     * This method is used to check if the value exists in the sub grid of the 2D array or not.
     * @param {Number} val The value we need to check in the sub grid.
     * @param {Number} row The row index value to check sub grid array.
     * @param {Number} col The column index value to check the sub grid array.
     * @returns true, If the 'val' exists in the sub grid of the array.
     */
    subgrid(val, row, col) {
        for (let i = Math.floor(row / 3) * 3; i < (Math.floor(row / 3) * 3) + 3; i++) {
            for (let j = Math.floor(col / 3) * 3; j < (Math.floor(col / 3) * 3) + 3; j++) {
                if (this.grid[i][j] == val) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * This method generates the sudoku.
     * @param {Number} dif To determine the difficult of the puzzle generator.
     */
    generateSudoku(dif) {

        //The first row was filled with random unique values 1 to 9.
        let num = Number("123456789")
        for (let i = 0; num.length > 0 && i < 9; i++) {
            let index = Math.floor(Math.random() * num.length)
            let val = num.substring(index, index + 1)
            this.grid[0][i] = val
            num = num.replace(val, '')
        }

        //First we solve the whole sudoku to ensure a possible solution exists.
        this.solver()

        //We remove the values from the possible solution such that it becomes a possible.
        this.removeValues(dif)
    }

    /**
     * This removes the values of the random row and col of the grid.
     * @param {Number} dif The dif value determines the difficultly of the puzzle.
     */
    removeValues(dif) {
        for (let i = 0; i < dif; i++) {
            let row = Math.floor(Math.random() * 9)
            let col = Math.floor(Math.random() * 9)
            this.grid[row][col] = ' '
        }
    }

    /**
     * This method solves the puzzle grid by filling the possible values.
     * @returns true, if the puzzle grid is solvable.
     */
    solver() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

                //Need to replace the cell with value if the cell is empty.
                if (this.grid[i][j] == ' ') {
                    for (let val = 1; val < 10; val++) {

                        //Checks with every possible value.
                        if (!(this.rowCheck(val, i) || this.colCheck(val, j) || this.subgrid(val, i, j))) {
                            this.grid[i][j] = val
                            if (this.solver()) {
                                return true
                            }
                            this.grid[i][j] = ' '
                        }
                    }
                    return false
                }
            }
        }
        return true
    }
}





function populate_sudoku(sudoku) {

    let pos= 0
    const sudo_html = document.querySelector("#sudoko")
    sudo_html.innerHTML = ""

    for (let i = 0; i < sudoku.grid.length; i++) {

        for (let j = 0; j < sudoku.grid[i].length; j++) {



            if (Number(sudoku.grid[i][j]) != 0) {
                sudo_html.innerHTML += `<input class = "sudo_entry" placeholder=${Number(sudoku.grid[i][j])} value = ${Number(sudoku.grid[i][j])} name = ${pos} disabled="disabled" autocomplete="off">`
            }
            else {
                //console.log(sudoku.grid[i][j])
                sudo_html.innerHTML += `<input class = "sudo_entry toFill" name = ${pos} disabled="disabled"  autocomplete="off" >`

            }

            pos++
        }
    }

    return sudoku;
}


function init_sudoku() {
    let gt_sudoku = new Sudoku()
    gt_sudoku.generateSudoku(0)

    return gt_sudoku;
}



