export function promiseAll (promisesObject) {
  let keys = Object.keys(promisesObject)
  let promisesArr = keys.map(key => promisesObject[key])
  return new Promise((resolve, reject) => {
    Promise.all(promisesArr).then(values => {
      let object = {}
      keys.forEach((key, index) => {
        object[key] = values[index]
      })
      resolve(object)
    })
  })
}
