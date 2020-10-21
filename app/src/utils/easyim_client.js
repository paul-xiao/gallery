import io from 'socket.io-client'

class EasyimClient {
  constructor(options) {
    this.options = options || {
      connection: 'http://192.168.43.141:3001',
    }
    this.socket = null
    this.connect()
  }
  // 建立连接
  connect() {
    const { connection, query } = this.options
    console.log(query)

    this.socket = io(connection, { query: query })
    console.log(this.socket)
    this.socket.on('connect', () => {
      console.log('connected')
    })
  }
  // 断开连接
  disconnect() {
    if (this.socket.connected) {
      this.socket.close()
      console.log('disconnected', this.socket.connected)
    } else {
      console.warn('already disconnected', this.socket.connected)
    }
  }
  // 监听连接成功事件
  on(event, cb) {
    this.socket.on(event, (res) => {
      cb(res)
    })
  }
  createTextMessage(obj) {
    return (
      obj || {
        text: 'Hello, GoEasyimClient', //消息内容
        to: {
          type: EasyimClient.SCENE.GROUP, //私聊还是群聊，私聊为GoEasyimClient.SCENE.PRIVATE
          id: 'group001', //群id
          data: '{"avatar":"/www/xxx.png","nickname":"区块链交流群"}', //群信息, 任意格式的字符串或者对象，用于更新会话列表中的群信息conversation.data
        },
      }
    )
  }
  sendMessage(obj) {
    const { to } = obj
    if (to.type === 'private') {
      this.socket.emit('private_message', obj)
    } else {
      this.socket.emit('group_message', obj)
    }
  }
  //订阅群消息
  subscribeGroup(groupId) {
    console.log(groupId)
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
