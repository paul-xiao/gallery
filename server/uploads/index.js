const buildTree = require('../utils/buildTree')
let source = [
  {
    _id: '5f0ff03e9649d8361870c649',
    createdAt: '2020-07-16T06:14:22.572Z',
    files: ['/static/timg.jpg'],
    author: {
      _id: '5f0532f08fc0ad0e10825d9c',
      username: 'paul',
      avatar: '/static/img_bg@2x.65e8d121 - 副本.png',
    },
    title: '测试',
    desc: 'tt',
    likes: [],
    flag: false,
  },
  {
    _id: '5f0ff03e9649d8361870c649',
    createdAt: '2020-07-16T06:14:22.572Z',
    files: ['/static/timg.jpg'],
    author: {
      _id: '5f0532f08fc0ad0e10825d9c',
      username: 'paul',
      avatar: '/static/img_bg@2x.65e8d121 - 副本.png',
    },
    title: '测试',
    desc: 'tt',
    likes: [],
    flag: false,
  },
]

let comments = [
  {
    likes: ['5f0d158e9e3f9e3d5c80d6d9'],
    _id: '5f0ff0489649d8361870c64a',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0532f08fc0ad0e10825d9c',
      username: 'paul',
      avatar: '/static/img_bg@2x.65e8d121 - 副本.png',
    },
    content: '3432',
    createdAt: '2020-07-16T06:14:32.218Z',
    updatedAt: '2020-07-16T09:06:14.293Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f101672d309013e04a38fb9',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: 'bb',
    createdAt: '2020-07-16T08:57:22.775Z',
    updatedAt: '2020-07-16T08:57:22.775Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f1016a7d309013e04a38fba',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: '21321',
    createdAt: '2020-07-16T08:58:15.139Z',
    updatedAt: '2020-07-16T08:58:15.139Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f1016fae980ff0f205df986',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: '2321321321',
    createdAt: '2020-07-16T08:59:38.974Z',
    updatedAt: '2020-07-16T08:59:38.974Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f1018fe73e140340c9f8a2d',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: '23',
    parentId: '5f0ff0489649d8361870c64a',
    createdAt: '2020-07-16T09:08:14.361Z',
    updatedAt: '2020-07-16T09:08:14.361Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f1019d973e140340c9f8a2e',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: 'hhhhh',
    parentId: '5f0ff0489649d8361870c64a',
    createdAt: '2020-07-16T09:11:53.754Z',
    updatedAt: '2020-07-16T09:11:53.754Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f101a1273e140340c9f8a2f',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: '你好',
    parentId: '5f0ff0489649d8361870c64a',
    createdAt: '2020-07-16T09:12:50.904Z',
    updatedAt: '2020-07-16T09:12:50.904Z',
    __v: 0,
  },
  {
    likes: [],
    _id: '5f101a2e73e140340c9f8a30',
    postId: '5f0ff03e9649d8361870c649',
    from: {
      _id: '5f0d158e9e3f9e3d5c80d6d9',
      username: 'paultest',
      avatar: '/static/timg.jpg',
    },
    content: '回复',
    parentId: '5f0ff0489649d8361870c64a',
    createdAt: '2020-07-16T09:13:18.159Z',
    updatedAt: '2020-07-16T09:13:18.159Z',
    __v: 0,
  },
]

let result = []

function buildTree1(source, id, parent_id) {
  let temp = {}
  let tree = {}
  for (let i in source) {
    temp[source[i][id]] = source[i]
  }
  for (let i in temp) {
    let parentId = temp[i][parent_id]
    if (parentId) {
      if (temp[parentId] && !temp[parentId].reply) {
        temp[parentId].reply = new Array()
      }
      temp[parentId].reply.push(temp[i])
    } else {
      tree[temp[i][id]] = temp[i]
    }
  }
  return Object.values(tree)
}

;(async () => {
  for (a of source) {
    result = buildTree(comments, '_id', 'parentId')
  }
  console.log(result)
})()
