let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // playerX, playerY
let count = 0; //to check draw

// let arr = ["apple","banana","cherry"];//1D array
// let arr2 = [["dog","elephant"],["frog","giraffe","hippo"]];//2D array

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () =>{
    //console.log("Box was clicked");
    if(turn0){
      box.style.color = "red";
      box.innerText = "X";
      
      turn0 = false;
    }
    else{
      box.style.color = "blue";
      box.innerText = "O";
      
      turn0 = true;
    }
    box.disabled = true;
    
    count++;
    
    let win = checkWinner();

    if(count ===9 && !win){
      gameDraw();
    }

  });
});

const gameDraw = () => {
  msg.innerText = `Game Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const disableBoxes =() => {
  for(let box of boxes){
    box.disabled = true;
  }
}

const enableBoxes =() => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = " ";
  }
}

const showWinner = (winner) =>{
  msg.innerText = `Congratulations, ${winner} WON!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner =() => {
  for(let pattern of winPatterns){
    // console.log(
    //   pattern[0],
    //   pattern[1], 
    //   pattern[2]
    // );
    // console.log(
    //   boxes[pattern[0]], 
    //   boxes[pattern[1]], 
    //   boxes[pattern[2]]
    // );
    // console.log(
    //   boxes[pattern[0]].innerText, 
    //   boxes[pattern[1]].innerText, 
    //   boxes[pattern[2]].innerText
    // );
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != ""){
      if(pos1val === pos2val && pos2val === pos3val){
        //console.log("winner", pos1val);
        showWinner(pos1val);
      }
      
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);