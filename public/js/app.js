console.log('Client side is always on your side')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    message1.textContent = 'Loading......'
    message2.textContent = ''
    
    const location = searchElement.value
    const myurl = 'http://localhost:3000/weather?address='+location

    fetch(myurl).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
                console.log(data.error)
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    console.log(location)
})