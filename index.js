
const di = require('./defautImpl')
const traslator = require('./simpleTranslator')
const JVD = require('./jvd')

module.exports = (expression) => {
    var j =new JVD()
    for (key in di) {
        j.reg(key, di[key])
    }
    traslator.translate(j,expression) 
    return j
}