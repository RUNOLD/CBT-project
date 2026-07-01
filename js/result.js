let userDatabase = JSON.parse(localStorage.getItem('cbtUsers')) || []
let currentUserIndex = localStorage.getItem('currentUserIndex')
let user = userDatabase[currentUserIndex]

let questionsDatabase = JSON.parse(localStorage.getItem('questionsDatabase')) || []
let selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {}
let userScore = JSON.parse(localStorage.getItem('userScore')) || 0

let displayCand = document.getElementById('candidate')
let resultsContainer = document.getElementById('resultsContainer')

let scoreValue = document.getElementById('scoreValue')
let correctCount = document.getElementById('correctCount')
let wrongCount = document.getElementById('wrongCount')
let unansweredCount = document.getElementById('unansweredCount')
let totalCount = document.getElementById('totalCount')
let percentValue = document.getElementById('percentValue')
let attemptStatus = document.getElementById('attemptStatus')

function checkUserAuth() {
  if (!user) {
    alert('unauthorized')
    window.location.href = 'login.html'
  } else {
    displayCand.innerHTML = `${user.fullName}`
  }
}
checkUserAuth()

function decodeHtml(html) {
  if (!html) return html;
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function displayResults() {
  let total = 0
  let correct = 0
  let wrong = 0
  let unanswered = 0

  resultsContainer.innerHTML = ""

  questionsDatabase.forEach((group, bank) => {
    group.forEach(question => {
      total++
      let studentAnswer = selectedAnswers[`${bank}-${question.id}`]

      let statusClass = ""
      let statusText = ""
      let displayStudentAnswer = studentAnswer || "Not Answered"

      if (!studentAnswer) {
        unanswered++
        statusClass = "unanswered"
        statusText = "Unanswered"
      } else if (studentAnswer === decodeHtml(question.answer)) {
        correct++
        statusClass = "correct"
        statusText = "Correct"
      } else {
        wrong++
        statusClass = "wrong"
        statusText = "Wrong"
      }

      resultsContainer.innerHTML += `
        <div class="card">
          <div class="card-head">
            <span class="q-label">Question ${question.id}</span>
            <span class="badge ${statusClass}">${statusText}</span>
          </div>
          <div class="card-body">
            <p class="question-text">${question.question}</p>
            <div class="kv">
              <div class="row">
                <span class="k">Your Answer:</span>
                <span class="v options-line">${displayStudentAnswer}</span>
              </div>
              <div class="row">
                <span class="k">Correct Answer:</span>
                <span class="v options-line">${question.answer}</span>
              </div>
            </div>
          </div>
        </div>
      `
    })
  })

  let accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

  scoreValue.innerHTML = correct
  correctCount.innerHTML = correct
  wrongCount.innerHTML = wrong
  unansweredCount.innerHTML = unanswered
  totalCount.innerHTML = total
  percentValue.innerHTML = accuracy + "%"

  if (accuracy >= 50) {
    attemptStatus.innerHTML = "Passed"
    attemptStatus.style.color = "var(--success)"
  } else {
    attemptStatus.innerHTML = "Failed"
    attemptStatus.style.color = "var(--danger)"
  }
}
displayResults()
