const lengthslider = document.getElementById("lengthslider")
const lengthValDisplay = document.getElementById("lengthdisplay")
const customLengthCheckBox = document.getElementById("defaultlengthchbx")
const sliderDiv = document.querySelector(".lengthvaluedisplay")
const generatePasswdBtn = document.querySelector(".generateBtn")
const specialCharCheckBox = document.getElementById("specialcharscheckbox")
const passwordTextBox = document.getElementById("displaypassword")
const copyButton = document.getElementById("copyicon")
const passwordCountDropdown = document.querySelector(".countOfPass")
const dropDownValues = document.getElementsByClassName('count')
let allPasswords = new Array(0)

let isCustomLengthApplied = false
let isSpecialCharIncluded = false


let numberOfPasswords = 1
let lengthOfPassword = Number(10)

passwordCountDropdown.addEventListener('change', function(e){
    numberOfPasswords = e.target.value
    if(allPasswords.length != 0) {
        allPasswords = []
        passwordTextBox.value = ''
    }
    console.log(allPasswords) 
})

console.log(numberOfPasswords)

sliderDiv.style.visibility = "hidden"
copyButton.style.visibility = "hidden"

specialCharCheckBox.addEventListener('change', function(e){
    e.preventDefault()
    if(e.target.checked) {
        isSpecialCharIncluded = true
        passwordTextBox.value = ""
        allPasswords = []
        console.log(allPasswords)
    } else if(!e.target.checked) {
        isSpecialCharIncluded = false
        passwordTextBox.value = ""
        allPasswords = []
        console.log(allPasswords)
    }
})

customLengthCheckBox.addEventListener('change', function(e){
    console.log(e.target.checked)
    if(e.target.checked){
        sliderDiv.style.visibility = "visible"
        isCustomLengthApplied = true
        passwordTextBox.value = ""
        allPasswords = []
        console.log(allPasswords)
        lengthslider.value = 0
        lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
        lengthOfPassword = Number(lengthslider.value)
    } else if(!e.target.checked) {
        sliderDiv.style.visibility = "hidden"
        isCustomLengthApplied = false
        lengthOfPassword = Number(10)
        passwordTextBox.value = ""
        allPasswords = []
        console.log(allPasswords)
    }
})

if(!customLengthCheckBox.checked) {
    lengthOfPassword = Number(10) // using default password length when customlength is not applied
    console.log(lengthOfPassword)
}

lengthslider.addEventListener('input', function(){
    lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
    lengthOfPassword = Number(lengthslider.value)
})
        
lengthslider.addEventListener('click', function(){
    lengthValDisplay.textContent = `Password Length: ${lengthslider.value}`
    lengthOfPassword = Number(lengthslider.value)
    passwordTextBox.value = ""
    allPasswords = []
    console.log(allPasswords)
})

generatePasswdBtn.addEventListener('click', function(){
    // generate password and set inside input text box
    console.log(`Length: ${lengthOfPassword}`)
    if(lengthOfPassword!=0) {
        allPasswords = []
        let pswd = ""
        for (let index = 0; index < numberOfPasswords; index++) {
            pswd = generatePassword(isSpecialCharIncluded, isCustomLengthApplied,lengthOfPassword)
            allPasswords.push(pswd)
        }
        populateGeneratedPasswordsInTextArea(allPasswords)
        console.log(allPasswords)
        copyButton.style.visibility = "visible"
    } else if(isCustomLengthApplied && lengthOfPassword === 0) {
        // show error message
        console.log(`Length: ${lengthOfPassword}`)
        const errorDisplayElemet = document.createElement('p')
        errorDisplayElemet.style.color = "rgb(255, 131, 131)"
        errorDisplayElemet.innerText = "Password Length cannot be 0"
        errorDisplayElemet.style.fontSize = "20px"

        document.querySelector(".container").appendChild(errorDisplayElemet)

        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });

        setTimeout(function(){
            errorDisplayElemet.remove()
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
        },2000)
    }
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
                allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;<>?'
                password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
                // passwordTextBox.value = password
    
        } else if(!isSpecialCharIncluded && isCustomLengthApplied) {
    
            // password should not include special chars and should be of custom length
                allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
                // passwordTextBox.value = password
    
        } else if(!isSpecialCharIncluded && !isCustomLengthApplied) {
    
            // password should not include special chars and should be of default length 10
            allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
            // passwordTextBox.value = password
    
        } else if(isSpecialCharIncluded && isCustomLengthApplied) {
    
            // password should include special chara and should be of custom length
            allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;<>?'
            password = makePasswordFromSpecificValueDictionary(allowedChars, lengthOfPassword)
            // passwordTextBox.value = password
        }
    } 
    // else {
    //     // show error message
    //     const errorDisplayElemet = document.createElement('p')
    //     errorDisplayElemet.style.color = "rgb(255, 131, 131)"
    //     errorDisplayElemet.innerText = "Password Length cannot be 0"
    //     errorDisplayElemet.style.fontSize = "20px"

    //     document.querySelector(".container").appendChild(errorDisplayElemet)

    //     setTimeout(function(){
    //         errorDisplayElemet.remove()
    //     },2000)
    // }

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

function populateGeneratedPasswordsInTextArea(allPasswords) {
    let pswdString = ''
    allPasswords.forEach(element => {
        pswdString += element + "\n"
    });
    passwordTextBox.value = pswdString
}

