
const socket = io()
let name;

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.container')
do{
n =prompt('Please enter your name')
}while(!n)
textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user: n,
        message: message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollTobBottom()

    socket.emit('message',msg)

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

}

//recieve msg

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollTobBottom()
})
function scrollTobBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}