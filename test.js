var JVD = require('./index')
var translator = require('./simpleTranslator')

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
    expect(JVD().isNumber().gt(10).lt(80).run(81)).toBe(false)
    expect(JVD().isNumber().not().lt(10).not().gt(100).run(110)).toBe(false)
    expect(JVD().isNumber().lt(10).or().gt(100).test(9)).toBe(true)

    // test
    expect(JVD().anything().test(null)).toBe(false)
    expect(JVD().required().test('')).toBe(true)
    expect(JVD().between(24,27).test(25)).toBe(true)
    expect(JVD().between(24,23).test(25)).toBe(false)
    expect(JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})).toBe(true)
    expect(JVD().in([1,3,5,7]).test(5)).toBe(true)
    expect(JVD().is('hello').test('hi')).toBe(false)
    expect(JVD().isArray().test([])).toBe(true)
    expect(JVD().isAsyncFunction().test(()=>{})).toBe(false)
    expect(JVD().isInteger().test(1.1)).toBe(false)
    expect(JVD().isJSON().test({})).toBe(true)
    expect(JVD().isRegExp().test(/ab/g)).toBe(true)
    expect(JVD().match(/abc/g).test('helloabcaa')).toBe(true)

})



it('real expression', () => {

    // test not   and all
    //expect(JVD().isString().gt(23).lt(13).run(null)).toBe(true)
    expect(JVD("?''&&>23&&<13").run(null)).toBe(true)
    //expect(JVD().isNumber().gt(10).lt(80).run(81)).toBe(false)
    expect(JVD("?d&>10&<80").run(81)).toBe(false)
    //expect(JVD().isNumber().not().lt(10).not().gt(100).run(110)).toBe(false)
    expect(JVD("?d&!<10&!>100").run(110)).toBe(false)
    //expect(JVD().isNumber().lt(10).or().gt(100).test(9)).toBe(true)
    expect(JVD("?d&<10|?>100").test(9)).toBe(true)

    // expect(JVD().anything().test(null)).toBe(false)
    expect(JVD('!!').test(null)).toBe(false)
    expect(JVD("!!").test(9)).toBe(true)
    // expect(JVD().required().test('')).toBe(true)
    expect(JVD("!!").test('')).toBe(true)
    // expect(JVD().between(24,27).test(25)).toBe(true)
    expect(JVD("?(24,27)").test(25)).toBe(true)
    // expect(JVD().between(24,23).test(25)).toBe(false)
    expect(JVD("?(24,23)").test(25)).toBe(false)
    // expect(JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})).toBe(true)
    // expect(JVD().in([1,3,5,7]).test(5)).toBe(true)
    expect(JVD("?[1,3,5,7]").test(5)).toBe(true)
    // expect(JVD().is('hello').test('hi')).toBe(false)
    expect(JVD("='hello'").test('hello')).toBe(true)
    // expect(JVD().isArray().test([])).toBe(true)
    expect(JVD("?[]").test([1,2])).toBe(true)
    // expect(JVD().isAsyncFunction().test(()=>{})).toBe(false)
    expect(JVD("?async").test(()=>{})).toBe(false)
    // expect(JVD().isInteger().test(1.1)).toBe(false)
    expect(JVD("?int").test(1.1)).toBe(false)
    // expect(JVD().isJSON().test({})).toBe(true)
    expect(JVD("?j").test({})).toBe(true)
    // expect(JVD().isRegExp().test(/ab/g)).toBe(true)
    expect(JVD("?//").test(/ab/g)).toBe(true)
    // expect(JVD().match(/abc/g).test('helloabcaa')).toBe(true)
    expect(JVD("?/abc/").test('helloabcaa')).toBe(true)
})
