// TO DO: 1. Styling. 2. Refactor.
console.log("For the glory of the Emperor!");

const applyAttackDamage = document.getElementById("applyAttackDamage");
const applyDefenseDamage = document.getElementById("applyDefenseDamage");
const clearButton = document.getElementById("clearButton");
const fightButton = document.getElementById("fightButton");
const fightingResetButton = document.getElementById("fightingResetButton");
const resetButton = document.getElementById("resetButton");
const shootingResetButton = document.getElementById("shootingResetButton");
const shootButton = document.getElementById("shootButton");

const shootAtkDrop = document.getElementById("shootATK");
const shootHitDrop = document.getElementById("shootHIT");
const shootDmgDrop = document.getElementById("shootDMG");
const shootCrtDrop = document.getElementById("shootCRT");
const shootSaveDrop = document.getElementById("shootSAVE");
const shootCoverDrop = document.getElementById("shootCOVER");
const fightAtkAtkDrop = document.getElementById("atkFightATK");
const fightAtkHitDrop = document.getElementById("atkFightHIT");
const fightAtkDmgDrop = document.getElementById("atkFightDMG");
const fightAtkCrtDrop = document.getElementById("atkFightCRT");
const fightDefAtkDrop = document.getElementById("defFightATK");
const fightDefHitDrop = document.getElementById("defFightHIT");
const fightDefDmgDrop = document.getElementById("defFightDMG");
const fightDefCrtDrop = document.getElementById("defFightCRT");

const atkDice = document.getElementById("atkDice");
const defDice = document.getElementById("defDice");
const clicked = document.getElementsByClassName("clicked");

const diceImg = document.getElementsByClassName("diceImg");
const defDiceImg = document.getElementsByClassName("defDiceImg");
const atkDiceImg = document.getElementsByClassName("atkDiceImg");

const critImage = 'file:///C:/Users/jkenney/Desktop/Personal/Games/Kill%20Team/Kill%20Team%20Dice%20Roller/Images/6.jpg';

// ATTACKER STATS
let atkVal = 0;
let hitVal = 0;
let dmgVal = 0;
let crtVal = 0;
let atkCritSucc = 0;
let atkSucc = 0;
let atkFail = 0;

// DEFENDER STATS
let save = 0;
let cover = 0;
let defCritSucc = 0;
let defSucc = 0;
let defFail = 0;
let wounds = 0;
let numDefDice = 0;

// BACKUP STATS
// ATTACKER STATS
let backupAtkVal = 0;
let backupHitVal = 0;
let backupDmgVal = 0;
let backupCrtVal = 0;
let backupAtkCritSucc = 0;
let backupAtkSucc = 0;
let backupAtkFail = 0;

// DEFENDER STATS
let backupSave = 0;
let backupCover = 0;
let backupDefCritSucc = 0;
let backupDefSucc = 0;
let backupDefFail = 0;
let backupWounds = 0;
let backupNumDefDice = 0;

// LISTENERS
shootCoverDrop.addEventListener("change", function() {
    coverChange();
});

fightButton.addEventListener("click", function(){
    // RESET HITS, ETC.
    atkSucc = 0;
    atkCritSucc = 0;
    atkFail = 0;
    defSucc = 0;
    defCritSucc = 0;
    defFail = 0;
    wounds = 0;

    // ATTACKER STATS
    let atkFightATK = $('#atkFightATK').val();
    let atkFightHIT = $('#atkFightHIT').val();
    let atkFightDMG = $('#atkFightDMG').val();
    let atkFightCRT = $('#atkFightCRT').val();

    // DEFENDER STAT
    let defFightATK = $('#defFightATK').val();
    let defFightHIT = $('#defFightHIT').val();
    let defFightDMG = $('#defFightDMG').val();
    let defFightCRT = $('#defFightCRT').val();

    // THE ATTACK ROLL
    let atkResultsArr = rollDice(atkFightATK);
    atkResultsArr.forEach((e) => {
        if (e === 6) {
            atkCritSucc++;
        } else if (e >= atkFightHIT) {
            atkSucc++;
        } else {
            atkFail++;
        }
    });
    
    // THE DEFENSE ROLL
    let defResultsArr = rollDice(defFightATK);
    defResultsArr.forEach((e) => {
        if (e === 6) {
            defCritSucc++;
        } else if (e >= defFightHIT) {
            defSucc++;
        } else {
            defFail++;
        }
    });
    

    updateDice(atkResultsArr, defResultsArr);
    updateFightResults(atkFightDMG, atkFightCRT, defFightDMG, defFightCRT);
    addToggleClickedListener();

    if (applyDefenseDamage.classList.contains("hidden")) {
        applyAttackDamage.classList.toggle("hidden");
        applyDefenseDamage.classList.toggle("hidden");
    } else {
        console.log("Leave that button alone.");
    }

    if (fightingResetButton.classList.contains("hidden")) {
        fightingResetButton.classList.toggle("hidden");
        shootingResetButton.classList.add("hidden");
    } else {
        console.log("Leave that button alone.");
    }

    backupCombatValues();
});

