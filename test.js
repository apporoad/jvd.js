var JVD = require('./index')


it('test reg',()=>{

    var jvd = JVD()
    var jvd2 = JVD()
    jvd.reg('isTest', data=>{
        if(data && data.isTest)
            return true
        return false
    })
    jvd.isTest('hello')
    jvd2.isTest('hi')
})