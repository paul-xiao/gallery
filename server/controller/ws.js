const app = require('http').createServer();
// new Server(httpServer[,options]) httpServer: the server to bind to.
const io = require('socket.io')(app);
app.listen(3000);
console.log('ws:3000');
/**
 * 
 * 发送给指定对象
 *   @param sendMsgs  发送记录
 *   @param receivedMsgs 接受记录
 * 发送给房间（群）
 *  
 */

class User {
    constructor(opt) {
        this.opt = opt
        this.receivedMsgs = []
        this.sendMsgs = []
    }

    send(msg) {
        this.sendMsgs.push(msg)
    }
    receive(msg) {
        this.receivedMsgs.push(msg)
    }
}


class Chat {
    constructor(io) {
        this.msgs = []
        this.users = []
        this.socket = null
        this.init()
    }

    init() {
        io.on('connection', socket => {

            this.onConnect(socket) //建立连接
            this.onMessage(socket)
            this.onReset(socket)
        })
    }
    static broadcast(msg) {
        console.log(msg);
        io.sockets.emit('message', msg);
    }
    onConnect() {
        let ip
        if (socket.handshake.headers['x-forwarded-for'] != null) {
            ip = socket.handshake.headers['x-forwarded-for'];
        } else {
            ip = socket.handshake.address;
        }
        let user = new User({
            id: socket.id,
            ip,
            lastUpdated: socket.handshake.time
        })
        let t = this.users.findIndex(v => v.opt.ip === ip)
        if (t !== -1) {
            this.users[t] = user
        } else {
            this.users.push(user)
        }
        io.sockets.emit('connected', this.users);
    }
    onMessage(socket) { //监听message
        socket.on('sendById', (data) => {
            this.msgs.push(data.msg)
            socket.to(data.id).emit('message', this.msgs);
        })
    }
    onReset(socket) { //监听reset
        socket.on('reset', () => {
            this.msgs = []
        })
    }
}

let chat = new Chat(io)
