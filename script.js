let base_url="https://v6.exchangerate-api.com/v6/09c64ddb5f1faa584f3647cf/latest";

let btn=document.querySelector("form .submit");
let msg=document.querySelector(".msg")

let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");

let amount=document.querySelector(".head input");

let select=document.querySelectorAll(".select-cont select")

for(key of select){
    for(curcode in countryList){
        let newop=document.createElement("option")
        newop.innerHTML=curcode
        newop.value=curcode
        if(key.name==="from" && curcode==="USD" ){
            newop.selected="selected";
        } else if(key.name==="to" && curcode==="INR" ){
            newop.selected="selected";
        }
        key.append(newop)
    }

    key.addEventListener("change" ,(elem)=>{
            updateflag(elem.target)
    })
}

//function for interchange value of from and to
document.querySelector(".change").addEventListener("click",(e)=>{
  e.preventDefault();

  let temp=fromcurr.value;
  fromcurr.value=tocurr.value;
  tocurr.value=temp;

  updateflag(fromcurr)
  updateflag(tocurr)

})

//function for change flag 
function updateflag(obj){
  let currcode=obj.value;
  let countrycode=countryList[currcode]

let img=obj.parentElement.querySelector("img")

  img.src=`https://flagsapi.com/${countrycode}/flat/64.png`
  
}

//adding evenlistener to exchange button
btn.addEventListener("click",(elem)=>{
elem.preventDefault()

if(amount.value>0){
  fetchapi(); 
}else{
  amount.value=1;
}

})

//function that fetch currency API and return value
async function fetchapi(){

  msg.innerHTML="<span>Getting Exchange Rate.... </span>";
  let amtval=amount.value;
  
  let url=`${base_url}/${fromcurr.value}`;
  
  fetch(url).then(resp=>resp.json()).then(rate=> {
    let exrate=rate.conversion_rates[tocurr.value];
    let finalamt=exrate*amtval;
  
   msg.innerHTML=`${amtval} <span> ${fromcurr.value}</span>  =   ${finalamt} <span>${tocurr.value}</span>`;
  
  }).catch(()=>{
      msg.innerHTML="<span>Somthing went wrong.check you internet connection";

  });
  
  
}

// // fetch api by async await
// let url=`${base_url}/${fromcurr.value}`;
    // let resp= await fetch(url);
    // let data=await resp.json();
    // // let rate=data['conversion_rates'][tocurr.value]
    // let exrate=data.conversion_rates[tocurr.value];
    // let finalamt= amtval * exrate ;
    // msg.innerHTML=`${amtval} <span> ${fromcurr.value}</span>  =   ${finalamt} <span>${tocurr.value}</span>`;