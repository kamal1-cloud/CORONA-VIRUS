const testBtn = document.getElementById('start-btn');
const partieQuestions = document.getElementById('container');
const preambule = document.getElementById('pre-info');
var scroll = document.querySelectorAll('.stepper h1');
const nextBtn = document.getElementById('next-btn');
const question = document.getElementById('nextQuestion');
const selectInputs = document.querySelector('.answer-inputs');
const previousBtn = document.getElementById('back-btn');
const progressBar = document.getElementsByClassName('progress');
const serialPlus = document.querySelector('.question-number');
const bar = document.querySelector('.bar');

testBtn.addEventListener('click', startTest);
 nextBtn.addEventListener('click',nextQuetion);
 selectInputs.addEventListener('change',typeOfButton);

function startTest(){
    testBtn.classList.add('hide');
    preambule.classList.add('hide');
    partieQuestions.classList.remove('hide');
    scroll[0].classList.remove('sta-sec')
    scroll[1].classList.add('sta-sec')
    availableQuesions = [...questions];
    nextBtn.disabled=true;

    controlButtons()
}

let questions = [];
let availableQuesions = [];
// fetch("questions.json")
// .then(res => {
//     return res.json();
// })
// .then(loadeQuestions => {
//     console.log(loadeQuestions);
//     questions = loadeQuestions;
//     startTest()
// })
// .catch(err => {
//     console.error(err);
// });
var url = "  http://localhost:3000/questions";

fetch(url)
.then((Response) => Response.json()) //json JSON 
  
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

// //--------------------------next_Question-----------------------:

function nextQuetion(){

    questionIndex++
    showQuestion( questions[questionIndex])
    progressButtons(questionIndex)

    nextBtn.disabled=true;

    controlButtons()

 }

// //-----------------------------how to show questions----------------------

function showQuestion(questions){

    question.innerText=questions.question
    selectInputs.innerHTML = ''

    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `<div>
        <input type="radio"  name="choiX" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        selectInputs.innerHTML=` <input type="number"  id="${questions.input.name}"
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }

}

// //-------------------------previous_question----------------------------:

previousBtn.addEventListener('click',()=>{

    questionIndex--
     
    showQuestion( questions[questionIndex])

    progressButtons(questionIndex)

    nextButton.disabled=true 

    controlButtons()
})

// //---------------------------next_Question-----------------------:

function nextQuetion(){

    questionIndex++
    showQuestion( questions[questionIndex])
    progressButtons(questionIndex)

    nextButton.disabled=true;

    controlButtons()

 }

// //-----------------------------how to show questions----------------------

function showQuestion(questions){

    question.innerText=questions.question
    selectInputs.innerHTML = ''

    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `<div>
        <input type="radio"  name="chois" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${ answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        selectInputs.innerHTML=` <input type="number"  id="${questions.input.name}"
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }

}

// //-------------------------previous_question----------------------------:

var questionIndex;
previousBtn.addEventListener('click',()=>{

    questionIndex--
     
    showQuestion( questions[questionIndex])

    progressButtons(questionIndex)

    nextButton.disabled=true 

    controlButtons()
})

// //---------------------controle_progressbar----------------------:

function progressButtons(number){

    const addNumber = number + 1 ;
    serialPlus.innerHTML= addNumber ;

    bar.style.width =`calc(${addNumber}*calc(100%/22))` 

}

// //----------------------------inclickuble & clickable button--------------:
function typeOfButton(event){

    const input=event.target
 
    if (input.type === 'number') {

        const number = parseFloat(input.value)
                    
        if (number >= input.min && number <= input.max) {

            nextBtn.disabled = false
        } else {
            nextBtn.disabled = true

        }

        } else {

        nextButton.disabled = false
    }

}

function controlButtons(){

    if(questionIndex===0){

        previousBtn.classList.add('visibility')

    }else{

        previousBtn.classList.remove('visibility')

    }
}