class Easyim {
  constructor(io) {
    this.socket = null
    this.io = io
    this.users = []
    this.contacts = {}
  }
  onConnect() {
    this.io.on('connection', (socket) => {
      console.log(socket.id)
      this.socket = socket
      console.log(this.socket.id)
      this.userList()
      socket.on('joinRoom', (data) => {
        socket.join(data.roomId, () => {
          let rooms = Object.keys(socket.rooms)
          console.log(rooms) // [ <socket.id>, 'room 237' ]
          this.io
            .to(data.roomId)
            .emit(
              `${data.roomId}_message`,
              `${socket.id.slice(0, 4)} has joined the room`
            ) // broadcast to everyone in the room
        })
      })
      socket.on('leaveRoom', (data) => {
        socket.leave(data.roomId, () => {
          this.io
            .to(data.roomId)
            .emit(
              `${data.roomId}_message`,
              `${socket.id.slice(0, 4)} has left the room`
            ) // broadcast to everyone in the room
        })
      })
      socket.on('message', (data) => {
        console.log(data)
        this.io.to(data.to.id).emit('conversations', {
          content: data.msg,
          form: {},
          to: {},
        })
      })
    })
  }
  onDisconnect(user) {
    this.socket.on('disconnect', () => {
      console.log('socket disconnceted', user.userId)
      this.users.map((e) => {
        if (e.userId === user.userId) {
          e.connected = this.socket.connected
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
    // 当前联系人
    this.contacts[query.username] = {
      id: this.socket.id,
      ip,
      lastUpdated: this.socket.handshake.time,
      username: query.username,
      avatar: query.avatar,
      userId: query.userId,
      connected: this.socket.connected,
      messages: [
        {
          content: 'text msgs',
          type: 'send', // receive
          status: 'readed',
          timestramp: new Date(),
        },
      ],
    }
    this.io.sockets.emit('online', Object.values(this.contacts))
    this.onDisconnect(this.contacts[query.username])
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
  markPrivateMessageAsRead() {}
  markGroupMessageAsRead() {}
  removePrivateConversation() {}
  //会话列表
  latestConversations() {}
  // 消息置顶
  topPrivateConversation() {}
  //历史消息

  history() {}
  //在线用户列表
  hereNow() {}
  //根据groupId获取当前在线群用户列表
  groupHereNow() {}
  //根据groupId获取群聊在线用户总数
  groupOnlineCount() {}
  //监听用户上下线提醒
  subscribeUserPresence() {}
}

module.exports = Easyim
