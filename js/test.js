let userDatabase = JSON.parse(localStorage.getItem('cbtUsers'))
let currentUserIndex = localStorage.getItem('currentUserIndex')
let user = userDatabase[currentUserIndex]
let questDatabase = JSON.parse(localStorage.getItem('questionsDatabase')) || []
let displayQuestionsContainer = document.getElementById('questionsContainer')
// let currentQuestion = 0
let displayCand = document.getElementById('candidate')

function checkUserAuth() {
  if (!user) {
    alert('unauthorized')
    window.location.href = 'login.html'
  } else {
    displayCand.innerHTML = `${user.fullName}`
  }
}
checkUserAuth()
let nextPrev = []
function display() {
  displayQuestionsContainer.innerHTML = '';



  // Use a single loop and grab the 'index' to track question numbers
  questDatabase.forEach((questions , i) => {
    i.forEach((q , index) => {
         questions.forEach((question, index) => {
      // Creating dynamic numbers (index starts at 0, so we add 1)
      let questNum = `${question.id}`;

      displayQuestionsContainer.innerHTML += `
      <div class="q-card-example" aria-label="Question ${questNum}">
  <div class="q-header-container">
    <span class="q-card-number">Q${questNum}.</span>
    <h2 class="q-card-text">${question.question}</h2>
  </div>
  
  <div class="options" role="radiogroup" aria-label="Question ${questNum} options">
    <div class="option">
      <input type="radio" id="q${questNum}-a" name="question-${questNum}" />
      <label for="q${questNum}-a"><span class="choice" aria-hidden="true">A</span>${question.optionsA}</label>
    </div>
    <div class="option">
      <input type="radio" id="q${questNum}-b" name="question-${questNum}" />
      <label for="q${questNum}-b"><span class="choice" aria-hidden="true">B</span>${question.optionsB}</label>
    </div>
    <div class="option">
      <input type="radio" id="q${questNum}-c" name="question-${questNum}" />
      <label for="q${questNum}-c"><span class="choice" aria-hidden="true">C</span>${question.optionsC}</label>
    </div>
    <div class="option">
      <input type="radio" id="q${questNum}-d" name="question-${questNum}" />
      <label for="q${questNum}-d"><span class="choice" aria-hidden="true">D</span>${question.optionsD}</label>
    </div>
  </div>
</div>`
console.log(questions);
console.log(i);
console.log(question);



  });
    })
   
  });
}
function next(i) {
  if (nextPrev <= 0)  {
    return Number(i++) 
  }
 
}
display()