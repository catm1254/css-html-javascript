const userInput=document.getElementById('user-input');
const checkButton=document.getElementById('check-btn');
const clearButton=document.getElementById('clear-btn');
const resultsDisplay=document.getElementById('results-div');


const checkValidInput=(input)=>{

  if(input===""){
    window.alert('Please provide a phone number');
    return;
  }
  //al inicio un 1, despues un espacio en blanco o tab, el ? puede ser que este o no este y el ultimo ? que todo el conjunto es opcional.
  const regExpContryCode='^(1\\s?)?';
  // son 3 digitos entre parentesis o 3 digitos sin parentesis.
  const regExpAreaCode='(\\(\\d{3}\\)|\\d{3})';
  // puede existir un espacio o un guion medio o nada.
  const regExpSpace ='([\\s-]?)';
  const regExpFirstThree='\\d{3}';
  //cuatro digitos al final y termina la cadena $ no puede existir nada mas
  const regExpLastFour='\\d{4}$'
  const regExpFinalPhone= new RegExp(`${regExpContryCode}${regExpAreaCode}${regExpSpace}${regExpFirstThree}${regExpSpace}${regExpLastFour}`);
  // exprecion regular escrita directamente mas eficiente pero menos entendible y modificable cambiar en el futuro si queremos optimizar
  //const regExpFinalPhone = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  //guardamos el resultado de la exprecion regular para no estar consultando cada vez
  const regExpMatch=regExpFinalPhone.test(input);
  //creamos un elemento tipo p
  const textResult= document.createElement('p');
  // agregamos la clase en la que aparece el formato para el texto de respuesta
  textResult.className='result-text-answer';
  //cambiamos el color del texto dependiendo de la respuesta a la exprecion regular
  regExpMatch?(textResult.style.color='green'):(textResult.style.color='red');
  // agregamos el nodo de texto al parrafo agregando las letras valiudo o invalido asi como el numero
  textResult.appendChild(document.createTextNode(`${regExpMatch?'Valid':'Invalid'} US number: ${input}`));
  // agregamos al DOM el parrafo a la div donde esperamos el resultado del texto
  resultsDisplay.appendChild(textResult);
}








checkButton.addEventListener('click',()=>{
  checkValidInput(userInput.value);
  userInput.value="";
});

clearButton.addEventListener('click',()=>{
  resultsDisplay.textContent='';
});