var JVD = require('./index')


it('test reg',()=>{

    var jvd = JVD()
    var jvd2 = JVD()
    jvd.reg('isTest', data=>{
        if(data && data.isTest)
            return true
        return false
    })
    expect(typeof jvd.isTest).toBe('function')
    expect(jvd2.isTest).toBe(undefined)
})


var a = require('./defautImpl')

console.log(a)

var b= {
    aa : JVD().requiered().isNumber().gt(100).lt(200),
    "bb" : JVD().isString().match(/aabb/g)
}