/**
 * buildTree
 * @param {Object} source
 * @param {String} id
 * @param {String} parent_id
 */

module.exports = (source, id, parent_id) => {
  let temp = {}
  let tree = {}
  for (let i in source) {
    temp[source[i][id]] = source[i]
  }
  for (let i in temp) {
    let parentId = temp[i][parent_id]

    if (parentId) {
      if (temp[parentId] && !temp[parentId].reply) {
        console.log('Array')
        temp[parentId].reply = new Array()
      }
      temp[parentId].reply.push(temp[i])
      console.log(typeof temp[parentId].reply)
    } else {
      console.log('call')
      tree[temp[i][id]] = temp[i]
    }
  }
  return Object.values(tree)
}
