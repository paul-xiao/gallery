const foo = (a) =>  {

  console.log(a, 1)

  return function() {
    console.log(a, 2)
    return new Promise((resolve) => {
      console.log(a, 3)
      resolve('xx')
    })
  }

}

export default {
  foo
}