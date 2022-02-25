
import Character from "./Character.js"
import createRandomCharacter from "./Character.js"

var currentCharacter = new Character()

// console.log(currentCharacter)
currentCharacter.randomEverything() 
console.log(currentCharacter)

// const main = document.querySelector(".maincontent");


const randomButton = function () {
  const newButton = document.createElement("article");

  newButton.innerHTML = `
    <button class="randomAllButton">Random</button>
  `

  return newButton;
}

const portrait = function () {
  const newArticle = document.createElement("article");
  newArticle.innerHTML = `<img src="images/${currentCharacter.picIndex}.png">`;
  return newArticle
}

function updatePortrait() {
  currentCharacter.updatePicIndex()
  characterPortrait.innerHTML = `<img src="images/${currentCharacter.picIndex}.png">`;
}

const nameComponents = function (character, randomButtonAll, genderButton) {
  const newArticle = document.createElement("div");
  newArticle.className = "nameComponents"

  newArticle.innerHTML = `
    <h3>Name: ${character.name}</h3>
    <input type="text" class="nameBox" placeholder=${character.name}></input>
    <button>Random</button>
  `;
  
  let textbox = newArticle.querySelector(".nameBox")

  textbox.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13 && (textbox.value != currentCharacter.name)) {
      currentCharacter.name = textbox.value
      textbox.placeholder = textbox.value
      newArticle.querySelector("h3").innerHTML = `Name: ${character.name}`
      textbox.value = "";
      console.log(character)
    }
  })

  let randomButton = newArticle.querySelector("button")

  randomButton.addEventListener("click", (event) => {
    event.preventDefault();
    character.randomName()
    textbox.placeholder = character.name
    newArticle.querySelector("h3").innerHTML = `Name: ${character.name}`
    genderButton.querySelector("button").innerHTML = `${character.gender}`
    console.log(character)
    updatePortrait()
  })

  // RandomAll button
  randomButtonAll.addEventListener("click", (event) => {
    event.preventDefault();
    currentCharacter.randomEverything() 
    textbox.placeholder = character.name
    newArticle.querySelector("h3").innerHTML = `Name: ${character.name}`
    console.log(character)
    genderButton.querySelector("button").innerHTML = `${character.gender}`
    updatePortrait()
  })

  return newArticle;
};

const genderComponents = function (character) {
  const articleContents = document.createElement("div");
  articleContents.className = "genderComponents"

  articleContents.innerHTML = `
    <h3>Gender:</h3>
    <button class="genderButton">${character.gender}</button>
  `

  let button = articleContents.querySelector("button")

  button.addEventListener("click", (event) => {
    event.preventDefault();
    character.gender == `M` ? character.gender = "F" : character.gender = "M"
    button.innerHTML = `${character.gender}`
    console.log(character)
    updatePortrait()
  })

  return articleContents
}

const classComponents = function (character, randomButtonAll) {
  const articleContents = document.createElement("article")
  articleContents.innerHTML = `<h3>Classes:</h3>`
  
  character.listOfJobs.forEach(element => {
    let newButton = `<button id=${element} class=${element}>${element}</button> `
    // articleContents.classList.add(`${element}`)
    // let newButton = document.createElement("article"); // class=${element}
    // newButton = 
    articleContents.innerHTML += newButton
    articleContents.classList.add(element)
  })

  let jobList = articleContents.querySelectorAll("button")

  randomButtonAll.addEventListener("click", (event) => {
    event.preventDefault();
    character.updateStats()
    jobList.forEach(job => {
      job.id == character.job ? job.disabled = true : job.disabled = false
    })
  })

  jobList.forEach(job => {
    job.addEventListener("click", (event) => {
      event.preventDefault();
      let previousJob = document.getElementById(character.job)
      character.job = job.id
      character.updateStats()
      console.log(character)
      job.disabled = true
      previousJob.disabled = false
      updatePortrait()
      updateRedundantSkills()
      updateStatTable()
    })

    job.id == character.job ? job.disabled = true : job.disabled = false
  })

  return articleContents
}

const skinComponents = function (character, randomButtonAll) {
  const articleContents = document.createElement("div")
  articleContents.className = "skinComponents"
  articleContents.innerHTML = `
  <h3>Skin Types:</h3>
  <button id=${0}>Pale</button>
  <button id=${1}>White</button>
  <button id=${2}>Black</button>
  `

  let optionList = articleContents.querySelectorAll("button")

  randomButtonAll.addEventListener("click", (event) => {
    event.preventDefault();
    optionList.forEach(option => {
      option.id == character.skin ? option.disabled = true : option.disabled = false
    })
  })

  optionList.forEach(option => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      let previous = document.getElementById(character.skin)
      previous.disabled = false
      character.skin = option.id
      option.disabled = true
      console.log(character)
      updatePortrait()
    })

    option.id == character.skin ? option.disabled = true : option.disabled = false
  })

  return articleContents
}

