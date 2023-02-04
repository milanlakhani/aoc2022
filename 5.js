function processDrawing(drawing, stackQuantity) {
    const drawingRows = drawing.split('\n').reverse();
    let stacks = {};
    for (let stack = 1; stack <= stackQuantity; stack++) {
        let boxTower = [];
        drawingRows.find(row => {
            if (row[4*stack - 3] != ' ') {
                boxTower.push(row[4*stack - 3]);
                return false;
            } else {
                return true;
            }
        });
        stacks[String(stack)] = boxTower;
    }
    return(stacks);
}

function processInstructions(instructions) {
    return instructions.split("\n").map(instruction => {
        const listInstruction = instruction.split(" ");
        return [listInstruction[1],listInstruction[3],listInstruction[5]];
    })
}

function moveBoxes1(boxes,instructions){
    instructions.forEach(instruction => {
        const numberOfBoxesToMove = parseInt(instruction[0]);
        const boxesToMove = boxes[instruction[1]].slice(-1*numberOfBoxesToMove).reverse();
        boxes[instruction[1]] = boxes[instruction[1]].slice(0,-1*numberOfBoxesToMove);
        boxes[instruction[2]] = boxes[instruction[2]].concat(boxesToMove);
    });
    const message = Object.keys(boxes).map(key => boxes[key].slice(-1)).join('');
    return message;
}

function moveBoxes2(boxes,instructions){
    instructions.forEach(instruction => {
        const numberOfBoxesToMove = parseInt(instruction[0]);
        const boxesToMove = boxes[instruction[1]].slice(-1*numberOfBoxesToMove);
        boxes[instruction[1]] = boxes[instruction[1]].slice(0,-1*numberOfBoxesToMove);
        boxes[instruction[2]] = boxes[instruction[2]].concat(boxesToMove);
    });
    const message = Object.keys(boxes).map(key => boxes[key].slice(-1)).join('');
    return message;
}

const rawDrawing = `[F]         [L]     [M]            
[T]     [H] [V] [G] [V]            
[N]     [T] [D] [R] [N]     [D]    
[Z]     [B] [C] [P] [B] [R] [Z]    
[M]     [J] [N] [M] [F] [M] [V] [H]
[G] [J] [L] [J] [S] [C] [G] [M] [F]
[H] [W] [V] [P] [W] [H] [H] [N] [N]
[J] [V] [G] [B] [F] [G] [D] [H] [G]`

