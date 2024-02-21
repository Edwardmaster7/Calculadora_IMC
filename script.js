// variables
const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')
let height = 0
let weight = 0

$(document).ready(function() {
    
    // Stores the values on variables
    function handleInput() { 
        weight = Number(inputWeight.value.replace(",", "."))
        height = (inputHeight.value / 100)
        // console.log(inputHeight.value)
    }

    function BMI() {
        let result = weight / (height * height)
        // console.log(result)
        return result
    }

    displayCard = (message, result) => {
        toggleCard = () => {
            $(".modal-card").toggleClass("slide-top")
            $(".modal-wrapper").toggleClass("open")
            $(".container").addClass("text-blur-out")
        }
        toggleCard()
        // console.log(message)
        $(".value").text(result.toFixed(2).replace('.', ','))
        $(".text").text(message)
        $(".close").focus()
        $(".close").click(() => {
            toggleCard()
            location.reload(true, function () {
                $(".container").removeClass("text-blur-out")
            })
        })
        }


    function displayResult() {
        let result = BMI()
        console.log(result)

        if (result < 18.5) {
            displayCard('Você está abaixo do peso ideal', result)
        } else if (result >= 18.5 && result <= 24.9) {
            displayCard('Você está em seu peso ideal', result)
        } else if (result >= 25 && result <= 29.9) {
            displayCard('Você está com sobrepeso', result)
        } else if (result >= 30 && result <= 34.9) {
            displayCard('Você está com obesidade', result)
        } else if (result >= 35 && result <= 39.9) {
            displayCard('Você está com obesidade severa', result)
        } else if (result >= 40) {
            displayCard('Você está com obesidade crítica', result)
        }
    }

    function handleSubmit(event) {
        const containsLetters = (str) =>  /([a-z])\w*/g.test(str)
        console.log(1)

        const testing = containsLetters(inputWeight.value)

        if (testing === true) {
            event.preventDefault()

            $(".error-alert").removeClass("hide")
            inputWeight.focus()
            $("#weight").toggleClass("shake-horizontal")
            
            console.log(2)
            console.log(`${inputWeight}, ${onlyContainsNumbers(inputWeight)}`)
        } else {
            $(".error-alert").addClass("hide")
            console.log(3)

            handleInput()
            event.preventDefault()

            console.log(`weight=${weight}; height=${height}`)
            displayResult()
        }
    }

    $(".card").toggleClass("slide-in-blurred-bottom")
    form.onsubmit = handleSubmit
})