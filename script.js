"use strict";
import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEL = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEL = document.getElementById("computerChoice");
const resultText = document.getElementById("resultText");
const reset = document.getElementById("reset");

const playerChoices = document.querySelectorAll("i[id^='player']");
const computerChoices = document.querySelectorAll("i[id^='computer']");

let prevPlayerSelection;
let prevComputerSelection;

let playerScoreNumber = 0;
let computerScoreNumber = 0;

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

//reset selection
function resetPlayerSelection() {
  if (
    prevPlayerSelection &&
    prevPlayerSelection.classList.contains("selected")
  ) {
    prevPlayerSelection.classList.remove("selected");
    stopConfetti();
    removeConfetti();
  }
}
function resetComputerSelection() {
  if (
    prevComputerSelection &&
    prevComputerSelection.classList.contains("selected")
  ) {
    prevComputerSelection.classList.remove("selected");
  }
}

//update score
function updateScore(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a Tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.includes(computerChoice)) {
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      resultText.textContent = "You Won!";
      startConfetti();
    } else {
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      resultText.textContent = "You Loose!";
    }
  }
}

//select choice
function selectChoice(choice, gamerChoiceEl) {
  switch (choice) {
    case "rock":
      gamerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      gamerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      gamerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      gamerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      gamerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}

//computer random choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    return "rock";
  }
  if (computerChoiceNumber >= 0.2 && computerChoiceNumber < 0.4) {
    return "paper";
  }
  if (computerChoiceNumber >= 0.4 && computerChoiceNumber < 0.6) {
    return "scissors";
  }
  if (computerChoiceNumber >= 0.6 && computerChoiceNumber < 0.8) {
    return "lizard";
  }
  if (computerChoiceNumber >= 0.8) {
    return "spock";
  }
}

//handle computer selection
function handleComputerChoice() {
  const computerChoice = computerRandomChoice();
  resetComputerSelection();
  computerChoices.forEach((item) =>
    item.classList.contains(`fa-hand-${computerChoice}`)
      ? (prevComputerSelection = item)
      : prevComputerSelection
  );

  prevComputerSelection.classList.add("selected");
  selectChoice(computerChoice, computerChoiceEL);
  return computerChoice;
}

//call function to process turn
function checkResult(playerChoice) {
  const computerChoice = handleComputerChoice();
  updateScore(playerChoice, computerChoice);
}

//handle player selection
function handlePlayerChoice() {
  resetPlayerSelection();
  prevPlayerSelection = this;
  prevPlayerSelection.classList.add("selected");
  const choice = this.id.split("player")[1].toLowerCase();
  selectChoice(choice, playerChoiceEL);
  checkResult(choice);
}

//reset
function resetHandler() {
  playerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  playerChoiceEL.textContent = "";
  computerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  computerChoiceEL.textContent = "";
  resultText.textContent = "";
  resetComputerSelection();
  resetPlayerSelection();
}

//event listeners
playerChoices.forEach((item) =>
  item.addEventListener("click", handlePlayerChoice)
);

reset.addEventListener("click", resetHandler);

//on load
resetHandler();