const skillComponents = function (character, randomButtonAll) {
  const articleContents = document.createElement("div")
  articleContents.className = "skillComponents"
  articleContents.innerHTML = `
  <h3>Skills:</h3>
  <h4>Skills Points remaining: ${character.skill_points}</h4>
  `

  let temp = Object.keys(character.skills).length
  console.log(temp)

  // while ()

  let currentID = 0
  for (var key in character.skills) {
    let newButton = `<button id=${currentID} class="skillButton">${key}</button>`
    articleContents.innerHTML += newButton // + `<br><br>`
    currentID++
  }

  let skill_list = articleContents.querySelectorAll("button")

  skill_list.forEach(skill => {
    skill.style.background = "#FFFFFF"

    skill.addEventListener("click", (event) => {
      event.preventDefault();
      if (!character.skills[skill.textContent]) {
        if (character.skill_points > 0) {
          skill.style.background = "#800080"
          skill.style.color = "#FFFFFF"
          character.skills[skill.textContent] = true
          character.skill_points--
        }        
      }
      else {
        skill.style.background = "#FFFFFF"
        skill.style.color = "#000000"
        character.skills[skill.textContent] = false
        character.skill_points++
      }
      articleContents.querySelector("h4").innerHTML = `Skills Points remaining: ${character.skill_points}`
      console.log(character.skills)
      updateRedundantSkills()
      updateStatTable()
    })
  })
  
  randomButtonAll.addEventListener("click", (event) => {
    event.preventDefault();
    character.skill_points = 3

    let listOfSkills = []
    skill_list.forEach(skill => {
      character.skills[skill.textContent] = false
      skill.style.background = "#FFFFFF"
      skill.style.color = "#000000"
      listOfSkills.push(skill)
    })
    console.log()

    while (character.skill_points > 0) {
      let newSkillIndex = Math.ceil(Math.random() * Object.keys(character.skills).length)
      let newSkill = listOfSkills[newSkillIndex - 1]
      if (!(newSkill in currentCharacter.inherentSkills) || !(currentCharacter.inherentSkills[newSkill])) {
        console.log(newSkill)
        newSkill.click()
      }
    }

    articleContents.querySelector("h4").innerHTML = `Skills Points remaining: ${character.skill_points}`
    updateStatTable()
  })

  return articleContents
}

const redundantSkillComponents = function () {
  const articleContents = document.createElement("div")
  articleContents.className = "redundantSkillComponents"

  articleContents.innerHTML = ``
  return articleContents
}

function updateRedundantSkills() {
  redundantSkillSelection.innerHTML = ``
  for (var key in currentCharacter.skills) {
    if (key in currentCharacter.inherentSkills) {
      if (currentCharacter.skills[key] && currentCharacter.inherentSkills[key]) {
        console.log("E")
        redundantSkillSelection.innerHTML += `<li>${currentCharacter.name} already has access to ${key}</li>`
      }
    }
  }
}

const statTable = function () {
  const articleContents = document.createElement("article")

  let lst = [currentCharacter.hp, currentCharacter.strength, currentCharacter.accuracy, currentCharacter.mp, currentCharacter.magic, currentCharacter.speed]

  articleContents.innerHTML = `
  `
  console.log(lst)
  return articleContents
}

function updateStatTable() {
  let lst = [currentCharacter.hp, currentCharacter.strength, currentCharacter.accuracy, currentCharacter.mp, currentCharacter.magic, currentCharacter.speed]
  if (currentCharacter.skills["HP +5"]) {
    lst[0] += 5
  }
  if (currentCharacter.skills["MP +5"]) {
    lst[3] += 5
  }
  if (currentCharacter.skills["Dual Wield"]) {
    lst[1] *= 1.5
    lst[2] *= 0.75
    lst[2] = Math.round(lst[2])
  }

  statComponents.innerHTML = `
  <table class="statTable">
    <tr>
      <th>HP: ${lst[0]}</th>
      <th>Strength: ${lst[1]}</th>
      <th>Accuracy: ${lst[2]}</th>
    </tr>
    <tr>
      <th>MP: ${lst[3]}</th>
      <th>Magic: ${lst[4]}</th>
      <th>Speed: ${lst[5]}</th>
    </tr>
  </table>
  `
}

const main1 = document.querySelector(".main1");
const main2 = document.querySelector(".main2");
const random = new randomButton()
const characterPortrait = new portrait()
const genderButton = new genderComponents(currentCharacter)
const nameStuff = new nameComponents(currentCharacter, random, genderButton)
const skinSelection = new skinComponents(currentCharacter, random)
const classSelection = new classComponents(currentCharacter, random)
const skillSelection = new skillComponents(currentCharacter, random)
const redundantSkillSelection = new redundantSkillComponents(currentCharacter, random)
const statComponents = new statTable(random)

updateStatTable()

// main.append(characterPortrait);
// main.append(random);
// main.append(statComponents);
// main.append(nameStuff);
// main.append(genderButton);
// main.append(skinSelection);
// main.append(classSelection);
// main.append(skillSelection);
// main.append(redundantSkillSelection);

main1.append(characterPortrait);
main1.append(random);
main1.append(statComponents);

main2.append(nameStuff);
main2.append(genderButton);
main2.append(skinSelection);
main2.append(classSelection);
main2.append(skillSelection);
main2.append(redundantSkillSelection);
