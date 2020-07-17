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
        temp[parentId].reply = new Array()
        console.log('0')
      }
      temp[parentId].reply.push(temp[i])
      console.log('1')
    } else {
      console.log('=====> 2')
      tree[temp[i][id]] = temp[i]
    }
  }
  console.log('3')
  console.log(tree)

  return Object.values(tree)
}
