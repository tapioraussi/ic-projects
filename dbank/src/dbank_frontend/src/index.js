import { UpdateCallRejectedError } from "@dfinity/agent";
import {dbank_backend} from "../../declarations/dbank_backend"

window.addEventListener("load", async function(){
  console.log("Finished loading");
  await update();
})

document.querySelector("form").addEventListener("submit",async function(event){
  event.preventDefault();
  //console.log("Submitted");
  const button = event.target.querySelector("#submit-btn");

  const inputAmmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmmount = parseFloat(document.getElementById("withdrawal-amount").value);
  
  button.setAttribute("disabled",true);
  if(document.getElementById("input-amount").value.length != 0)
  {
    await dbank_backend.topUp(inputAmmount);
  }
  if(document.getElementById("withdrawal-amount").value.length != 0)
  {
    await dbank_backend.whitdrawl(outputAmmount);
  }
  
  await dbank_backend.compound();
  await update();

  document.getElementById("input-amount").value="";
  document.getElementById("withdrawal-amount").value="";
  button.removeAttribute("disabled");
});

async function update()
{
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText=Math.round(currentAmount*100)/100;
}