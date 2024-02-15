const { waitForUserInput, waitForKeyPress } = require("./utils/input.utils");
// waitForUserInput = 키 누르고 엔터 후 실행
// waitForKeyPress = 키 누르면 바로 실행

async function main() {
  let rowCount = 3;   // 줄수
  let colCount = 3;   // 칸수
  let emptyPos = 0;   // 빈칸 위치
  let moveCount = 0;
  let sec = 100;

  // game board
  let boardArray = Array(rowCount * colCount).fill(' ');
  for (let i = 1; i < rowCount * colCount; i++) {
    boardArray[i] = `${i}`;
  }
  // let boardArray = [ ' ', '1', '2', '3', '4', '5', '6', '7', '8'] // 2차원으로 쓰는게 더 좋음

  const directionKey = (down, up, right, left)=> {
    if (down) {
      if (emptyPos - colCount >= 0) {
        // emptyPos에 칸 수 만큼 빼야 윗줄로 감
        boardArray[emptyPos] = boardArray[emptyPos - colCount];
        boardArray[emptyPos - colCount] = " ";
        emptyPos -= colCount;
        moveCount++;
      }
    } else if (up) {
      if (emptyPos + colCount < boardArray.length) {
        // emptyPos에 칸 수를 더한값은 전체 길이보다 작아야함
        boardArray[emptyPos] = boardArray[emptyPos + colCount];
        boardArray[emptyPos + colCount] = " ";
        emptyPos += colCount;
        moveCount++;
      }
    } else if (right) {
      if (emptyPos % colCount > 0) {
        // 0번째 칸이 아니면,
        boardArray[emptyPos] = boardArray[emptyPos - 1];
        boardArray[emptyPos - 1] = " ";
        emptyPos -= 1;
        moveCount++;
      }
    } else if (left) {
      if (emptyPos % colCount < colCount - 1) {
        // 2번째 칸이 아니면,
        boardArray[emptyPos] = boardArray[emptyPos + 1];
        boardArray[emptyPos + 1] = " ";
        emptyPos += 1;
        moveCount++;
      }
    }
  }

  // shuffle
  for (let i = 0; i < 100; i++) {
    // pick a random side up down left right
    // 0    1   2    3
    // down up right left
    const randInt = Math.random() * 4; // 0 ~ 3

    const down = randInt > 3;
    const up = randInt > 2;
    const right = randInt > 1;
    const left = randInt > 0;

    directionKey(down, up, right, left);
    moveCount = 0;
  }
  
  // time limit
  const timer = setInterval(()=>{
    console.clear();

    let solveCount = 0;
    // solve check
    for (let i = 0; i < boardArray.length; i++) {
      // 순차정렬이 되고 있는지 확인
      if (+boardArray[i] === i + 1) {
        solveCount++;
      }

      // 판 만들기
      let row = [];
      if (i % colCount === 0) {
        for (let j = 0; j < colCount; j++) {
          row[j] = boardArray[i + j];
        }
        console.log(row);
      }
    }

    // console.log("정답수: " + solveCount);
    console.log("moveCount: " + moveCount);
    console.log("Time: " + sec);

    sec--;

    // 다 풀었으면 종료
    if (solveCount === boardArray.length - 1) {
      // console.clear();
      console.log('well done');
      process.exit(0);
    }
    // timeout
    if (sec < 0) {
      clearInterval(timer);
      // console.clear();
      console.log('timeout');
      process.exit(0);
    }
  }, 1000);

  while (true) {
    const keyPress = await waitForKeyPress("");
    const down = keyPress.name === "down";
    const up = keyPress.name === "up";
    const right = keyPress.name === "right";
    const left = keyPress.name === "left";

    // timer;

    directionKey(down, up, right, left);

    // if(down || up || right || left) {
    //   moveCount++;
    // }

    if (keyPress.ctrl && keyPress.name === "c") {
      break;
      // process.exit(0);
    }
  }
}

main();




/*
const {waitForUserInput, waitForKeyPress} = require("./utils/input.utils");
// waitForUserInput = 키 누르고 엔터 후 실행
// waitForKeyPress = 키 누르면 바로 실행

// 게임을 실행
// s/m/l 중 하나를 선택하세요

// // 움직임이 생겼을 때 내용이 전체를 바꿈
// [' ', '5', '3']
// ['1', '4', '8']
// ['7', '2', '6']
// Time Remaining: 60 
// count: 0 
// 게임을 끝내려면 ctrl+c 키를 누르세요
// >>

async function main() {
  let boardArray = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', ' ', '8'],
  ];

  // let board = `
  // ['${boardArray[0][0]}', '${boardArray[0][1]}', '${boardArray[0][2]}']
  // ['${boardArray[1][0]}', '${boardArray[1][1]}', '${boardArray[1][2]}']
  // ['${boardArray[2][0]}', '${boardArray[2][1]}', '${boardArray[2][2]}']
  // `;

  // time limit
  // let sec = 60;
  // let timer = setInterval(()=>{
  //   while(sec > 0){
  //     sec--;
  //     console.log(sec);
  //   }
  // }, 1000);

  // move count
  // let count = 0;

  let emptyPos = [2, 1];

  while(true) {
    console.clear();
    for (let i = 0; i < boardArray.length; i++) {
      console.log(boardArray[i]);
    }

    console.log(board);
    console.log('timeRemaining: ' + sec);
    console.log('count: ' + count);
    console.log('게임을 끝내려면 ctrl+c 키를 누르세요');
 
    const input = await waitForKeyPress("");
    if (input.name === "up") {
      if(emptyPos[0] < boardArray.length-1){
        boardArray[emptyPos[0]][emptyPos[1]] = boardArray[emptyPos[0]+1][emptyPos[1]];
        boardArray[emptyPos[0]+1][emptyPos[1]] = " ";
        emptyPos[0] += 1;
      }
    } else if (input.name === "down") {
      if(emptyPos[0] > 0){
        boardArray[emptyPos[0]][emptyPos[1]] = boardArray[emptyPos[0]-1][emptyPos[1]];
        boardArray[emptyPos[0]-1][emptyPos[1]] = " ";
        emptyPos[0] -= 1;
      }
    } else if (input.name === "left") {
      if(emptyPos[1] > 0){
        boardArray[emptyPos[0]][emptyPos[1]] = boardArray[emptyPos[0]][emptyPos[1]-1];
        boardArray[emptyPos[0]][emptyPos[1]-1] = " ";
        emptyPos[1] -= 1;
      }
    } else if (input.name === "right") {
      if(emptyPos[1] < boardArray[0].length-1){
        boardArray[emptyPos[0]][emptyPos[1]] = boardArray[emptyPos[0]][emptyPos[1]+1];
        boardArray[emptyPos[0]][emptyPos[1]+1] = " ";
        emptyPos[1] += 1;
      }
    }
  
    // console.log(input);

    if (input.ctrl && input.name==="c") {
      break;
      // process.exit(0);
    }
  }
}

main();

*/
