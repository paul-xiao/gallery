class A {
  constructor() {
    this.a;
  }

  async init() {
    await this.update().then(i => {
     this.a = i
    })
    console.log(this.a)
  }

  update() {
    return new Promise((res) =>{
      setTimeout(() => {
        res(3)
      }, 2000)
    })
  }
}

const b = async() => {
  const c = new A()
  await c.init()
  return new Promise((res) => {
    console.log(c.a)
    res(c.a)
  })
}

b().then(i => console.log('i', i))