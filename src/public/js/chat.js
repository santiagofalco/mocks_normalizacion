const socket = io()

let useremail;
let userName = 'userPrueba'
let userLastName = 'lastNamePrueba'
let userAge = '23'
let userAlias = 'aliasUserPrueba'
let userAvatar = 'userAvatarPrueba'


const chatBox = document.getElementById('chatBox')
const mailInput = document.getElementById('mailInput');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById('lastNameInput');
const ageInput = document.getElementById('ageInput');
const aliasInput = document.getElementById('aliasInput');
const avatarInput = document.getElementById('avatarInput');
const sendBtn = document.getElementById('btnLogin');

// mailInput.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter' && e.target.value.trim() !== "") {
//         useremail = e.target.value
//         mailInput.setAttribute('disabled', true)
//         chatBox.removeAttribute('disabled')

//     }
// })

sendBtn.addEventListener('click', (e) => {
    console.log('boton apretado')
    useremail = mailInput.value 
    userName = nameInput.value
    userLastName = lastNameInput.value
    userAge = ageInput.value
    userAlias = aliasInput.value
    userAvatar = avatarInput.value

    let inputs = [nameInput, lastNameInput, ageInput, aliasInput, avatarInput, mailInput]

    inputs.forEach((e) => {
        e.setAttribute('disabled', true)
    })

    chatBox.removeAttribute('disabled')

})

/* Listeners*/

chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                author: {
                    id: useremail,
                    name: userName,
                    lastname: userLastName,
                    age: userAge,
                    alias: userAlias,
                    avatar: userAvatar,
                },
                message: chatBox.value,
                hour: new Date(new Date().getTime()).toLocaleDateString() + ' ' + new Date(new Date().getTime()).toLocaleTimeString()
            })
            chatBox.value = ''
        }
    }

})

/*Listener Recibir mensajes */

socket.on('mensajes', data => {
    let mensajes = document.getElementById('mensajes')
    let linea_mensaje = ''
    // console.log(data)
    data.forEach(message => {
        linea_mensaje = linea_mensaje + `<img src=${message.author.avatar} /><b style="color:blue">${message.author.id}</b><p style="color:brown">[${message.hour}]</p><i style="color:green">${message.text}</i></br><p>----------------------</p>`
    });
    mensajes.innerHTML = linea_mensaje
})