shootButton.addEventListener("click", function(){
    // RESET HITS, ETC.
    atkSucc = 0;
    atkCritSucc = 0;
    atkFail = 0;
    defSucc = 0;
    defCritSucc = 0;
    defFail = 0;
    wounds = 0;
    
    // ATTACKER STATS
    atkVal = $('#shootATK').val();
    hitVal = $('#shootHIT').val();
    dmgVal = $('#shootDMG').val();
    crtVal = $('#shootCRT').val();

    //DEFENDER STATS
    save = $('#shootSAVE').val();
    cover = $('#shootCOVER').val();

    if (cover == "yes") {
        numDefDice = 2;
        defSucc++;
    } else {
        numDefDice = 3;
    }

    // THE ATTACK ROLL
    let atkResultsArr = rollDice(atkVal);
    atkResultsArr.forEach((e) => {
        if (e === 6) {
            atkCritSucc++;
        } else if (e >= hitVal) {
            atkSucc++;
        } else {
            atkFail++;
        }
    });
    
    // THE DEFENSE ROLL
    let defResultsArr = rollDice(numDefDice);
    defResultsArr.forEach((e) => {
        if (e === 6) {
            defCritSucc++;
        } else if (e >= save) {
            defSucc++;
        } else {
            defFail++;
        }
    });

    updateDice(atkResultsArr, defResultsArr);
    updateResults();
    addToggleClickedListener();

    if (applyDefenseDamage.classList.contains("hidden")) {
        console.log("Leave that button alone.");
    } else {
        applyAttackDamage.classList.toggle("hidden");
        applyDefenseDamage.classList.toggle("hidden");
    }

    if (shootingResetButton.classList.contains("hidden")) {
        shootingResetButton.classList.toggle("hidden");
        fightingResetButton.classList.add("hidden");
    } else {
        console.log("Leave that button alone.");
    }

    backupCombatValues();
});

shootAtkDrop.addEventListener("change", function() {
    let numOfDice = this.value;
    changeNumberOfDice(numOfDice);
});

shootingResetButton.addEventListener("click", function() {
    Array.from(diceImg).forEach(function(diceImg){
        diceImg.classList.remove("clicked");
        diceImg.classList.remove("hidden");
    });
    restoreCombatValues();
    updateResults();
});

fightingResetButton.addEventListener("click", function() {
    // ATTACKER STATS
    let atkFightATK = $('#atkFightATK').val();
    let atkFightHIT = $('#atkFightHIT').val();
    let atkFightDMG = $('#atkFightDMG').val();
    let atkFightCRT = $('#atkFightCRT').val();

    // DEFENDER STAT
    let defFightATK = $('#defFightATK').val();
    let defFightHIT = $('#defFightHIT').val();
    let defFightDMG = $('#defFightDMG').val();
    let defFightCRT = $('#defFightCRT').val();
    
    Array.from(diceImg).forEach(function(diceImg){
        diceImg.classList.remove("clicked");
        diceImg.classList.remove("hidden");
    });
    restoreCombatValues();
    updateFightResults(atkFightATK, atkFightHIT, atkFightDMG, atkFightCRT, defFightATK, defFightHIT, defFightDMG, defFightCRT);
});

