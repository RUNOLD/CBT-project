let userDatabase = JSON.parse(localStorage.getItem('cbtUsers'))
let currentUserIndex = localStorage.getItem('currentUserIndex')
let user = userDatabase[currentUserIndex]
let questDatabase = JSON.parse(localStorage.getItem('questionsDatabase')) || []
let displayQuestionsContainer = document.getElementById('questionsContainer')
let currentQuestionBank = 0
let displayCand = document.getElementById('candidate')
let selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {}

function decodeHtml(html) {
  if (!html) return html;
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function checkUserAuth() {
  if (!user) {
    alert('unauthorized')
    window.location.href = 'login.html'
  } else {
    displayCand.innerHTML = `${user.fullName}`
  }
}

checkUserAuth()

function display() {

  displayQuestionsContainer.innerHTML = ""

  let questions = questDatabase[currentQuestionBank]

  questions.forEach((question, index) => {

    let questNum = question.id

    displayQuestionsContainer.innerHTML += `
<div style="background:#fff; width:90%; max-width:800px; margin:20px auto; padding:25px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,.08);">

    <div style="display:flex; align-items:center; margin-bottom:20px;">
        <span style="background:#2563eb; color:#fff; padding:6px 14px; border-radius:20px; font-size:14px; font-weight:bold;">
            Question ${questNum}
        </span>
    </div>

    <h2 style="margin:0 0 25px; font-size:22px; font-weight:600; line-height:1.5; color:#222;">
        ${question.question}
    </h2>

    <label for="q${questNum}-a" style="display:flex; align-items:center; gap:15px; padding:15px; margin-bottom:12px; border:1px solid #ddd; border-radius:10px; cursor:pointer;">
        <input
type="radio"
value="${question.optionsA}"
id="q${questNum}-a"
name="question-${currentQuestionBank}-${questNum}"
onclick="saveAnswer(${currentQuestionBank},${questNum},this.value)"
${selectedAnswers[`${currentQuestionBank}-${questNum}`] === decodeHtml(question.optionsA) ? "checked" : ""}
>
        <span style="font-weight:bold; color:#2563eb;">A.</span>
        <span>${question.optionsA}</span>
    </label>

    <label for="q${questNum}-b" style="display:flex; align-items:center; gap:15px; padding:15px; margin-bottom:12px; border:1px solid #ddd; border-radius:10px; cursor:pointer;">
        <input
type="radio"
value="${question.optionsB}"
id="q${questNum}-b"
name="question-${currentQuestionBank}-${questNum}"
onclick="saveAnswer(${currentQuestionBank},${questNum},this.value)"
${selectedAnswers[`${currentQuestionBank}-${questNum}`] === decodeHtml(question.optionsB) ? "checked" : ""}
>
        <span style="font-weight:bold; color:#2563eb;">B.</span>
        <span>${question.optionsB}</span>
    </label>

    <label for="q${questNum}-c" style="display:flex; align-items:center; gap:15px; padding:15px; margin-bottom:12px; border:1px solid #ddd; border-radius:10px; cursor:pointer;">
        <input
type="radio"
value="${question.optionsC}"
id="q${questNum}-c"
name="question-${currentQuestionBank}-${questNum}"
onclick="saveAnswer(${currentQuestionBank},${questNum},this.value)"
${selectedAnswers[`${currentQuestionBank}-${questNum}`] === decodeHtml(question.optionsC) ? "checked" : ""}
>
        <span style="font-weight:bold; color:#2563eb;">C.</span>
        <span>${question.optionsC}</span>
    </label>

    <label for="q${questNum}-d" style="display:flex; align-items:center; gap:15px; padding:15px; border:1px solid #ddd; border-radius:10px; cursor:pointer;">
        <input
type="radio"
value="${question.optionsD}"
id="q${questNum}-d"
name="question-${currentQuestionBank}-${questNum}"
onclick="saveAnswer(${currentQuestionBank},${questNum},this.value)"
${selectedAnswers[`${currentQuestionBank}-${questNum}`] === decodeHtml(question.optionsD) ? "checked" : ""}
>
        <span style="font-weight:bold; color:#2563eb;">D.</span>
        <span>${question.optionsD}</span>
    </label>

</div>
`;

  })
  
}
function saveAnswer(bank,id,answer){
  console.log(bank, id, answer)

    selectedAnswers[`${bank}-${id}`] = answer

    localStorage.setItem("selectedAnswers",JSON.stringify(selectedAnswers)
    )

}

function submit(){

    let score = 0

    questDatabase.forEach((group,bank)=>{

        group.forEach(question=>{

            let studentAnswer =
            selectedAnswers[`${bank}-${question.id}`]

            if(studentAnswer === decodeHtml(question.answer)){

                score++

            }

        })

    })

    localStorage.setItem("userScore",JSON.stringify(score))

    alert(`Score : ${score}`)

    window.location.href="../html/results.html"

}
function next() {

  if (currentQuestionBank < questDatabase.length - 1) {

    currentQuestionBank++

    display()

  }

}

function previous() {
  if (currentQuestionBank > 0) {
    currentQuestionBank--
    display()
  }
}


display()
// localStorage.clear()