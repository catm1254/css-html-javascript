const numberInput= document.getElementById("number");
const buttonInput =document.getElementById("convert-btn");
const resultDivision =document.getElementById("output");
const resultSection =document.getElementById("section-output");

const states = {
    normalState:'A',
    emptyNumber:'B',
    negativeNumber:'C',
    limitHighNumber:'D'
};
// this function check the limits of the input, positive negative and also empty and return a state variable defined in global variable states
const reviewInput=(numberVar)=>{
    
    // we check that the number was type i will like to have one return and a state variable, but i don't know what is more efficient
    if(isNaN(numberVar))
    {
        return states.emptyNumber;
    }else if(numberVar<=0)
    {
        return states.negativeNumber;
    }else if(numberVar>=4000)
    {
        return states.limitHighNumber;
    }
    else{
        return states.normalState;
    }
}

const convertNumberToRoman=(numberVar)=>{
    // array of object with symbol and value of the Roman Characters
    const romanNumberValue = [
        { symbol: 'M', value: 1000 },
        { symbol: 'CM', value: 900 },
        { symbol: 'D', value: 500 },
        { symbol: 'CD', value: 400 },
        { symbol: 'C', value: 100 },
        { symbol: 'XC', value: 90 },
        { symbol: 'L', value: 50 },
        { symbol: 'XL', value: 40 },
        { symbol: 'X', value: 10 },
        { symbol: 'IX', value: 9 },
        { symbol: 'V', value: 5 },
        { symbol: 'IV', value: 4 },
        { symbol: 'I', value: 1 }
    ];
    const result = [];
    // we iterate in each element then review id the numberValue is greater or equal if it is we add the string result and rest to the number
    romanNumberValue.forEach(element => {
        while(numberVar>=element.value){
            result.push(element.symbol)
            numberVar-=element.value
        }
    });
    // we convert the array to a string to be use in the plot
    return result.join("");
}

function displayFunction(state,romanString){
// state variable selection of display

// we remove all children of our display element

while (resultDivision.firstChild) {
    resultDivision.removeChild(resultDivision.firstChild);
  }
  const resultTextElement=document.createElement('p');
  resultTextElement.id="result-text"

switch(state){
    case 'A':
        resultDivision.classList.remove("warning");
        resultSection.classList.remove("warning");
        resultTextElement.innerHTML =`${romanString}`;
    break
    case 'B':
        resultDivision.classList.add("warning");
        resultSection.classList.add("warning");
        resultTextElement.innerHTML =`Please enter a valid number`;

    break;
    case 'C':
        resultDivision.classList.add("warning");
        resultSection.classList.add("warning");
        resultTextElement.innerHTML =`Please enter a number greater than or equal to 1.`;

    break;
    case 'D':
        resultDivision.classList.add("warning");
        resultSection.classList.add("warning");
        resultTextElement.innerHTML =`Please enter a number less than or equal to 3999.`;
    break;

    default:

    break;

}
resultDivision.appendChild(resultTextElement);
resultDivision.classList.remove("hidden");
resultSection.classList.remove("hidden");
}
// main function used to convert numbers
function convertToRoman(){
let stateVariable=[];//initial state variable
const numberInputVar=parseInt(numberInput.value);
const romanNumber=[];
// review if we have an empty number and check the limits
stateVariable=reviewInput(numberInputVar);
// we need to implement the conversion from number to a roman if the state variable is find
if(stateVariable==='A'){
    romanNumber.push(convertNumberToRoman(numberInputVar));
}

console.log(stateVariable,romanNumber);

// display function based on the different states
displayFunction(stateVariable,romanNumber);

    return;
}









buttonInput.addEventListener("click",()=>{
    convertToRoman();
    numberInput.value="";
})