clearButton.addEventListener("click", function() {
    // RESET HITS, ETC.
    atkSucc = 0;
    atkCritSucc = 0;
    atkFail = 0;
    defSucc = 0;
    defCritSucc = 0;
    defFail = 0;
    wounds = 0;
    if (shootingResetButton.classList.contains("hidden")) {
        console.log("It's already hidden");
    } else {
        shootingResetButton.classList.add("hidden");
    }

    if (fightingResetButton.classList.contains("hidden")) {
        console.log("It's already hidden");
    } else {
        fightingResetButton.classList.add("hidden");
    }

    if (resultsLine.classList.contains("hidden")) {
        console.log("It's already hidden");
    } else {
        fightingResetButton.classList.add("hidden");
    }


});

applyAttackDamage.addEventListener("click", function() {
    // ATTACKER STATS
    let atkFightHIT = $('#atkFightHIT').val();
    let atkFightDMG = $('#atkFightDMG').val();
    let atkFightCRT = $('#atkFightCRT').val();

    // DEFENDER STATS
    let defFightDMG = $('#defFightDMG').val();
    let defFightCRT = $('#defFightCRT').val();

    if (atkDice.getElementsByClassName("clicked").length < 1) {
        console.log("Nothing has been selected.");
    } else if (atkDice.getElementsByClassName("clicked").length == 1) {
        console.log("Applying damage");
        if (atkDice.getElementsByClassName("clicked")[0].src.charAt(atkDice.getElementsByClassName("clicked")[0].src.length-5) == 6) {
            atkCritSucc--;
            atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
            atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked'); 
        } else if (atkDice.getElementsByClassName("clicked")[0].src.charAt(atkDice.getElementsByClassName("clicked")[0].src.length-5) >= atkFightHIT) {
            atkSucc--;
            atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
            atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        } else {
            console.log("This value is too low to deal damage.");
            atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        }
        // Update "Damage Dealt" area or similar.
    } else if (atkDice.getElementsByClassName("clicked").length > 1) {
        console.log("You can only apply one die at a time.");
        for (let i = atkDice.getElementsByClassName("clicked").length - 1; i > -1; i--) {
            atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        }
    }
    else {
        console.log("nothing to see here");
    }
    
    updateFightResults(atkFightDMG, atkFightCRT, defFightDMG, defFightCRT);
});

applyDefenseDamage.addEventListener("click", function() {
    // ATTACKER STATS
    let atkFightDMG = $('#atkFightDMG').val();
    let atkFightCRT = $('#atkFightCRT').val();

    // DEFENDER STATS
    let defFightHIT = $('#defFightHIT').val();
    let defFightDMG = $('#defFightDMG').val();
    let defFightCRT = $('#defFightCRT').val();

    if (defDice.getElementsByClassName("clicked").length < 1) {
        console.log("Nothing has been selected.");
    } else if (defDice.getElementsByClassName("clicked").length == 1) {
        console.log("Applying damage");
        if (defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6) {
            defCritSucc--;
            defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
            defDice.getElementsByClassName("clicked")[0].classList.remove('clicked'); 
        } else if (defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= defFightHIT) {
            defSucc--;
            defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
            defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        } else {
            console.log("defFightHIT.value = " + defFightHIT.value);
            console.log("This value is too low to deal damage.");
            defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        }
        // Update "Damage Dealt" area or similar.
    } else if (defDice.getElementsByClassName("clicked").length > 1) {
        console.log("You can only apply one die at a time.");
        for (let i = defDice.getElementsByClassName("clicked").length - 1; i > -1; i--) {
            defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
        }
    }
    else {
        console.log("nothing to see here");
    }
    
    updateFightResults(atkFightDMG, atkFightCRT, defFightDMG, defFightCRT);
});

changeNumberOfDice(shootAtkDrop.value)
addToggleClickedListener();

// FUNCTIONS
function rollDice(num) {
    let resultsArr = [];
    let diceNum = num;
    for (let i = 0; i < diceNum; i++) {
        resultsArr.push(Math.floor(Math.random() * (7-1) + 1));
    }
    return resultsArr;
}

function changeNumberOfDice(numOfDice) {
    let addedDice = "";
    for (i = 0; i < numOfDice; i++) {
        addedDice += '<img src="Images/1.jpg" class="diceImg atkDiceImg">';
    }
    atkDice.innerHTML = addedDice;
}

