import express from 'express'
import morgan from 'morgan'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
})


app.use(cors())
app.use(morgan('dev'))

//creamos u evento de listening
io.on('connection', (socketUser) => {
    console.log(socketUser.id)
    //vamos a resivir los mensajes del front
    socketUser.on("message", (message) => {
        console.log(message)
        socketUser.broadcast.emit("message", {
            id: message.id,
            body: message.body,
            user: message.user,
        })
    })
})

server.listen(4000, () => {
    console.log('server running at http://localhost:4000');
  });