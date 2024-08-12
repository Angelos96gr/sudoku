//const sudoku = document.querySelector("#sudoko")
const primitive_array = [1,2,3,4,5,6,7,8,9]
const createEmpty2DArray = (rows, cols) => {
    return Array.from({ length: rows }, () => Array(cols).fill(null));
};

const sudoku_table = createEmpty2DArray(9,2)
for 
console.log(sudoku_table.length, sudoku_table[0].length)
console.log(sudoku_constructor(sudoku_table))


function sudoku_constructor(table){

    for (let i = 0 ; i < table.length; i++){
        console.log(`Initializing ${i}th column`)
        table[i] = shuffle(primitive_array) 
        //console.log(table)

    }
    return table
}


/*
let sum = 0
uniqueSet.forEach((el)=>sum +=el)
console.log(`Sum of column ${sum}`)


console.log(uniqueSet)
let shuffled_arr;
shuffled_arr =  shuffle(uniqueSet)
console.log(shuffled_arr)

*/
function shuffle(column){

    const shuffled_column = column
    for (let i=0; i< shuffled_column.length; i++){
        let rand_index = getRandomInt(8);
        console.log(`FLipping element ${i}th with ${rand_index}th`);

        let temp = shuffled_column[i];
        shuffled_column[i] = shuffled_column[rand_index];
        shuffled_column[rand_index] = temp;

    }
    return shuffled_column;
}


function getRandomInt(max){
    return Math.floor(Math.random()*max)
}