const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Enter Your Name')
} while(!name)

textarea.addEventListener('keyup',(e) => {
    if(e.key === 'Enter') {
        sendMeesage(e.target.value)
    }
} )

function sendMeesage(message){
    let msg = {
        user: name,
        message: message
    }

    // Append
appendMeesage(msg, 'outgoing')
textarea.value = ''
scrollTopBottom()

    // Send to server
socket.emit('message', msg)


}

function appendMeesage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user} </h4>
    <p>${msg.message} </p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

// Recieve message

    socket.on('message', (msg) => {
        appendMeesage(msg, 'incoming')
        scrollTopBottom()

    })

    function scrollTopBottom(){
        messageArea.scrollTop = messageArea.scrollHeight
    }