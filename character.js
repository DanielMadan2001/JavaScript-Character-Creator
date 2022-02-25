
class Character {
    constructor(
        name = "",
        gender = "M",
        skin = 0,
        job = "Soldier"
    ) {
        this.name = name
        this.gender = gender
        this.skin = skin    // pale, white, black
        this.job = job
        this.listOfJobs = ["Soldier", "Warrior", "Wizard", "Thief", "Archer"]

        this.hp = 0
        this.mp = 0
        this.strength = 0
        this.magic = 0
        this.accuracy = 0
        this.speed = 0

        this.picIndex = 0
        
        this.listOfRandomNames = [
            "Paul",     "Linda",
            "John",     "Cynthia",
            "George",   "Pattie",
            "Richard",  "Barbara",
            "Ezekiel",  "Eva",
            "Noah",     "Katie",
            "Justin",   "Beth",
            "Tyler",    "Sadie",
            "Cody",     "Courtney",
            "Harold",   "Izzy",
            "Trent",    "Bridgette",
            "Jeff",    "Lindsay",
            "Jay",      "Shanna",
            "Duncan",   "Heather",
            "Owen",     "Gwen"  
        ]
        this.skill_points = 3
        this.skills = {
            // Soldier Skills:
            "Soldier Training": false,  "Rallying Cry": false,
            // Warrior Skills:
            "HP +5": false,             "Dual Wield": false,
            // Wizard Skills:
            "MP +5": false,             "Mana Regen": false,
            // Thief Skills:
            "Desperate Dodger": false,  "Steal": false,
            // Archer Skills:
            "Air Dominance": false,     "Rapidfire": false
        }
        this.inherentSkills = {
            "Desperate Dodger": false,
            "Steal": false,
            "Mana Regen": false,
            "Air Dominance": false
        }
    }
    randomName() {
        let listLength = this.listOfRandomNames.length
        let index = Math.floor(Math.random()* listLength)
        this.name = this.listOfRandomNames[index]
        this.genderCheck(index)
        
    }
    genderCheck(index) {
        ((index % 2) == 1) ? this.gender = "F" : this.gender = "M"
    }
    randomClass() {
        let listLength = this.listOfJobs.length
        let index = Math.floor(Math.random()* listLength)
        this.job = this.listOfJobs[index]
        this.updateStats()
    }
    updateStats() {     // ["Soldier", "Warrior", "Wizard", "Thief", "Archer"]
        for (var key in this.inherentSkills) {
            this.inherentSkills[key] = false
        }

        switch (this.job) {
            case("Soldier"):
                this.hp = 8
                this.mp = 5
                this.strength = 8
                this.magic = 5
                this.accuracy = 6
                this.speed = 3
                break
            case("Warrior"):
                this.hp = 10
                this.mp = 3
                this.strength = 12
                this.magic = 2
                this.accuracy = 4
                this.speed = 4
                break
            case("Wizard"):
                this.hp = 8
                this.mp = 7
                this.strength = 4
                this.magic = 9
                this.accuracy = 5
                this.speed = 3
                this.inherentSkills["Mana Regen"] = true
                break
            case("Thief"):
                this.hp = 7
                this.mp = 4
                this.strength = 7
                this.magic = 4
                this.accuracy = 7
                this.speed = 6
                this.inherentSkills["Desperate Dodger"] = true
                this.inherentSkills["Steal"] = true
                break
            case("Archer"):
                this.hp = 8
                this.mp = 4
                this.strength = 8
                this.magic = 3
                this.accuracy = 10
                this.speed = 2
                this.inherentSkills["Air Dominance"] = true
                break
        }
        // console.log(this.inherentSkills)
    }
    updatePicIndex(){
        let genderNum = 0
        this.gender == "M" ? genderNum = 0 : genderNum = 1
        console.log()
        this.picIndex = 
            parseInt(this.skin) +
            parseInt(3 * genderNum) + 
            parseInt(6 * this.listOfJobs.indexOf(this.job))
    }
    randomEverything() {
        this.randomName()
        this.randomClass()
        this.skin = Math.ceil(Math.random(2) * 2)
        this.updatePicIndex()
    }
}

// function createRandomCharacter() {
//     const newCharacter = new Character()
//     newCharacter.randomName()
//     console.log(newCharacter)
//     newCharacter.updateStats()
//     return newCharacter
// }

export default Character;