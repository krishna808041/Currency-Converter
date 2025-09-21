const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector(".msg");


for(select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// update flag 
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

//btn event listner
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate =async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if( amtVal==="" || amtVal<1 || amtVal.match(/[^0-9]/)){
        alert("Please enter a valid number (no decimals or symbols).");
        amtval=1;
        amount.value = "1";
    }
    //console.log(fromCurr,toCurr);
    let URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`
};

window.addEventListener("load",()=>{
    updateExchangeRate();
})