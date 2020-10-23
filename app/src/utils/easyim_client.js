import io from 'socket.io-client'

class EasyimClient {
  constructor(options) {
    this.options = options || {
      connection: 'http://192.168.43.141:3001',
    }
    this.socket = null
  }
  // 建立连接
  connect(query) {
    const { connection } = this.options
    this.socket = io(connection, { query: query })
    this.socket.on('connect', () => {
      console.log(this.socket.id, 'connected')
    })
  }
  // 断开连接
  disconnect() {
    if (this.socket.connected) {
      console.log(this.socket.id, 'disconnected')
      this.socket.close()
    } else {
      console.warn(this.socket.conneidcted, 'already disconnected')
    }
  }
  // 监听连接成功事件
  on(event, cb) {
    this.socket.on(event, (res) => {
      cb(res)
    })
  }
  joinRoom(data) {
    this.socket.emit('joinRoom', data)
  }
  leaveRoom(data) {
    this.socket.emit('leaveRoom', data)
  }
  sendMessage(obj) {
    this.socket.emit('message', obj)
  }
  //订阅群消息
  subscribeGroup(groupId, cb) {
    this.socket.on(`${groupId}_message`, (val) => cb(val))
  }
  receivePivate(cb) {
    this.socket.on('message', (val) => cb(val))
  }
  unsubscribeGroup(groupId) {
    console.log(groupId)
  }
  createCustomMessage(obj) {
    let data = obj || {
      type: 'order', //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
      payload: {},
      to: {
        type: EasyimClient.SCENE.PRIVATE, //私聊还是群聊，群聊为GoEasyimClient.SCENE.GROUP
        id: 'user002',
        data: '{"avatar":"/www/xxx.png","nickname":"Neo"}', //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
      },
    }

    console.log(data)
  }
}
EasyimClient.EVENT = {}
EasyimClient.SCENE = {}
EasyimClient.EVENT.CONNECTED = 'connected'
EasyimClient.EVENT.PRIVATE_MESSAGE_RECEIVED = 'private'
EasyimClient.EVENT.CONNECTING = 'connecting'
EasyimClient.EVENT.DISCONNECTED = 'disconnect'
EasyimClient.EVENT.GROUP_MESSAGE_RECEIVED = 'group_message'
EasyimClient.EVENT.CONVERSATIONS_UPDATED = 'conversations_updated'
EasyimClient.EVENT.USER_PRESENCE = 'user_presence'
EasyimClient.SCENE.GROUP = 'group_scene'
EasyimClient.SCENE.PRIVATE = 'private_scene'
export default EasyimClient
