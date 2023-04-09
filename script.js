const date = Date();
let currentDate=document.getElementById("currentDate");
currentDate.textContent=date.slice(0,15);
let allButtonElement=document.getElementById("allButton");
allButtonElement.style.backgroundColor="#7996a5";
allButtonElement.style.color="#fff";
let activeButtonElement=document.getElementById("activeButton");
let completedButtonElement=document.getElementById("completedButton")
let inputElement=document.getElementById("inputBox");
let activeItems=document.getElementById("activeItems");
let completedItems=document.getElementById("completedItems");
let taskCount=document.getElementById("taskCount");
let errorElement=document.getElementById("errorMessage");
let completedTaskCount=0;
let activeTaskCount=0;
let objList=[undefined,activeItems,completedItems];


function hideAll(objList,except){
    let buttonList=[allButtonElement,activeButton,completedButton];
    for(let k=0;k<objList.length;k++){
        if(objList[k]!==except){
            if(objList[k]!==undefined){
                objList[k].style.display="none";
            }
            buttonList[k].style.backgroundColor="transparent";
            buttonList[k].style.color="#8a9ca5";

        }
        else{
            if(objList[k]!==undefined){
                objList[k].style.display="block";
            }
            buttonList[k].style.backgroundColor="#7996a5";
            buttonList[k].style.color="#fff";

        }
    }
}
function displayAll(){
    hideAll(objList,undefined);
    for(let j=1;j<3;j++){
        objList[j].style.display="block";
    }

}
function displayActive(){
    hideAll(objList,activeItems);

}
function displayCompleted(){
    hideAll(objList,completedItems);
}

function createAndAppend(elementList,parentObj,textMessage){
    for(let i=0;i<elementList.length;i++){
        let createElement=document.createElement(elementList[i]);
        if(elementList[i]=="input"){
            createElement.type="checkbox";
            createElement.onclick=function(){
                if(createElement.checked===true){
                    completedItems.appendChild(parentObj);
                    parentObj.classList.add("task-completed");
                    completedTaskCount+=1;
                    activeTaskCount-=1;
                }
                else{
                    activeItems.appendChild(parentObj);
                    parentObj.classList.remove("task-completed");
                    completedTaskCount-=1;
                    activeTaskCount+=1;
                }
            };

        }
        else if(elementList[i]=="p"){
            createElement.textContent=textMessage;
            createElement.classList.add("paragraph");
        }
        else if(elementList[i]=="img"){
            createElement.src="deleteImg.svg";
            createElement.classList.add("delete-item");
            createElement.id="deleteItem"
            createElement.onclick=function(){
                let condition=parentObj.childNodes[0];
                if(condition.checked){
                    completedItems.removeChild(parentObj);
                    completedTaskCount-=1
                }
                else{
                    activeItems.removeChild(parentObj);
                    activeTaskCount-=1;
                }
                taskCount.textContent=parseInt(taskCount.textContent)-1;
                if(taskCount.textContent=='0'){
                    errorElement.style.display="grid";
                }
            }
        }
        parentObj.appendChild(createElement);
    }
    activeItems.appendChild(parentObj);
    taskCount.textContent=parseInt(taskCount.textContent)+1;
    activeTaskCount+=1;
    console.log("active tasks: "+activeTaskCount)
}


function addItem(){
    task=inputElement.value;
    if (task!==""){
        errorElement.style.display="none";
        let createListElement=document.createElement("li");
        let elementList=["input","p","img"]
        createAndAppend(elementList,createListElement,task);
        inputElement.value="";
    }
}
