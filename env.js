const envList = require('./env.config.js')

const envGlobal = typeof window !== 'undefined' ? window.__ENV__ : process.env

module.exports.default = envGlobal
module.exports.createEnvsFromList = function () {
  let env = {}
  envList.forEach(envKey => {
    env[envKey] = envGlobal[envKey]
  })
  return env
}
