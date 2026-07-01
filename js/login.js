let userDatabase = JSON.parse(localStorage.getItem('cbtUsers'))
let email = document.getElementById('email')
let password = document.getElementById('password')
function logIn() {

    let foundUser = userDatabase.find((u, i) => u.email === email.value.trim())

    if (email.value.trim() === "" || password.value.trim() === "") {
        alert("All fields are mandatory")
    } else if (!foundUser) {
        alert('user does not exist')
    }
    else {
        document.getElementById('loginBtn').innerHTML = 'Loading....'
        document.getElementById('loginBtn').disabled = true

        setTimeout(() => {
            if (foundUser.password !== password.value.trim()) {
                alert('invalid credentials')
            } else {
                alert('sign in successful')
                let foundUserIndex = userDatabase.findIndex((user, i) => user.email === email.value.trim())
                localStorage.setItem('currentUserIndex', foundUserIndex)
                window.location.href = '../html/exam.html'
            }

            document.getElementById('loginBtn').innerHTML = 'Login & Start EXam'
            document.getElementById('loginBtn').disabled = false

        }, 3000)


    }

}
// function displayQuestions() {
//     question = questDatabase[currentQuestion]
    
//     questDatabase.forEach(question => {
//         displayQuestionsContainer.innerHTML = `
//         <div class="card-body">
//           <h2 class="question">Which of the following best describes a RESTful API?</h2>

//           <form class="options" aria-label="Answer options">
//             <div class="option">
//               <input type="radio" id="opt-a" name="answer" />
//               <label for="opt-a">
//                 <span class="choice" aria-hidden="true">A</span>
//                 <span class="opt-text">An API that uses HTTP methods and resource-oriented URLs</span>
//               </label>
//             </div>

//             <div class="option">
//               <input type="radio" id="opt-b" name="answer" />
//               <label for="opt-b">
//                 <span class="choice" aria-hidden="true">B</span>
//                 <span class="opt-text">A protocol that only supports POST requests</span>
//               </label>
//             </div>

//             <div class="option">
//               <input type="radio" id="opt-c" name="answer" />
//               <label for="opt-c">
//                 <span class="choice" aria-hidden="true">C</span>
//                 <span class="opt-text">A security standard for encrypting data in transit</span>
//               </label>
//             </div>

//             <div class="option">
//               <input type="radio" id="opt-d" name="answer" />
//               <label for="opt-d">
//                 <span class="choice" aria-hidden="true">D</span>
//                 <span class="opt-text">A database engine optimized for storing JSON</span>
//               </label>
//             </div>

//             <!-- Hidden helper for accessibility -->
//             <p class="sr-only" aria-live="polite">Select one answer option.</p>
//           </form>
//         </div>`
//     });
    
// }
// displayQuestions()