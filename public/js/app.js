//THis code is running in client side browser

const data = fetch("http://puzzle.mead.io/puzzle") //fetch returns a promise
data.then(res => {
    return res.json() //this returns a promise which could be fulfilled with a value
}).then(res => {
    console.log(res)
    console.log("FETCH REQ COMPLETED")
})

const messageOne = document.getElementById("msg-1")
const messageTwo = document.getElementById("msg-2")


const weatherForm  = document.querySelector("form")
const searchElement = document.querySelector("input")
weatherForm.addEventListener("submit",(event)=>{
    //RESET
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    event.preventDefault()
    
    
    const searchValue = searchElement.value
    const weather = fetch(`http://localhost:3000/weather?address=${searchValue}`)
    weather.then(res => {
        return res.json()
    }).then(data => {
        if(data.error){
        console.log(data.error)
        messageOne.textContent =  data.error

        }
        else{
            console.log(data)
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
        }
    }) 

})


