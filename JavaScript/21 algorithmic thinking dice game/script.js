const listOfAllDice =document.querySelectorAll(".die");
const scoreInputs=document.querySelectorAll("#score-options input");
const scoreSpans=document.querySelectorAll("#score-options span");
const roundElement=document.getElementById("current-round");
const rollsElement=document.getElementById("current-round-rolls"); 
const totalScoreElement=document.getElementById("total-score");
const scoreHistory=document.getElementById("score-history");
const rollDiceBtn=document.getElementById("roll-dice-btn");
const keepScoreBtn=document.getElementById("keep-score-btn");
const rulesBtn=document.getElementById("rules-btn");
const rulesContainer=document.querySelector(".rules-container");
let isModalShowing=false;
let diceValuesArr=[];
let rolls=0;
let score=0;
let round=1;


rulesBtn.addEventListener('click',()=>{
    isModalShowing=!isModalShowing;
    rulesBtn.innerText=isModalShowing?"Hide rules":"Show rules";
    rulesContainer.style.display=isModalShowing?"block":"none"; 
});

const rollDice=()=>{
    // generate the 5 random numbers then save in the list of dice and dice Values array
    for(let i=0;i<=4;i++){
        diceValuesArr[i]=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }

    [...listOfAllDice].forEach((dice,index)=>{
        dice.innerText=diceValuesArr[index];
    });
};

const updateStats=()=>{
    roundElement.innerText=round;
    rollsElement.innerText=rolls;

};
const updateRadioOption=(index,score)=>{
    scoreInputs[index].disabled=false;
    scoreInputs[index].value=score;
    scoreSpans[index].innerText=`, score = ${score}`

    
};

const updateScore=(value,id)=>{
    score+=parseInt(value);
    totalScoreElement.innerText=score;
    scoreHistory.innerHTML += `<li>${id} : ${value}</li>`;
};
const getHighestDuplicates=(array)=>{
    const counts={};
    // we search in the array element if we have duplicate values
    array.forEach((element)=>{
        //we check if exist, if don't return undefined so we take a zero
        counts[element]=(counts[element]||0)+1;
    });
    // we can search also for the highest value but we 
    // we extract only the values in a arrat
    const arrayOfValues=Object.values(counts);
    // sum of all the values of the array
    const sumArray=array.reduce((total,num)=>{return total+num},0);
    // we search in the array if we have a value grater that 4
    //repeat=arrayOfValues.find((value)=>value>=4);
    const repeat=Math.max(...arrayOfValues);
    //if it is is not gone to be undefined so we run the functions
    if(repeat===4){
        updateRadioOption(1,sumArray);
        updateRadioOption(0,sumArray);
    }
    if(repeat===3){
        updateRadioOption(0,sumArray);
    }
    updateRadioOption(5,0);
    return;
};

const detectFullHouse =(array)=>{
    const counts={};
    
    array.forEach((element)=>{
        counts[element]=(counts[element]||0)+1;
    });
    const arrayOfValues=Object.values(counts);
    if(arrayOfValues.includes(3),arrayOfValues.includes(2)){
        updateRadioOption(2,25);
    }
    else{
        updateRadioOption(5,0);
    }
    return;
};
/*
const checkForStraights =(array)=>{
    
    //array.sort((a, b) => a - b);
    for (let i = 0; i <= array.length - 4; i++) {
        if (
            array[i] + 1 === array[i + 1] &&
            array[i + 1] + 1 === array[i + 2] &&
            array[i + 2] + 1 === array[i + 3]
        ){
            if ((i + 4 < array.length) && (array[i + 3] + 1 === array[i + 4])){
                updateRadioOption(4,40);
                console.log("carlos");
            }else{
                updateRadioOption(3,30);
                console.log("alberto");
            }
            return;
        }
    }
    updateRadioOption(5,0);

}
*/
const checkForStraights = (array)=> {
    const counts ={}
    for (const num of array){
      counts[num]=counts[num]?counts[num]+1:1;
    }
    const keys=Object.keys(counts).join('');
    if(keys ==="12345"||keys==="23456"){
      updateRadioOption(4,40);
    }
    if(keys.slice(0,4)==='1234'||keys.slice(0,4)==='2345'||
    keys.slice(1,5)==='2345'||keys.slice(1,5)==='2345'){
      updateRadioOption(3,30)
    }
    updateRadioOption(5,0);
 
 };

const resetRadioOptions= ()=>{
    [...scoreInputs].forEach((scoreInput,index)=>{
        scoreInput.disabled=true;
        scoreInput.checked=false;
        scoreSpans[index].innerText="";

    });
};
const resetGame =()=>{
    diceValuesArr=[0,0,0,0,0];
    score=0;
    rolls=0;
    round=1;
    totalScoreElement.innerText=score;
    scoreHistory.innerHTML="";
    rollsElement.innerText=rolls;
    roundElement.innerText=round; 
    [...listOfAllDice].forEach((dice,index)=>{
        dice.innerText=diceValuesArr[index];
    });
    
};
rollDiceBtn.addEventListener("click", () => {
    if(rolls>=3){
        alert("You have made three rolls this round. Please select a score.");
    }else{
        rolls++;
        resetRadioOptions()
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
        detectFullHouse(diceValuesArr);
        checkForStraights(diceValuesArr);
    }
});


keepScoreBtn.addEventListener('click',()=>{
    let selectedInput=null;
    scoreInputs.forEach((input) => {
        // we can upodate this when find the first value break.
        if (input.checked) {
            selectedInput = input;
        }
    });
    if(selectedInput){
        rolls=0;
        round++;
        const value=selectedInput.value;
        const id=selectedInput.id;
        updateStats();
        resetRadioOptions();
        updateScore(value,id);
        if(round>6){
            setTimeout(() => {
                alert(`Game Over! Your total score is ${score}`);
                resetGame();
            }, 500);

            
        }
    }else{
        alert("Select a score");
    }

});
