const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Sean',
      age: 25,
    })
    // reject('Something went wrong!');
  }, 3000)
})

console.log('before')

promise
  .then(data => {
    console.log('1', data)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('This is my other promise, chaining!')
      }, 3000)
    })
  })
  .then(str => {
    console.log('does this run?', str)
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })

console.log('after')
