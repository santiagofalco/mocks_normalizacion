import { Server } from 'socket.io'
import MessagePersistanceService from '../db/mongoDb/models/Messages.js'
import MessageService from './messageService.js'

let io = undefined

const messageRepository = new MessagePersistanceService()
const messageService = new MessageService(messageRepository)

const newSocket = (server) => {
    if (!io) {
        io = new Server(server)

        io.on('connection', socket => {
            console.log('Cliente conectado en socket con id: ' + socket.id)

            socket.on('message', async data => {
                let mensaje = await messageService.post(data)
                let history = await messageService.getAllMessages()
                io.emit('mensajes', history) //envia todos los mensajes
            })
        })
    }

    return io
}

export const getSocket = () => {
    return io
}

export default newSocket