

let enemyInnerHpBar = document.getElementById("enemyInnerHpBar");
let myInnerHpBar = document.getElementById("myInnerHpBar");
let firstButton = document.getElementById("firstButton");
let firstMoveName = document.getElementById("firstName");
let myAttack = document.getElementById("myAttackImage");
let enemyAttack = document.getElementById("enemyAttackImage");
let log = document.getElementById("log");

console.log("Trainer Derek vs Trainer Theresa");
console.log("Derek sent out Treecko");
console.log("Theresa sent out mudkip");

function myPokemon(name, level, m){
    this.name = name;
    this.level = level;
    this.spe = 1.5 * level;
    this.hp = 2 * level;
    this.move = m;
    this.currentHp = 2 * level;

    this.attack = function(target){
        m.displayMove();
        target.currentHp -= m.damage;
        if(target.currentHp < 0){
            target.currentHp = 0;
        }
        enemyInnerHpBar.style.width = (target.currentHp/target.hp)*100 + '%';
        console.log(this.name + " did " + m.damage + " points of damage to the enemy " + target.name);
    }
}

function enemyPokemon(name, level, m){
    this.name = name;
    this.level = level;
    this.spe = 1.5 * level;
    this.hp = 2 * level;
    this.move = m;
    this.currentHp = 2 * level;

    this.attack = function(target){
        m.displayMove();
        target.currentHp -= m.damage;
        if(target.currentHp < 0){
            target.currentHp = 0;
        }
        setTimeout(function(){myInnerHpBar.style.width = (target.currentHp/target.hp)*100 + '%';}, 1000);
        console.log(this.name + " did " + m.damage + " points of damage to the enemy " + target.name);
    }
}

function myTrainer(name, p1, p2, p3){
    this.name = name;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.currentP = p1;
    this.fainted = function(winner){
        setTimeout(function(){
            document.getElementById("myPokemonImage").src = "resources/zigzagoon.png"
            document.getElementById("myName").innerText = p2.name; 
            document.getElementById("myLvl").innerText = "Lv " + p2.level;
            myInnerHpBar.style.width = 100 + '%';    
        }, 1100);
        firstMoveName.innerText = this.currentP.move.moveName;
        this.currentP = p2;
                
        if(this.currentP.currentHp == 0){
            setTimeout(function(){
                document.getElementById("myPokemonImage").src = "resources/taillow.png"
                document.getElementById("myName").innerText = p3.name; 
                document.getElementById("myLvl").innerText = "Lv " + p3.level; 
            }, 1100)
            
            myInnerHpBar.style.width = 100 + '%';
            firstMoveName.innerText = this.currentP.move.moveName;
            this.currentP = p3;
        }
        if(this.currentP.currentHp == 0){
            console.log(this.name + " has lost the battle. " + winner.name + " wins!");
        }

    }
}

function enemyTrainer(name, p1, p2, p3){
    this.name = name;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.currentP = p1;
    this.fainted = function(winner){
        setTimeout(function(){
            document.getElementById("enemyPokemonImage").src = "resources/wurmple.png"
            document.getElementById("enemyName").innerText = p2.name; 
            document.getElementById("enemyLvl").innerText = "Lv " + p2.level; 
            enemyInnerHpBar.style.width = 100 + '%';
        }, 1100);        
        this.currentP = p2;

        if(this.currentP.currentHp == 0){
            setTimeout(function(){
                document.getElementById("enemyPokemonImage").src = "resources/rayquaza.png"
                document.getElementById("enemyName").innerText = p3.name; 
                document.getElementById("enemyLvl").innerText = "Lv " + p3.level;
                enemyInnerHpBar.style.width = 100 + '%';
            }, 1100);    
            this.currentP = p3;
        }
        if(this.currentP.currentHp == 0){
            console.log(this.name + " has lost the battle. " + winner.name + " wins!");
        }
    }
}

let pound = {
    moveName: "POUND",
    damage: 7,
    displayMove : function(){
        myAttack.src = "resources/pound.gif";
        setTimeout(function(){myAttack.src = "resources/placeholder.png"}, 1000);
    }
}
let peck = {
    moveName: "PECK",
    damage: 10,
    displayMove : function(){
        myAttack.src = "resources/peck.gif";
        setTimeout(function(){myAttack.src = "resources/placeholder.png"}, 1000);
    }
}
let myScratch = {
    moveName: "SCRATCH",
    damage: 8,
    displayMove : function(){
        myAttack.src = "resources/scratch.png";
        setTimeout(function(){myAttack.src = "resources/placeholder.png"}, 1000);
    }
}
let enemyScratch = {
    moveName: "SCRATCH",
    damage: 8,
    
    displayMove : function(){
        setTimeout(function(){
            enemyAttack.src = "resources/scratch.png";
            setTimeout(function(){enemyAttack.src = "resources/placeholder.png"}, 1000);
        }, 1000);
    }
}
let dragonClaw = {
    moveName: "DRAGON CLAW",
    damage: 12,
    displayMove : function(){
        setTimeout(function(){
            enemyAttack.src = "resources/dragonClaw.gif";
            setTimeout(function(){enemyAttack.src = "resources/placeholder.png"}, 1000)                    
        }, 1000);
    }
}

let treecko = new myPokemon("TREECKO", 10, myScratch);
let zigzagoon = new myPokemon("ZIGZAGOON", 7, pound);
let taillow = new myPokemon("TAILLOW", 8, peck);
let mudkip = new enemyPokemon("MUDKIP", 7, enemyScratch);
let wurmple = new enemyPokemon("WURMPLE", 6, enemyScratch);
let rayquaza = new enemyPokemon("RAYQUAZA", 70, dragonClaw);

let derek = new myTrainer("Derek", treecko, zigzagoon, taillow);
let theresa = new enemyTrainer("Theresa", mudkip, wurmple, rayquaza);

firstMoveName.innerText = treecko.move.moveName;

firstButton.addEventListener('click', function(){
    if(derek.currentP.spe >= theresa.currentP.spe){      
        derek.currentP.attack(theresa.currentP);        
        if(theresa.currentP.currentHp == 0){
            console.log(theresa.currentP.name + " fainted");
            theresa.fainted(derek);
            console.log("Theresa sent out " + theresa.currentP.name)
            return;
        }
        theresa.currentP.attack(derek.currentP);
        if(derek.currentP.currentHp == 0){
            console.log(derek.currentP.name + " fainted");
            derek.fainted(theresa);
            console.log("Derek sent out " + derek.currentP.name)
            return;
        }

    }
    else{
        theresa.currentP.attack(derek.currentP);
        if(derek.currentP.currentHp == 0){
            console.log(derek.currentP.name + " fainted");
            derek.fainted(theresa);
            if(derek.currentP.currentHp != 0){
                console.log("Derek sent out " + derek.currentP.name)
            }
            return;
        }
        derek.currentP.attack(theresa.currentP);        
        if(theresa.currentP.currentHp == 0){
            console.log(theresa.currentP.name + " fainted");
            theresa.fainted(derek);
            if(theresa.currentP.currentHp != 0){
                console.log("Theresa sent out " + theresa.currentP.name)
            }
            return;
        }
        

        // if(theresa.currentP.currentHp == 0){
        //     theresa.fainted(derek);
        // }
        // else{
        //     theresa.currentP.attack(derek.currentP);
        // }
        // if(derek.currentP.currentHp == 0){
        //     derek.fainted(theresa);
        // }
        // else{
        //     derek.currentP.attack(theresa.currentP);
        // }
    }
})