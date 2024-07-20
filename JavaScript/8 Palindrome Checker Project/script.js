const textInput= document.getElementById("text-input");
const buttonInput =document.getElementById("check-btn");
const resultDisplay =document.getElementById("result");


/* this function review the original string for the moment only search for empty but this can change in the future and add more requirements and select an alert*/ 
const enterSearchValue=(input)=>{
  if(input===""){
    alert("Please input a value");
  }
  else{
    console.log("we have a correct value");
  }
}

/* Principal funcion to compare a palindrome*/
const palindromeComparation=(input)=>{
  let originalInput="";
  let carlos;
  //we need to remove all punctuation spaces and simbols 
  input=input.replace(/[^a-zA-Z0-9]/g, '');
  // we change the data to lower
  input=input.toLowerCase();
  originalInput=input;
  // we change the orden of the string, firt convert to char, then reverse, then create a string again
  input=input.split("").reverse().join("");
  // we made the comparation between the arrar
  return((input===originalInput)?true:false)

  
}

/* Principal funcion to display the results*/
const displayResult=(input)=>{
  //first we remove all the child if they exist with an iteration
  while (resultDisplay.firstChild) {
        resultDisplay.removeChild(resultDisplay.firstChild);
      }
  // we create a new element to add in this case a new paragraph
  const resultTextElement=document.createElement('p');
  resultTextElement.id="result-text"
  // create a new text node that we are gone to add to the element
  resultTextElement.innerHTML =`<strong>${textInput.value} </strong> is ${input?"":"not"} a palindrome`;
  // add the new element to his parrent element the container
  resultDisplay.appendChild(resultTextElement);
  // we change the display of the parent.
  resultDisplay.classList.remove("hidden"); 
}

const searchForPalindrome=()=>{
  let status=false;
  enterSearchValue(textInput.value);
  status=palindromeComparation(textInput.value);
  displayResult(status);
  
}




buttonInput.addEventListener("click",()=>{
  searchForPalindrome();
  textInput.value="";
})