function coverChange() {
    if (document.getElementById("shootCOVER").value == "yes") {
        defDice.innerHTML = "<img src='Images/5.jpg' class='diceImg'><img src='Images/1.jpg' class='diceImg'><img src='Images/1.jpg' class='diceImg'>"
    } else {
        defDice.innerHTML = "<img src='Images/1.jpg' class='diceImg'><img src='Images/1.jpg' class='diceImg'><img src='Images/1.jpg' class='diceImg'>"
    }
}

function updateDice(atkResultsArr, defResultsArr) {
    // UPDATE ATK DICE
    let addedDice = "";
    for (let i = 0; i < atkResultsArr.length; i++) {
        // console.log("atkResultsArr[i] = " + atkResultsArr[i]);
        addedDice += '<img src="Images/'+ atkResultsArr[i] + '.jpg" class="diceImg atkDiceImg">';
    }
    document.getElementById("atkDice").innerHTML = addedDice;

    // UPDATE DEF DICE
    addedDice = "";
    if (document.getElementById("shootCOVER").value == "yes") {
        addedDice += '<img src="Images/5.jpg" class="diceImg">';
        for (let i = 0; i < defResultsArr.length; i++) {
            addedDice += '<img src="Images/'+ defResultsArr[i] + '.jpg" class="diceImg defDiceImg">';
        }
    } else {
        for (let i = 0; i < defResultsArr.length; i++) {
            addedDice += '<img src="Images/'+ defResultsArr[i] + '.jpg" class="diceImg defDiceImg">';
        }
    }
    document.getElementById("defDice").innerHTML = addedDice;
}

function updateResults() {
    document.getElementById("atkResults").innerHTML = "Critical Hits: " + atkCritSucc + " | Hits: " + atkSucc + " | Misses: " + atkFail + " | Damage: " + ((atkCritSucc * crtVal) + (atkSucc * atkVal));
    document.getElementById("defResults").innerHTML = "Critical Saves: " + defCritSucc + " | Saves: " + defSucc + " | Fails: " + defFail;
}

function updateFightResults (atkFightDMG, atkFightCRT, defFightDMG, defFightCRT) {
    document.getElementById("atkResults").innerHTML = "+++ ATTACKER +++ | Critical Hits: " + atkCritSucc + " | Hits: " + atkSucc + " | Misses: " + atkFail + " | Damage Left to Apply: " + ((atkCritSucc * atkFightCRT) + (atkSucc * atkFightDMG));
    document.getElementById("defResults").innerHTML = "+++ DEFENDER +++ | Critical Hits: " + defCritSucc + " | Hits: " + defSucc + " | Misses: " + defFail + " | Damage Left to Apply: " + ((defCritSucc * defFightCRT) + (defSucc * defFightDMG));
}

function addToggleClickedListener () {
    Array.from(diceImg).forEach(function(diceImg){
        diceImg.addEventListener("click", function() {
            this.classList.toggle("clicked");
            if ((this.classList.contains('clicked')) && (this.classList.contains('defDiceImg'))) {
                console.log("defDiceClicked()");
                defDiceClicked(this);
            } else if ((this.classList.contains('clicked')) && (this.classList.contains('atkDiceImg'))) {
                atkDiceClicked(this);
            } else {
                console.log("How did THIS happen?");
            }
        });
    });
}

