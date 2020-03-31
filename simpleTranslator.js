const utils = require('lisa.utils')
// and => &   &&
// or => |   ||
// not  => !
//isString  =>  ?''  ?string
//isNumber =>  ?d  ?number
//isInteger =>  ?int
//isFunction => ?function   ?fn  ?fun  ?method
//isSyncFunction => ?sync
//isAsyncFunction => ?async
//isJSON => ?json  ?j   ?{} ?object
//isArray => ?[] ?array
// isRegExp => ?// ?regexp
// required = anything  => !!  
// pattern = match  =>  ?/ab/
// gt =  greaterThan =>  ?>12 >12
// lt =  litterThan =>  ?<12  <12
// between = range => ?(1,200.2)
// oneOf = in = ?[1,'a','ccc']
// equils = toBe = is =>  ?=1    ?='cc'   ='dd'

var tryParse = str=>{
    if(!str) return { value : str, success: true}
    try{
        var value = JSON.parse(str.replace(/'/g,'"'))
        return { value : value, success: true}
    }catch(e){
        return { error : e, success: false}
    }
}

var tran = (jvd,expression) =>{
    if(!expression) return true
    if( expression == '!!'){
        jvd.required()
        return true
    }
    if(utils.startWith(expression,'!')){
        jvd.not()
        expression = '?' + expression.substring(1)
    }else if(utils.startWith(expression,'<') 
    || utils.startWith(expression,'>')
    || utils.startWith(expression,'=')
    ){
        expression = '?' + expression
    }
    switch(expression.toLowerCase()){
        case '?\'\'':
        case '?string':
            jvd.isString()
            break
        case '?d':
        case '?number':
            jvd.isNumber()
            break
        case '?int':
            jvd.isInteger()
            break
        case '?function':
        case '?fn':
        case '?fun':
        case '?method':
            jvd.isFunction()
            break
        case '?sync':
            jvd.isSyncFunction()
            break
        case '?async':
            jvd.isAsyncFunction()
            break
        case '?json':
        case '?j':
        case '?{}':
        case '?object':
            jvd.isJSON()
            break
        case '?[]':
        case '?array':
            jvd.isArray()
            break
        case '?//':
        case '?regexp':
            jvd.isRegExp()
            break
        default:
            if(utils.startWith(expression,'?/') && utils.endWith(expression,'/') && expression.length>3){
                // pattern = match  =>   ?/ab/
                jvd.match(new RegExp(expression.substring(2,expression.length-1)))
            }else if(utils.startWith(expression,'?>') && expression.length>2){
                var n = expression.substring(2)
                if(isNaN(n))
                    return false
                jvd.gt(parseFloat(n))
            }else if(utils.startWith(expression,'?<') && expression.length>2){
                var n = expression.substring(2)
                if(isNaN(n))
                    return false
                jvd.lt(parseFloat(n))
            }else if(utils.startWith(expression,'?(') && utils.endWith(expression,')') && expression.length>3){
                // between = range => !(1,200.2)
                var sArr = expression.substring(2,expression.length-1).split(',')
                var first = sArr[0]
                var second = sArr.length>1 ? sArr[1] : null
                if(first && second){
                    first = tryParse(first)
                    second = tryParse(second)
                    if(first.success && second.success){
                        jvd.between(first.value,second.value)
                    }
                    else
                        return false
                }else{
                    return false
                }
            }else if(utils.startWith(expression,'?[') && utils.endWith(expression,']')&& expression.length>3){
                // oneOf = in = ![1,'a','ccc'] JSON.parse("[1,'a','ccc']".replace(/'/g,'"'))
                var value = tryParse(expression.substring(1))
                if(value.success){
                    jvd.oneOf(value.value)
                }else
                    return false
            }else if(utils.startWith('?=')){
                var value = tryParse(expression.substring(2))
                if(value.success){
                    jvd.is(value.value)
                }else
                    return false
            }else {
                //其他情况认为转换失败
                return false
            }
            break
    }
    return true
}

exports.translate =(jvd,expression) =>{
    if(!expression) return
    var actions = utils.ArrayRemove(expression.replace(/&&/g,'&').split('&'),'')
    if(actions && actions.length>0){
        for(var i =0 ;i<actions.length ;i ++){
            var action = actions[i]
            var subActions = utils.ArrayRemove(action.replace(/\|\|/g,'|').split('|'),'')
            if(subActions && subActions.length>0){
                for(var j =0 ;j<subActions.length;j++){
                    var sa = subActions[j]
                    if(!tran(jvd,sa)){
                        console.log('jvd:simpleTranslator: tran error:' + expression + ' : '+sa)
                    }
                    if(j<subActions.length-1){
                        jvd.or()
                    }
                }
            }
        }
    }
}