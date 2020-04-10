var JVD = require('./index')

var it2 = global.debug || it
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

    var jvd3 = JVD()
    jvd3.reg('hello', (data,options,yourParam) => {
        expect(options.hi).toBe('good days')
        expect(yourParam).toBe('here is your param')
        if (data && data =='hello')
            return true
        return false
    })

    var options = { hi : 'good days'}
    jvd3.hello('here is your param').test('hello',options)
})


it('real test', async () => {

    // test not   and all
    expect(await JVD().isString().gt(23).lt(13).run(null)).toBe(true)
    expect(await JVD().isNumber().gt(10).lt(80).run(81)).toBe(false)
    expect(await JVD().isNumber().not().lt(10).not().gt(100).run(110)).toBe(false)
    expect(await JVD().isNumber().lt(10).or().gt(100).test(9)).toBe(true)

    // test
    expect(await JVD().anything().test(null)).toBe(false)
    expect(await JVD().required().test('')).toBe(true)
    expect(await JVD().between(24,27).test(25)).toBe(true)
    expect(await JVD().between(24,23).test(25)).toBe(false)
    expect(await JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})).toBe(true)
    expect(await JVD().in([1,3,5,7]).test(5)).toBe(true)
    expect(await JVD().is('hello').test('hi')).toBe(false)
    expect(await JVD().isArray().test([])).toBe(true)
    expect(await JVD().isAsyncFunction().test(()=>{})).toBe(false)
    expect(await JVD().isInteger().test(1.1)).toBe(false)
    expect(await JVD().isJSON().test({})).toBe(true)
    expect(await JVD().isRegExp().test(/ab/g)).toBe(true)
    expect(await JVD().match(/abc/g).test('helloabcaa')).toBe(true)

})



it('real expression',async () => {

    // test not   and all
    //expect(JVD().isString().gt(23).lt(13).run(null)).toBe(true)
    expect(await JVD("?''&&>23&&<13").run(null)).toBe(true)
    //expect(JVD().isNumber().gt(10).lt(80).run(81)).toBe(false)
    expect(await JVD("?d&>10&<80").run(81)).toBe(false)
    //expect(JVD().isNumber().not().lt(10).not().gt(100).run(110)).toBe(false)
    expect(await JVD("?d&!<10&!>100").run(110)).toBe(false)
    //expect(JVD().isNumber().lt(10).or().gt(100).test(9)).toBe(true)
    expect(await JVD("?d&<10|?>100").test(9)).toBe(true)

    // expect(JVD().anything().test(null)).toBe(false)
    expect(await JVD('!!').test(null)).toBe(false)
    expect(await JVD("!!").test(9)).toBe(true)
    // expect(JVD().required().test('')).toBe(true)
    expect(await JVD("!!").test('')).toBe(true)
    // expect(JVD().between(24,27).test(25)).toBe(true)
    expect(await JVD("?(24,27)").test(25)).toBe(true)
    // expect(JVD().between(24,23).test(25)).toBe(false)
    expect(await JVD("?(24,23)").test(25)).toBe(false)
    // expect(JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})).toBe(true)
    // expect(JVD().in([1,3,5,7]).test(5)).toBe(true)
    expect(await JVD("?[1,3,5,7]").test(5)).toBe(true)
    // expect(JVD().is('hello').test('hi')).toBe(false)
    expect(await JVD("='hello'").test('hello')).toBe(true)
    // expect(JVD().isArray().test([])).toBe(true)
    expect(await JVD("?[]").test([1,2])).toBe(true)
    // expect(JVD().isAsyncFunction().test(()=>{})).toBe(false)
    expect(await JVD("?async").test(()=>{})).toBe(false)
    // expect(JVD().isInteger().test(1.1)).toBe(false)
    expect(await JVD("?int").test(1.1)).toBe(false)
    // expect(JVD().isJSON().test({})).toBe(true)
    expect(await JVD("?j").test({})).toBe(true)
    // expect(JVD().isRegExp().test(/ab/g)).toBe(true)
    expect(await JVD("?//").test(/ab/g)).toBe(true)
    // expect(JVD().match(/abc/g).test('helloabcaa')).toBe(true)
    expect(await JVD("?/abc/").test('helloabcaa')).toBe(true)

    expect(await JVD('>3').test('abcd')).toBeTruthy()
    expect(await JVD('>2').test('ab')).toBe(false)
    expect(await JVD('?(2,2)').test([1,2])).toBeTruthy()
    expect(await JVD('<2').test('ab')).toBe(false)
    expect(await JVD('<=2').test('abc')).toBe(false)

})

it2('test special' , async ()=>{
    expect(await JVD('=1').test(2)).toBe(false)
    expect(await JVD('=2').test(2)).toBeTruthy()

	expect(await JVD('>3').test('good day')).toBeTruthy()
})