// NOTE: Dice notation follows this convention: defDice/atkDice. ex. 66/23: that's two critical saves and two fails (a two and a three on the attack dice).
function atkDiceClicked(atkDiceValue) {
    // ATTACKER STATS
    let atkFightATK = $('#atkFightATK').val();
    let atkFightHIT = $('#atkFightHIT').val();
    let atkFightDMG = $('#atkFightDMG').val();
    let atkFightCRT = $('#atkFightCRT').val();

    // DEFENDER STAT
    let defFightATK = $('#defFightATK').val();
    let defFightHIT = $('#defFightHIT').val();
    let defFightDMG = $('#defFightDMG').val();
    let defFightCRT = $('#defFightCRT').val();
    
    if (document.getElementsByClassName('atkDiceImg clicked').length > 1) {
        console.log("you've already clicked an attack die")
        atkDiceValue.classList.remove('clicked');
        return;
    } else {
        console.log("this is the first attack die");
    }

    // Any def dice clicked?
    if (defDice.getElementsByClassName("clicked")) {
        // How many def dice have been clicked?
        if (defDice.getElementsByClassName("clicked").length == 1) {
            // 6/6
            if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)) {
                console.log("used a crit to cancel a crit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
            // 6/5
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootHitDrop.value)) {
                console.log("Used a critSave to cancel a hit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            // 6/3
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootHitDrop.value)) {
                console.log("You don't need to cancel a fail.");
                atkDiceValue.classList.remove('clicked');
            // 5/6
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)) {
                    console.log("You need to click two regular saves to cancel a crit.");
                    defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                    atkDiceValue.classList.remove('clicked'); 
            // 5/5
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootHitDrop.value)) {
                console.log("Used a save to cancel a hit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defSucc--;
            // 5/3
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootHitDrop.value)) {
                console.log("You don't need to cancel a fail.");
                atkDiceValue.classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            // 3/X
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value))) {
                console.log("You can't cancel with a fail.");
                atkDiceValue.classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            } else {
                console.log("It didn't work");
            }
        }
        if (defDice.getElementsByClassName("clicked").length == 2) {
            // 66/6
            if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("Only one crit is needed to cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
            }
            // 66/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootAtkDrop.value)){
                console.log("Only one crit is needed to cancel a hit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            }
            // 66/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootAtkDrop.value)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 65/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("Only the crit can cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
            }
            // 65/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootAtkDrop.value)){
                console.log("Why don't you save the crit?");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 65/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) > shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootAtkDrop.value)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 55/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("Two saves cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkCritSucc--;
                defSucc--;
                defSucc--;
            }
            // 55/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootSaveDrop.value)){
                console.log("You only need one save to cancel a hit.");
                defDice.getElementsByClassName("clicked")[1].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 55/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootSaveDrop.value)){
                console.log("You don't need to cancel fails.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 53/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("You need two saves or a crit save to cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 53/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootAtkDrop)){
                console.log("You cancelled a hit with a save. You didn't need the fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 53/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) < shootAtkDrop)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 33/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("Fails can't cancel anything.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 53/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootAtkDrop)){
                console.log("Didn't need the fail. Canceled the hit with a save.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.add('hidden');
                atkDiceValue.classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 33/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) >= shootAtkDrop)){
                console.log("You can't canvel hits with saves, no matter how many you use.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }
            // 33/3
             else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop.value)) && (atkDiceValue.currentSrc.charAt(atkDiceValue.currentSrc.length-5) == 6)){
                console.log("You can't cancel anything with a fail. But it's okay because this was a fail, too.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDiceValue.classList.remove('clicked');
            }

        }
        if (defDice.getElementsByClassName("clicked").length == 3) {
            console.log("You've clicked too many defense dice.");
            let y = document.getElementsByClassName("clicked defDiceImg");
            Array.from(y).forEach(function(y){
                y.classList.remove("clicked");
            })          
        } else {
            console.log("No def dice have been clicked.");
        }
    } else {
        console.log("No def dice have been clicked.");
    }
    
    console.log("updating results");
    if (fightingResetButton.classList.contains("hidden")){
        
        updateResults();
    } else {
        updateFightResults(atkFightDMG, atkFightCRT, defFightDMG, defFightCRT);
    }
    
}

