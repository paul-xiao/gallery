import axios from 'axios'
const CancelToken = axios.CancelToken
let source = CancelToken.source()
const foo = () =>  {
  return function() {
    console.log('started')
    return new Promise((resolve, reject) => {
     axios.get('/api/post/', { cancelToken: source && source.token}).then(res => {
      resolve(res)
     }).catch(err => reject(err))
    })
  }

}

const poo = (msg) =>  {
  source.cancel(msg)
  source = CancelToken.source()
}
export default {
  foo,
  poo
}