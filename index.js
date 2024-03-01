const lengthslider = document.getElementById("lengthslider")
const lengthValDisplay = document.getElementById("lengthdisplay")
const customLengthCheckBox = document.getElementById("defaultlengthchbx")
const sliderDiv = document.querySelector(".lengthvaluedisplay")
const generatePasswdBtn = document.querySelector(".generateBtn")
const specialCharCheckBox = document.getElementById("specialcharscheckbox")
const passwordTextBox = document.getElementById("displaypassword")
const copyButton = document.getElementById("copyicon")

let isCustomLengthApplied = false
let isSpecialCharIncluded = false
let numberOfPasswords = 1

sliderDiv.style.visibility = "hidden"
copyButton.style.visibility = "hidden"

specialCharCheckBox.addEventListener('change', function(e){
    e.preventDefault()
    if(e.target.checked) {
        isSpecialCharIncluded = true
        passwordTextBox.value = ""
    } else if(!e.target.checked) {
        isSpecialCharIncluded = false
        passwordTextBox.value = ""
    }
})

customLengthCheckBox.addEventListener('change', function(e){
    console.log(e.target.checked)
    if(e.target.checked){
        sliderDiv.style.visibility = "visible"
        isCustomLengthApplied = true
        passwordTextBox.value = ""
        lengthslider.value = 0
        lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
        lengthOfPassword = lengthslider.value
    } else if(!e.target.checked) {
        sliderDiv.style.visibility = "hidden"
        isCustomLengthApplied = false
        lengthOfPassword = 10
        passwordTextBox.value = ""
    }
})

if(!customLengthCheckBox.checked) {
    lengthOfPassword = 10 // using default password length when customlength is not applied
    console.log(lengthOfPassword)
}

lengthslider.addEventListener('input', function(){
    lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
    lengthOfPassword = lengthslider.value
})
        
lengthslider.addEventListener('click', function(){
    lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
    lengthOfPassword = lengthslider.value
    passwordTextBox.value = ""
})

generatePasswdBtn.addEventListener('click', function(){
    // generate password and set inside input text box
    generatePassword(isSpecialCharIncluded, isCustomLengthApplied,lengthOfPassword)
    copyButton.style.visibility = "visible"
})

//functionality for copying the generated password using the clipboard API

copyButton.addEventListener('click', function(){
    
    const textToCopy = passwordTextBox.value
    
    if(passwordTextBox.value) {
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Text Copied To Clipboard successfully!")
            alert("Text Copied To Clipboard successfully!")
        })
        .catch(error => {
            console.log("Error copying password: ", error)
            alert("Could'nt copy the generated password. Generate again and try.")
        });   
    } else {
        alert("Password was not generated. Please try again.")
    }
})


function generatePassword(isSpecialCharIncluded, isCustomLengthApplied, lengthOfPassword) {

    let password = ''
    let allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if(lengthOfPassword!=0) {
        if(isSpecialCharIncluded && !isCustomLengthApplied) {

            // password should include special chars and should be of default length 10
                allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?'
                password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
                passwordTextBox.value = password
    
        } else if(!isSpecialCharIncluded && isCustomLengthApplied) {
    
            // password should not include special chars and should be of custom length
                allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
                passwordTextBox.value = password
    
        } else if(!isSpecialCharIncluded && !isCustomLengthApplied) {
    
            // password should not include special chars and should be of default length 10
            allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
            passwordTextBox.value = password
    
        } else if(isSpecialCharIncluded && isCustomLengthApplied) {
    
            // password should include special chara and should be of custom length
            allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?'
            password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
            passwordTextBox.value = password
        }
    } else {
        // show error message
        const errorDisplayElemet = document.createElement('p')
        errorDisplayElemet.style.color = "rgb(255, 131, 131)"
        errorDisplayElemet.innerText = "Password Length cannot be 0"
        errorDisplayElemet.style.fontSize = "20px"

        document.querySelector(".container").appendChild(errorDisplayElemet)

        setTimeout(function(){
            errorDisplayElemet.remove()
        },2000)
    }

    return password;
} 

function makePasswordFromSpecificValueDictionary(charDictionary, lengthOfPassword) {

    let result = ''
    for (let index = 0; index < lengthOfPassword; index++) {
        let randomIndex = Math.floor(Math.random() * charDictionary.length)
        let element = charDictionary[randomIndex]
        result += element
    }
    return result

}

