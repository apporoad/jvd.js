# jvd.js
js validator,  an awesome validator for js

## just do it
```bash
npm i --save jvd.js
```
```js
var JVD = require('jvd.js')

// test 
JVD().isString().gt(23).lt(13).test(null)
// test 81 > 10  and 81 < 80
JVD().isNumber().gt(10).lt(80).test(81)
// test 110 >=10  and 110 <= 100
JVD().isNumber().not().lt(10).not().gt(100).test(110)
// test 9 < 10 or 9 > 100
JVD().isNumber().lt(10).or().gt(100).test(9)


// test not empty
JVD().anything().test(null)
// test required
JVD().required().test('')
// test 25 between 24 and 27
JVD().between(24,27).test(25)
//test 25 between 24 and 23
JVD().between(24,23).test(25)
//test json equils
JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})
//test array contains 
JVD().in([1,3,5,7]).test(5)
//test 'hello' equils 'hi'
JVD().is('hello').test('hi')
//test is Array
JVD().isArray().test([])
//test is AsyncFunction
JVD().isAsyncFunction().test(()=>{})
// test is int
JVD().isInteger().test(1.1)
// test is JSON
JVD().isJSON().test({})
// test is regexp
JVD().isRegExp().test(/ab/g)
// test matches
JVD().match(/abc/g).test('helloabcaa')

```

## 采用表达式
表达式更简单易写
```js
 //JVD().isString().gt(23).lt(13).run(null)
JVD("?''&&>23&&<13").run(null)
//JVD().isNumber().gt(10).lt(80).run(81)
JVD("?d&>10&<80").run(81)
//JVD().isNumber().not().lt(10).not().gt(100).run(110)
JVD("?d&!<10&!>100").run(110)
//JVD().isNumber().lt(10).or().gt(100).test(9)
JVD("?d&<10|?>100").test(9)

// JVD().anything().test(null)
JVD('!!').test(null)
JVD("!!").test(9)
// JVD().required().test('')
JVD("!!").test('')
// JVD().between(24,27).test(25)
JVD("?(24,27)").test(25)
// JVD().between(24,23).test(25)
JVD("?(24,23)").test(25)
// JVD().equils({name : 'LiSA'},(n1,n2)=>{return n1.name == n2.name}).test({'name':'LiSA'})
// JVD().in([1,3,5,7]).test(5)
JVD("?[1,3,5,7]").test(5)
// JVD().is('hello').test('hi')
JVD("='hello'").test('hello')
// JVD().isArray().test([])
JVD("?[]").test([1,2])
// JVD().isAsyncFunction().test(()=>{})
JVD("?async").test(()=>{})
// JVD().isInteger().test(1.1)
JVD("?int").test(1.1)
// JVD().isJSON().test({})
JVD("?j").test({})
// JVD().isRegExp().test(/ab/g)
JVD("?//").test(/ab/g)
// JVD().match(/abc/g).test('helloabcaa')
JVD("?/abc/").test('helloabcaa')
```

## 说明

| expression                                | innerName                | not                                       | remark                                                       |
| ----------------------------------------- | ------------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| & <br />&&                                | .                        |                                           | 内置操作符， and                                             |
| \|<br />\|\|                              | or                       |                                           | 内置操作符                                                   |
| ！                                        | not                      |                                           | 内置操作符                                                   |
| ?''<br />?string                          | isString                 | !'' <br />!string                         |                                                              |
| ?d<br />?number                           | isNumber                 | !d <br />!number                          |                                                              |
| ?int                                      | isInteger                | !int                                      |                                                              |
| ?function<br />?fn<br />?fun<br />?method | isFunction               | !function<br />!fn<br />!fun<br />!method |                                                              |
| ?sync                                     | isSyncFunction           | !sync                                     |                                                              |
| ?async                                    | isAsyncFunction          | !async                                    |                                                              |
| ?json or  ?j  or  ?{}  or ?object         | isJSON                   | !json or !j  or  !{}  or !object          |                                                              |
| ?[]  or ?array                            | isArray                  | ![]  or !array                            |                                                              |
| ?// or ?regexp                            | isRegExp                 | !// or !regexp                            |                                                              |
| !!                                        | required<br />anything   |                                           |                                                              |
| ?/ab/                                     | pattern<br />match       | !/ab/                                     |                                                              |
| ?>12<br />>12                             | gt<br />greaterThan      | !>12<br /><=12                            | 当待验证数据是字符串时，比较字符串长度<br />当验证数据为数组时，比较数组长度 |
| ?<12<br /><12                             | lt<br />litterThan       | !<12<br />>=12                            | 同上                                                         |
| ?(1,200.2)                                | between<br />range       | !(1,200.2)                                |                                                              |
| ?[1,'a','ccc']                            | oneOf<br />in            | ![1,'a','ccc']                            |                                                              |
| ?=1<br />?='b'<br />='dd'                 | equils<br />toBe<br />is | !=2                                       |                                                              |

## 如何扩展
```js
var JVD = require('jvd.js')

var jvd = JVD()

jvd.reg('hello', data => {
    if (data && data =='hello')
        return true
    return false
})

jvd.hello().test('hello')

```