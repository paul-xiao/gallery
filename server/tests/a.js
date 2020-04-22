import {foo} from './data'
const fun = async() => {
  const x = await foo()
  x()
}

setInterval(() => {
  foo()
}, 3000);