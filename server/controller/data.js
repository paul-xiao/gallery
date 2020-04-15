// function delay() {
//   console.log("object");
// }

// async function delayedLog(item) {
//   // notice that we can await a function
//   // that returns a promise
//   // await delay();
//     console.log(item);
// }
// async function processArray(array) {
//   for await (item of array) {
//     delayedLog(item);
//   }
//   console.log("Done!");
// }

//  processArray([1, 2, 3]);


const arr = [1,2,3]
const ipfs = {
  async unpinAll(arr) {
    for  (a of arr) {
      const res = await this.unpin()
      console.log(res)
    }
    await this.handleGc()
    console.log('end')

  },
  unpin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('unpin')
      }, 1000)
    })
  },
  async handleGc() {
   const gc = await this.gc()
   console.log(gc)
  },
  gc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('gc')
      }, 1000)
    })
  }
}


const foo = async() => {

  await ipfs.unpinAll(arr)
}

foo()