function defDiceClicked(defDiceValue) {
    // Any atk dice clicked?
    if (atkDice.getElementsByClassName("clicked").length > 0) {
        // you can only resolve 1 atk die at a time
        // How many def dice have been clicked?
        if (defDice.getElementsByClassName("clicked").length == 1) {
            // 6/6
            if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].src.charAt(atkDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) {
                console.log("used a crit to cancel a crit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
            // 6/5
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootHitDrop.value)) {
                console.log("Used a critSave to cancel a hit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            // 6/3
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootHitDrop.value)) {
                console.log("You don't need to cancel a fail.");
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            // 5/5
            } else if ((
                (defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].src.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootHitDrop.value) 
                && (defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) !== 6)) {
                console.log("Used a save to cancel a hit");
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defSucc--;
            // 5/3
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootHitDrop.value)) {
                console.log("You don't need to cancel a fail.");
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            // 3/6
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value))) {
                console.log("You don't need to cancel a fail.");
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            // 5/6
            } else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)) {
                console.log("You need to click two regular saves to cancel a crit.");
                defDice.getElementsByClassName("clicked").classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            } else {
                console.log("It didn't work");
            }
        }
        if (defDice.getElementsByClassName("clicked").length == 2) {
            // 66/6
            if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("Only one crit is needed to cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
            }
            // 66/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootAtkDrop.value)){
                console.log("Only one crit is needed to cancel a hit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            }
            // 66/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootAtkDrop.value)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 65/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("Only the crit can cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            }
            // 65/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) == 6)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootAtkDrop.value)){
                console.log("Why don't you save the crit?");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defCritSucc--;
            }
            // 65/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) == 6)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) > shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootAtkDrop.value)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 55/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("Two saves cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkCritSucc--;
                defCritSucc--;
                defCritSucc--;
            }
            // 55/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootSaveDrop.value)){
                console.log("You only need one save to cancel a hit.");
                defDice.getElementsByClassName("clicked")[1].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 55/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) >= shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootSaveDrop.value)){
                console.log("You don't need to cancel fails.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 53/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("You need two saves or a crit save to cancel a crit.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 53/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootAtkDrop)){
                console.log("You cancelled a hit with a save. You didn't need the fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 53/3
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) < shootAtkDrop)){
                console.log("You don't need to cancel a fail.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 33/6
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("Fails can't cancel anything.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 53/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) >= shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootAtkDrop)){
                console.log("Didn't need the fail. Canceled the hit with a save.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.add('hidden');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkSucc--;
                defSucc--;
            }
            // 33/5
            else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) >= shootAtkDrop)){
                console.log("You can't canvel hits with saves, no matter how many you use.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
            // 33/3
             else if (((defDice.getElementsByClassName("clicked")[0].src.charAt(defDice.getElementsByClassName("clicked")[0].src.length-5) < shootSaveDrop.value)) && ((defDice.getElementsByClassName("clicked")[1].src.charAt(defDice.getElementsByClassName("clicked")[1].src.length-5) < shootSaveDrop.value)) && (atkDice.getElementsByClassName("clicked")[0].currentSrc.charAt(atkDice.getElementsByClassName("clicked")[0].currentSrc.length-5) == 6)){
                console.log("You can't cancel anything with a fail. But it's okay because this was a fail, too.");
                defDice.getElementsByClassName("clicked")[1].classList.remove('clicked');
                defDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
                atkDice.getElementsByClassName("clicked")[0].classList.remove('clicked');
            }
        }
        if (defDice.getElementsByClassName("clicked").length == 3) {
            console.log("You've clicked too many defense dice.");
            let y = document.getElementsByClassName("clicked defDiceImg");
            Array.from(y).forEach(function(y){
                y.classList.remove("clicked");
            })          
        } else {
            console.log("No def dice have been clicked.");
        }
        updateResults();
    } else {
        console.log("No atk dice have been clicked.");
    }
}

function backupCombatValues() {
    // The entire purpose of this function is to grab the combat values so they won't be lost when the dice are clicked, in case the user clicks the reset button.

    // ATTACKER STATS
    backupAtkVal = atkVal;
    backupHitVal = hitVal;
    backupDmgVal = dmgVal;
    backupCrtVal = crtVal;
    backupAtkCritSucc = atkCritSucc;
    backupAtkSucc = atkSucc;
    backupAtkFail = atkFail;

    // DEFENDER STATS
    backupSave = save
    backupCover = cover;
    backupDefCritSucc = defCritSucc;
    backupDefSucc = defSucc;
    backupDefFail = defFail;
    backupWounds = wounds;
    backupNumDefDice = numDefDice;
}

function restoreCombatValues() {
    // ATTACKER STATS
    atkVal = backupAtkVal;
    hitVal = backupHitVal;
    dmgVal = backupDmgVal;
    crtVal = backupCrtVal;
    atkCritSucc = backupAtkCritSucc;
    atkSucc = backupAtkSucc;
    atkFail = backupAtkFail;

    // DEFENDER STATS
    save = backupSave;
    cover = backupCover;
    defCritSucc = backupDefCritSucc;
    defSucc = backupDefSucc;
    defFail = backupDefFail;
    wounds = backupWounds;
    numDefDice = backupNumDefDice;
}