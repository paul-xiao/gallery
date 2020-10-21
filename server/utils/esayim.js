class Easyim {
  constructor(io) {
    this.socket = null
    this.io = io
    this.users = []
  }
  onConnect() {
    this.io.on('connection', (socket) => {
      console.log(socket.id)
      this.socket = socket
      console.log(this.socket.id)
      this.userList()
    })
  }
  onDisconnect() {
    this.socket.on('disconnect', () => {
      console.log('socket disconnceted', user.userId)
      this.users.map((e) => {
        if (e.userId === user.userId) {
          e.connected = socket.connected
        }
        return e
      })
      this.io.sockets.emit('online', this.users)
    })
  }
  onConnectError() {
    this.socket.on('connect_error', () => {
      this.socket.close()
    })
  }
  userList() {
    let query = this.socket.handshake.query
    console.log(this.socket.id, query.username, 'connected')
    let ip =
      this.socket.handshake.headers['x-forwarded-for'] != null
        ? this.socket.handshake.headers['x-forwarded-for']
        : this.socket.handshake.address

    let user = {
      id: this.socket.id,
      ip,
      lastUpdated: this.socket.handshake.time,
      username: query.username,
      avatar: query.avatar,
      userId: query.userId,
      connected: this.socket.connected,
    }
    let t = this.users.findIndex((v) => v.ip === ip)
    if (t !== -1) {
      this.users[t] = user
    } else {
      this.users.push(user)
    }
    this.io.sockets.emit('online', this.users)
  }
  sendPrivateMessage(id, msg) {
    this.socket.to(id).emit('message', {
      msg,
      userData: { nickname: 'xxx', avatar: '/' },
    })
  }
  sendGroupMessage(id, msg) {
    this.socket.to(id).emit('message', {
      msg,
      userData: { nickname: 'xxx', avatar: '/' },
    })
  }
}

module.exports = Easyim
