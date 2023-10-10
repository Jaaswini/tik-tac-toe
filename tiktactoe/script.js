let currentPlayer = "X";
const boxes = document.querySelectorAll(".box");
const header = document.querySelector("[data-currentPlayer]");
const footer = document.querySelector("[data-newGame");
var isGameEnded = false;
function swapPlayer() {
  if (!isGameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    header.innerHTML = `Current Player is ${currentPlayer}`;
    console.log("call");
  }
}
function clickOnBox() {}
const grid = ["", "", "", "", "", "", "", "", ""];
const winningPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [3, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
initGame();

function initGame() {
  isGameEnded = false;
  boxes.forEach((box) => {
    box.innerHTML="";
    box.classList.remove("win");
    box.style.pointerEvents="all"
  });
  for (let i = 0; i < 9; i++) grid[i] = "";
  currentPlayer = "X";
  header.innerHTML = `Current Player is ${currentPlayer}`;
  footer.style.opacity = 0;
  console.log(grid);
}
function checkForWin() {
  let fillCount = 0;
  grid.map((i) => {
    if (i != "") fillCount++;
  });
  winningPos.forEach((pos) => {
    if (
      grid[pos[0]] != "" &&
      grid[pos[1]] != "" &&
      grid[pos[2]] != "" &&
      grid[pos[0]] == grid[pos[1]] &&
      grid[pos[1]] == grid[pos[2]]
    ) {
      console.log("winner is", currentPlayer);
      isGameEnded = true;
      header.innerHTML = `Winner is ${currentPlayer}`;
      footer.style.opacity = 1;
      boxes[pos[0]].classList.add("win")
      boxes[pos[1]].classList.add("win")
      boxes[pos[2]].classList.add("win")
      return;
    }
  });
  if (fillCount === 9) {
    console.log("tied");
    isGameEnded = true;
    header.innerHTML = "Game is Tied";
    footer.style.opacity = 1;
    return;
  }
  swapPlayer();
}
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if(isGameEnded) return
    if (grid[index] === "") {
      box.innerHTML = currentPlayer;
      grid[index] = currentPlayer;
        box.style.pointerEvents="none"
      checkForWin();
    }
  });
});
footer.addEventListener("click", initGame);
