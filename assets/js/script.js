const submitButton = document.getElementById('submitbutton');
const resetButton = document.getElementById('resetbutton');
const bmiValue = document.getElementById('bmivalue');
const genderMan = document.getElementById('muz');
const genderWoman = document.getElementById('zena');
const weightValue = document.getElementById('weight');
const heightValue = document.getElementById('height');
const ageValue = document.getElementById('age');
const filterButton = document.getElementById('filterbutton');
const filterValues = document.getElementById('filtervalues');
const listRoot = document.getElementById('bmiList');
const weightStatus = ['underweight', 'normalweight', 'overweight', 'obese1st', 'obese2nd', 'obese3rd'];
const listRootChildren = document.getElementsByClassName('bmicard');

let bmiEntries = [];
let entries = [];

//Delete element function after click
function deleteElement(id) {
   let entryIndex = entries.findIndex((entry) => {
       return entry.id;
   });

   entries.splice(entryIndex, 1);
   bmiEntries.splice(entryIndex, 1);
   const listRoot = document.getElementById('bmiList');
   listRoot.children[entryIndex].remove();
};


//Filtering function
function filterOptions() {
    for (entry of entries) {
        if (entry.weightstatus !== filterValues.value) {
        listRoot.children[entries.indexOf(entry)].classList.add('displayNone');
        } else {
            console.log('Look up more!')
        }
    };

};

//Function that created a new element
function createBmiCard(id, age, weight, weightStatusEntry, bmi) {
    const newBmiElement = document.createElement('li');
    newBmiElement.classList.add('bmicard');
    newBmiElement.innerHTML = ` 
     <ul class ="movie-element_info">
     <li>My id: ${id}</li> 
     <li>My age: ${age}</li>
     <li>My weight: ${weight}kg</li>
     <li>My weight status: ${weightStatusEntry}</li>
     <li>My BMI: ${bmi}</li>
     </ul>
    `;
    newBmiElement.addEventListener('click', deleteElement.bind(null, id));
    listRoot.appendChild(newBmiElement);
};

//Save all the information to the log and push the logEntry to entries Array
function writeToLog(multipliedEntry, ageValueEntry, isMan, isWoman, weightValueEntry, weightStatusEntry, bmiValueEntry) {
    const logEntry = {
        id: multipliedEntry,
        age: ageValueEntry,
        isMan: isMan,
        isWoman: isWoman,
        weight: weightValueEntry,
        weightstatus: weightStatusEntry,
        bmi: bmiValueEntry,
    };
    entries.push(logEntry);
    console.log(entries);
};

//BMI Calculation - asign also and ID for each calculation - at the end call for create card function - createBmiCard, writeToLog() and also add the result to bmiEntries Array
function bmiCalculation() {
    let result = parseInt((parseInt(weightValue.value) / ((parseInt(heightValue.value) * parseInt(heightValue.value)) / 10000)).toFixed(2)); 
    const idEntry = 1000000;
    let randomEntry = Math.random();
    let multiplied = parseInt((idEntry * randomEntry).toFixed(0));
    let weightStatusEntry = '';
if (result < 18.5) {
    bmiValue.innerText = `You are underweight. Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[0];
    } else if (result >= 18.5 && result <= 24.9) {
    bmiValue.textContent = `You are normalweight. Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[1];
} else if (result >= 25 && result <= 29.9) {
    bmiValue.textContent = `You are overweight. Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[2];    
} else if (result >= 30 && result <= 34.9) {
    bmiValue.textContent = `You are obese (1st degree). Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[3];    
} else if (result >= 35 && result <= 39.9) {
    bmiValue.textContent = `You are obese (2nd degree). Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[4];    
} else {
    bmiValue.textContent = `You are obese (3rd degree). Your BMI is: ${result}`;
    weightStatusEntry = weightStatus[5];    
} 
    
    bmiEntries.push(result);
    console.log(bmiEntries);
    writeToLog(multiplied, parseInt(ageValue.value), genderMan.checked, genderWoman.checked, parseInt(weightValue.value), weightStatusEntry, result);
    createBmiCard(multiplied, ageValue.value, weightValue.value, weightStatusEntry, result);
};

//Reset the whole calculation
function bmiCalculationReset() {
    ageValue.value= "";
    weightValue.value= "";
    heightValue.value= "";
    bmiValue.textContent = "";
};

//execute this function after click
submitButton.addEventListener('click', bmiCalculation);
resetButton.addEventListener('click', bmiCalculationReset);
filterButton.addEventListener('click', filterOptions);







