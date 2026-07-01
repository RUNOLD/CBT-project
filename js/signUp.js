let fullName = document.getElementById('fullName')
let email = document.getElementById('email')
let password = document.getElementById('password')
let confirmPass = document.getElementById('confirm')
let userDatabase = JSON.parse(localStorage.getItem('cbtUsers')) ||  []
let questDatabase = JSON.parse(localStorage.getItem('questionsDatabase')) || []

function signUp(params) {
    let fullNameValue = fullName.value.trim() 
    let emailValue = email.value.trim()
    let passwordValue = password.value.trim()
    let confirmPassValue = confirmPass.value.trim()
    let foundUser = userDatabase.find((user , i , arr )=> { return user.email === emailValue  })
    
    
    if (!fullNameValue || !emailValue || !passwordValue || !confirmPassValue ) {
        alert('all fields are mandatory')
    } else if ( foundUser  ){  
       alert('user already exists')
    }
    else if (passwordValue !== confirmPassValue  ) {
       alert('passwords must match')
    } else if ( passwordValue.length < 8 ){
        alert('password must be at least 8 characters')
    } else {
        document.getElementById('signupBtn').innerHTML = 'Loading...'
        document.getElementById('signupBtn').disabled = true
      

       setTimeout(() => {
        let user = {
        fullName :  `${fullNameValue}`  ,
        email : emailValue , 
        password : passwordValue , 
       }
      userDatabase.push(user)
      localStorage.setItem('cbtUsers' , JSON.stringify(userDatabase))
      alert('sign up successful')
      document.getElementById('signupBtn').innerHTML = 'Create Account'
        document.getElementById('signupBtn').disabled = false
      
      window.location.href = './html/login.html'
       }, 3000);

   
       

    }
    
}
