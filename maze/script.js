'use strict'

//functions
function generateBoard() {
  let nestedArrMaze = currentMaze.map(row => row.split(''))
  nestedArrMaze.forEach(row => {
    let rowNode = createNode("row");
    row.forEach(cell => {
      let cellNode = createNode("cell");
      if (cell === '#') {
        cellNode.classList.add('wall')
      }
      if (cell === '.') {
        cellNode.classList.add('path')
      }
      if (cell === 'P') {
        cellNode.classList.add('start')
      }
      if (cell === 'T') {
        cellNode.classList.add('end')
      }
      rowNode.appendChild(cellNode);
    })

    boardNode.appendChild(rowNode);
  })
}

function spawnEntity(entityClass, toWhere) {
  let node = createNode(entityClass);
  toWhere.appendChild(node);
}

function movePlayer(toWhere) {
  // console.log(targetNode)
  if(targetNode.classList.contains('wall')){
    return
  }
  playerCell.removeChild(playerNode);
  spawnEntity('player',toWhere)
  playerNode = document.querySelector('.player');
  playerCell = playerNode.parentNode;
  playerRow = playerCell.parentNode;
}
function columnIndexTransfer(whichRow) {
  if (whichRow === null) {
    return;
  }
  columnIndex = getIndexWithinParent(playerCell)
  return whichRow.querySelector(`.cell:nth-child(${columnIndex + 1})`);
}

function handleUserInput(event) {
  // console.log(event.code);
  if (event.code === "ArrowRight") {
    targetNode = playerCell.nextElementSibling;
    if (targetNode === null) {
      return;
    }
    movePlayer(targetNode);
  }

  if (event.code === "ArrowLeft") {
    targetNode = playerCell.previousElementSibling;
    if (targetNode === null) {
      return;
    }
    movePlayer(targetNode);
  }

  if (event.code === "ArrowDown") {
    targetNode = columnIndexTransfer(playerRow.nextElementSibling)
    if (targetNode === undefined) {
      return;
    }
    movePlayer(targetNode);
  }

  if (event.code === "ArrowUp") {
    targetNode = columnIndexTransfer(playerRow.previousElementSibling)
    if (targetNode === undefined) {
      return;
    }
    movePlayer(targetNode);
  }
  // detectTresureCollision();
}

//helper functions
function createNode(className) {
  const node = document.createElement("div");
  node.classList.add(className);
  return node;
}

function getIndexWithinParent(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
//game

const boardNode = document.querySelector('.board');
let currentMaze = maze002;
generateBoard();
const startNode = document.querySelector('.start');
const endNode = document.querySelector('.end');
spawnEntity('treasure', endNode);
spawnEntity('player', startNode);
let targetNode;
window.addEventListener("keydown", handleUserInput);
let playerNode = document.querySelector('.player');
let playerCell = playerNode.parentNode;
let playerRow = playerCell.parentNode;
let columnIndex = getIndexWithinParent(playerCell);

//sandbox
