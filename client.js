// const { Socket } = require("socket.io");

const msgbox = document.getElementById("msgbox");
function createMessage(text, isLeft = true) {
    let nmsg = document.createElement("div");
    let nspn = document.createElement("span");
    nmsg.appendChild(nspn);
    nspn.innerText = text;
    let clist = nmsg.classList;
    clist.add("py-2", "text-white", "text-xl");
    clist.add("mx-6");
    clist.add("my-4", "clear-both");
    let cl2 = nspn.classList;
    cl2.add("bg-amber-400", "px-4", "py-2", "clear-both", "overflow-x-auto")
    if (isLeft) {
        cl2.add("rounded-br-lg", "rounded-tr-lg", "float-left", "rounded-tl-lg")
    } else {
        cl2.add("rounded-bl-lg", "rounded-tl-lg", "rounded-tr-lg", "float-right")
    }
    msgbox.appendChild(nmsg);
    scrollToBottom(msgbox);
}
let name;

const socket = io();
function getName() {
    name = prompt("Enter your username");
    document.getElementById('user').innerText=name;
    socket.emit('new-user', name);
}
getName();
socket.on('new-user', (n)=>{
    createMessage(n+" joined", true);
});
socket.on('message', (msg)=>{
    createMessage(msg["name"]+" : "+msg["message"], true);
})
socket.on('left', (name) =>{
    createMessage(name+" left the chat", true);
})
//send message
const input = document.getElementById('message');
const send = document.getElementById('submit');
function scrollToBottom(element) {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }

form = document.getElementById("fmsg");
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value){
        createMessage(input.value, false);
        socket.emit('chat-message', input.value);
        input.value="";
    }
})


