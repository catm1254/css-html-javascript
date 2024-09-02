let price = 3.26;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
  ];
const displayChangeDue=document.getElementById("change-due");
const cash= document.getElementById("cash");
const purchaseBtn=document.getElementById("purchase-btn");
const displayScreenChange=document.getElementById("display-screen-change");
const displayScreenRegister=document.getElementById("screen-register");

// function to update the displayChangeDue, with the status of the register = open/close and the change to deliver to the costumer
const formatResults = (status, change) => {
    displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
    change.map(
        money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );
    return;
};
// function to calculate the change of from the costumer
const calculateChange=(cash)=>{
    let ChangeToCalculate=cash-price;
    let result = { status: 'OPEN', change: [] };
    // we calculate this because we want to giv higher change and then small
    const denominations=[100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    let reverseCid=[...cid].reverse();
    
    // we calculate the amount of money in the register
    let totalRegister=parseFloat(reverseCid.map(element=>element[1]).reduce((prev,current)=>prev+current).toFixed(2));
    console.log(totalRegister);
    // we check if we have enough money in the register
    if(totalRegister<ChangeToCalculate){
        displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        return;
    }

    if (totalRegister === ChangeToCalculate) {
        result.status = 'CLOSED';

    }

    for (let i = 0; i <= reverseCid.length; i++) {
        if (ChangeToCalculate >= denominations[i] && ChangeToCalculate  > 0) {
            let count = 0;
            let total = reverseCid[i][1];// total amount of the denomination in the register
            while (total > 0 && ChangeToCalculate  >= denominations[i]) {
                total -= denominations[i];
                ChangeToCalculate = parseFloat((ChangeToCalculate -= denominations[i]).toFixed(2));// we substract from the change the calculate the money subtract from the register
                count++;
            }
            if (count > 0) {// this is the amount of money that we subtract from the register
                result.change.push([reverseCid[i][0], count * denominations[i]]);// we push to the array of the money to deliver multiply by units to deliver
            }
        }
    }
    if (ChangeToCalculate > 0) {
        return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');//we have the money, but not in the correct denominations
    }
    formatResults(result.status, result.change);
    // we update the status of the change in the register and also the cid vector that have the count of the money in the register
    UpdateRegister(result.change);
};

// function to check if the Costumer have money for the transaction
const checkCashRegister=(cash)=>{
    
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
        cash.value = '';
        return;
        }
        if(cash === price) {
            displayChangeDue.innerHTML =
            '<p>No change due - customer paid with exact cash</p>';
            cash.value = '';
        return;
        }
    calculateChange(cash);
    return;
};
//function to check if we increase a positive number 
const checkChangeAmount=()=>{
    // we review that we introduce a number
    const cashValue=Number(cash.value);
    if(cashValue>0&&cashValue!==NaN){
        checkCashRegister(cashValue);
    }
    else{
        console.log("ingrese un numero mayor a cero");
    }
};


//function to update the screen of the register and also update the total amount of money in the cid array after deliver change.
const UpdateRegister=(update)=>{
   
    const relationNameRegister=new Map([
        ['PENNY', 'Pennies'],
        ['NICKEL', 'Nickels'],
        ['DIME', 'Dimes'],
        ['QUARTER', 'Quarter'],
        ['ONE', 'Ones'],
        ['FIVE', 'Fives'],
        ['TEN', 'Tens'],
        ['TWENTY', 'Twenties'],
        ['ONE HUNDRED','Hundreds']
    ]);

    // we update the change in the array cid, money in the register compare with the update array
    if(update){
        update.forEach(changeArr => {
            const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
            // we subtract from the register the cash deliver based on the index
            targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
          });
    }
    // we delete the value increase by the costumer
    cash.value="";
    displayScreenRegister.textContent=`Total$${price}`;
    // we extract the information of the current change and save in a string
    const stringResult=cid.map((denominations)=>{
        return`<p>${relationNameRegister.get(denominations[0])} $${denominations[1]}</p>`
    }).join("");
    displayScreenChange.innerHTML=`
    <p style="font-weight: bold;">Change in drawer:</p>
    ${stringResult}`;
};
cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        checkChangeAmount();
    }
  });

purchaseBtn.addEventListener('click',checkChangeAmount);
UpdateRegister();