const rawInstructions = `move 6 from 4 to 3
move 5 from 8 to 9
move 1 from 4 to 5
move 1 from 4 to 5
move 2 from 2 to 7
move 2 from 1 to 6
move 9 from 6 to 1
move 12 from 3 to 5
move 1 from 8 to 4
move 3 from 1 to 5
move 1 from 6 to 7
move 10 from 5 to 2
move 14 from 5 to 1
move 8 from 7 to 9
move 11 from 2 to 9
move 1 from 3 to 9
move 11 from 1 to 5
move 2 from 1 to 9
move 1 from 4 to 8
move 6 from 1 to 5
move 1 from 8 to 3
move 16 from 5 to 1
move 4 from 1 to 3
move 1 from 5 to 6
move 4 from 3 to 4
move 1 from 6 to 7
move 21 from 9 to 6
move 2 from 1 to 9
move 2 from 4 to 9
move 5 from 9 to 4
move 9 from 1 to 6
move 6 from 4 to 6
move 1 from 6 to 2
move 1 from 7 to 6
move 1 from 3 to 2
move 8 from 6 to 9
move 3 from 1 to 8
move 1 from 2 to 1
move 13 from 6 to 3
move 1 from 1 to 9
move 2 from 1 to 6
move 3 from 8 to 4
move 4 from 4 to 9
move 3 from 1 to 3
move 22 from 9 to 8
move 1 from 2 to 9
move 6 from 8 to 9
move 15 from 6 to 5
move 5 from 8 to 9
move 11 from 9 to 8
move 13 from 5 to 1
move 1 from 6 to 5
move 1 from 9 to 3
move 21 from 8 to 3
move 3 from 5 to 3
move 11 from 1 to 2
move 25 from 3 to 1
move 5 from 1 to 7
move 20 from 1 to 7
move 1 from 6 to 7
move 16 from 3 to 9
move 8 from 9 to 6
move 1 from 1 to 5
move 5 from 9 to 4
move 2 from 2 to 1
move 2 from 9 to 4
move 1 from 9 to 4
move 1 from 8 to 4
move 1 from 5 to 2
move 3 from 4 to 6
move 1 from 4 to 7
move 9 from 7 to 6
move 5 from 4 to 6
move 7 from 7 to 2
move 1 from 1 to 6
move 11 from 2 to 5
move 10 from 5 to 1
move 1 from 6 to 8
move 1 from 5 to 7
move 24 from 6 to 1
move 12 from 1 to 4
move 12 from 4 to 8
move 2 from 2 to 7
move 3 from 7 to 2
move 5 from 2 to 8
move 9 from 8 to 9
move 9 from 8 to 5
move 1 from 9 to 1
move 14 from 1 to 8
move 11 from 7 to 9
move 4 from 1 to 3
move 7 from 1 to 2
move 3 from 3 to 7
move 12 from 9 to 7
move 8 from 7 to 2
move 4 from 9 to 2
move 1 from 3 to 6
move 5 from 5 to 9
move 14 from 2 to 1
move 8 from 9 to 4
move 6 from 4 to 5
move 5 from 5 to 7
move 1 from 8 to 2
move 2 from 4 to 6
move 4 from 7 to 3
move 10 from 8 to 4
move 2 from 3 to 6
move 7 from 7 to 6
move 10 from 4 to 8
move 5 from 1 to 6
move 8 from 2 to 1
move 7 from 6 to 8
move 9 from 6 to 5
move 16 from 1 to 6
move 2 from 3 to 9
move 1 from 7 to 4
move 2 from 9 to 1
move 14 from 6 to 7
move 1 from 6 to 3
move 2 from 6 to 3
move 9 from 5 to 7
move 3 from 1 to 6
move 3 from 3 to 7
move 5 from 5 to 9
move 3 from 6 to 2
move 1 from 6 to 2
move 12 from 8 to 2
move 5 from 2 to 1
move 2 from 1 to 3
move 25 from 7 to 1
move 1 from 4 to 6
move 2 from 3 to 9
move 26 from 1 to 9
move 2 from 1 to 8
move 1 from 6 to 8
move 1 from 7 to 1
move 7 from 8 to 1
move 7 from 1 to 5
move 1 from 1 to 2
move 2 from 8 to 6
move 32 from 9 to 8
move 1 from 6 to 5
move 5 from 2 to 9
move 1 from 9 to 7
move 24 from 8 to 3
move 1 from 6 to 9
move 3 from 2 to 5
move 1 from 7 to 9
move 4 from 9 to 3
move 8 from 8 to 7
move 18 from 3 to 7
move 20 from 7 to 8
move 6 from 8 to 9
move 6 from 5 to 1
move 8 from 9 to 4
move 3 from 5 to 4
move 8 from 8 to 4
move 2 from 5 to 2
move 3 from 1 to 5
move 4 from 3 to 7
move 6 from 2 to 9
move 3 from 3 to 6
move 6 from 4 to 5
move 2 from 6 to 3
move 1 from 3 to 1
move 4 from 3 to 8
move 8 from 4 to 3
move 4 from 3 to 7
move 4 from 4 to 5
move 4 from 9 to 5
move 3 from 3 to 4
move 3 from 4 to 9
move 1 from 1 to 4
move 2 from 1 to 5
move 7 from 7 to 8
move 4 from 7 to 4
move 1 from 6 to 7
move 1 from 1 to 5
move 1 from 3 to 8
move 11 from 5 to 9
move 17 from 9 to 8
move 13 from 8 to 4
move 1 from 4 to 8
move 4 from 7 to 1
move 4 from 8 to 3
move 6 from 5 to 4
move 3 from 3 to 6
move 2 from 1 to 9
move 1 from 9 to 5
move 1 from 3 to 5
move 5 from 5 to 9
move 2 from 1 to 8
move 21 from 8 to 6
move 2 from 8 to 4
move 4 from 9 to 6
move 1 from 9 to 7
move 19 from 4 to 1
move 28 from 6 to 5
move 7 from 4 to 2
move 28 from 5 to 3
move 1 from 9 to 4
move 1 from 4 to 2
move 1 from 7 to 8
move 1 from 8 to 9
move 13 from 1 to 3
move 8 from 2 to 8
move 3 from 1 to 2
move 5 from 8 to 5
move 1 from 2 to 7
move 1 from 9 to 7
move 1 from 2 to 3
move 2 from 7 to 9
move 1 from 2 to 6
move 1 from 9 to 1
move 9 from 3 to 9
move 3 from 9 to 1
move 1 from 6 to 8
move 21 from 3 to 7
move 7 from 9 to 4
move 2 from 4 to 2
move 1 from 8 to 6
move 7 from 1 to 4
move 7 from 7 to 8
move 4 from 5 to 9
move 10 from 7 to 1
move 7 from 3 to 9
move 1 from 7 to 9
move 1 from 5 to 3
move 3 from 3 to 5
move 10 from 4 to 2
move 1 from 3 to 7
move 2 from 4 to 9
move 3 from 9 to 1
move 3 from 7 to 1
move 1 from 6 to 4
move 1 from 1 to 2
move 1 from 3 to 4
move 2 from 4 to 3
move 1 from 7 to 4
move 4 from 8 to 9
move 1 from 4 to 9
move 3 from 1 to 9
move 12 from 1 to 7
move 2 from 9 to 5
move 12 from 9 to 7
move 5 from 5 to 1
move 1 from 8 to 5
move 4 from 1 to 4
move 1 from 9 to 6
move 1 from 3 to 4
move 3 from 8 to 3
move 1 from 1 to 7
move 8 from 2 to 5
move 2 from 8 to 1
move 10 from 7 to 1
move 4 from 9 to 5
move 2 from 5 to 8
move 11 from 5 to 4
move 6 from 7 to 2
move 2 from 2 to 1
move 1 from 7 to 5
move 1 from 5 to 1
move 2 from 4 to 8
move 1 from 6 to 9
move 8 from 4 to 3
move 8 from 1 to 7
move 7 from 1 to 2
move 4 from 3 to 9
move 1 from 9 to 6
move 7 from 2 to 1
move 5 from 2 to 3
move 2 from 7 to 8
move 5 from 8 to 4
move 2 from 9 to 3
move 1 from 8 to 1
move 6 from 3 to 5
move 10 from 3 to 1
move 3 from 5 to 3
move 3 from 2 to 1
move 1 from 5 to 4
move 6 from 4 to 5
move 1 from 6 to 2
move 3 from 4 to 7
move 1 from 9 to 4
move 2 from 3 to 1
move 1 from 9 to 8
move 1 from 3 to 7
move 4 from 4 to 8
move 2 from 7 to 4
move 8 from 5 to 9
move 2 from 8 to 6
move 2 from 4 to 3
move 2 from 3 to 4
move 4 from 9 to 7
move 1 from 8 to 7
move 2 from 6 to 9
move 2 from 8 to 9
move 1 from 2 to 9
move 1 from 7 to 8
move 1 from 2 to 7
move 19 from 7 to 6
move 1 from 8 to 1
move 2 from 4 to 8
move 5 from 6 to 1
move 2 from 7 to 2
move 2 from 2 to 8
move 2 from 1 to 8
move 4 from 8 to 2
move 3 from 2 to 8
move 6 from 9 to 5
move 8 from 6 to 3
move 26 from 1 to 6
move 1 from 5 to 3
move 1 from 1 to 5
move 8 from 3 to 1
move 1 from 3 to 7
move 3 from 9 to 2
move 4 from 2 to 6
move 26 from 6 to 1
move 1 from 7 to 5
move 3 from 8 to 4
move 2 from 8 to 2
move 7 from 1 to 2
move 1 from 5 to 9
move 2 from 4 to 6
move 9 from 6 to 2
move 18 from 1 to 7
move 6 from 7 to 1
move 6 from 5 to 6
move 1 from 1 to 2
move 19 from 2 to 7
move 1 from 4 to 2
move 9 from 7 to 1
move 3 from 6 to 7
move 1 from 9 to 4
move 1 from 2 to 3
move 8 from 7 to 8
move 4 from 6 to 5
move 2 from 6 to 3
move 1 from 4 to 2
move 4 from 5 to 1
move 8 from 8 to 7
move 17 from 7 to 8
move 3 from 3 to 1
move 1 from 2 to 8
move 8 from 8 to 4
move 8 from 8 to 7
move 1 from 8 to 2
move 7 from 7 to 6
move 1 from 2 to 7
move 5 from 7 to 8
move 7 from 1 to 6
move 10 from 6 to 1
move 4 from 7 to 9
move 3 from 9 to 7
move 1 from 7 to 2
move 6 from 4 to 2
move 7 from 1 to 5
move 4 from 2 to 5
move 16 from 1 to 9
move 3 from 2 to 7
move 2 from 4 to 9
move 4 from 1 to 6
move 5 from 7 to 4
move 4 from 6 to 3
move 1 from 7 to 4
move 1 from 6 to 9
move 1 from 8 to 5
move 4 from 3 to 2
move 2 from 5 to 3
move 3 from 6 to 2
move 3 from 2 to 1
move 9 from 5 to 8
move 1 from 3 to 1
move 10 from 8 to 1
move 1 from 8 to 5
move 16 from 9 to 2
move 1 from 3 to 2
move 12 from 1 to 9
move 1 from 9 to 2
move 3 from 1 to 6
move 2 from 1 to 9
move 3 from 6 to 8
move 20 from 2 to 7
move 16 from 9 to 7
move 1 from 7 to 5
move 2 from 5 to 9
move 2 from 2 to 3
move 2 from 8 to 5
move 3 from 9 to 7
move 2 from 5 to 2
move 1 from 4 to 6
move 2 from 1 to 4
move 23 from 7 to 5
move 4 from 8 to 5
move 7 from 7 to 1
move 16 from 5 to 7
move 1 from 6 to 5
move 1 from 2 to 4
move 2 from 3 to 9
move 1 from 2 to 3
move 13 from 5 to 1
move 1 from 3 to 8
move 1 from 9 to 4
move 19 from 1 to 9
move 2 from 1 to 9
move 22 from 9 to 8
move 14 from 8 to 5
move 12 from 5 to 3
move 21 from 7 to 9
move 14 from 9 to 7
move 1 from 8 to 6
move 9 from 3 to 7
move 1 from 3 to 2
move 4 from 4 to 1
move 1 from 2 to 4
move 1 from 3 to 9
move 6 from 8 to 9
move 4 from 1 to 7
move 2 from 5 to 9
move 6 from 4 to 5
move 4 from 7 to 4
move 1 from 5 to 3
move 5 from 9 to 7
move 2 from 3 to 1
move 6 from 9 to 6
move 1 from 1 to 6
move 2 from 4 to 2
move 8 from 7 to 5
move 20 from 7 to 5
move 2 from 5 to 6
move 4 from 9 to 5
move 1 from 1 to 3
move 1 from 3 to 4
move 1 from 2 to 7
move 1 from 4 to 9
move 9 from 6 to 3
move 2 from 4 to 3
move 28 from 5 to 3
move 1 from 8 to 3
move 1 from 8 to 1
move 1 from 2 to 8
move 1 from 6 to 2
move 1 from 8 to 1
move 6 from 5 to 7
move 1 from 5 to 1
move 1 from 9 to 2
move 1 from 1 to 3
move 1 from 9 to 7
move 2 from 1 to 2
move 11 from 3 to 8
move 3 from 8 to 6
move 3 from 6 to 9
move 25 from 3 to 7
move 4 from 3 to 8
move 4 from 2 to 3
move 9 from 8 to 9
move 2 from 3 to 7
move 3 from 8 to 2
move 11 from 9 to 7
move 1 from 9 to 1
move 4 from 7 to 3
move 1 from 1 to 5
move 23 from 7 to 2
move 12 from 2 to 3
move 2 from 3 to 9
move 12 from 2 to 1
move 2 from 3 to 9
move 1 from 5 to 4
move 1 from 2 to 5
move 1 from 9 to 4
move 1 from 5 to 9
move 2 from 4 to 2
move 3 from 1 to 4
move 1 from 2 to 1
move 10 from 3 to 2
move 7 from 7 to 3
move 11 from 7 to 9
move 5 from 3 to 1
move 1 from 4 to 5
move 11 from 2 to 3
move 9 from 9 to 3
move 3 from 9 to 4
move 2 from 4 to 8
move 1 from 5 to 6
move 13 from 1 to 5
move 3 from 3 to 8
move 3 from 7 to 2
move 1 from 7 to 4
move 3 from 8 to 3
move 8 from 3 to 8
move 4 from 4 to 5
move 2 from 8 to 2
move 8 from 8 to 3
move 1 from 6 to 3
move 2 from 2 to 8
move 6 from 5 to 2
move 3 from 2 to 8
move 1 from 1 to 7
move 2 from 9 to 3
move 3 from 5 to 4
move 2 from 8 to 6`

console.log(moveBoxes1(processDrawing(rawDrawing,9), processInstructions(rawInstructions)));
console.log(moveBoxes2(processDrawing(rawDrawing,9), processInstructions(rawInstructions)));
