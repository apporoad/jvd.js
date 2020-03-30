var JVD = require('./index')


it('test reg', () => {

    var jvd = JVD()
    var jvd2 = JVD()
    jvd.reg('isTest', data => {
        if (data && data.isTest)
            return true
        return false
    })
    expect(typeof jvd.isTest).toBe('function')
    expect(jvd2.isTest).toBe(undefined)
})


it('real test', () => {

    // test not   and all
    expect(JVD().isString().gt(23).lt(13).run(null)).toBe(true)
    expect( JVD().isNumber().gt(10).lt(80).run(81)).toBe(false)
    expect(JVD().isNumber().not().lt(10).not().gt(100).run(110)).toBe(false)
    expect(JVD().isNumber().lt(10).or().gt(100).test(9)).toBe(true)

    // todo test

})
